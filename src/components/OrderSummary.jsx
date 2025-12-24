import { useContext, useState } from 'react'
import Button from './Button'
import Loader from './Loader'
import { AppContext } from '../App'

const OrderSummary = ({ isLoading, cart, submitCheckoutForm, handleSubmit , isSubmitting }) => {

  const { alertMessage, setAlertMessage } = useContext(AppContext)

  async function submitCheckoutForm(data) {
    try {
      let res = await fetch('https://coffee-website-backend-gamma.vercel.app/order/checkout', {
        method: 'POST', 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: data.note,
          paymentMethod: 'cash_on_delivery',
          address: { ...data, street: data.streetAddress }
        })
      });

      res = await res.json();
      if (!res.ok) throw new Error(res.message)
      setAlertMessage('Your order has placed successfully. Your order id is : ' + res.orderId)
    } catch (error) {
      setAlertMessage(error.message)
    }
  }

  if (isLoading) {
    return (
      <div className=' flex-1 bg-zinc-900 border-2 border-zinc-50 rounded-2xl relative isolate overflow-auto flex flex-col' >
        <Loader style={{ height: '100%' }} />
      </div>
    )
  }

  return (
    <div className='flex-1 bg-zinc-900 border-2 border-zinc-50 rounded-2xl relative isolate flex flex-col' >
      <h1 className='text-3xl font-extrabold text-amber-400 m-6 text-center' >Order Summary</h1>
      <div className='flex-1 px-5 overflow-auto'>

        {cart.items.map((item, i) => (
          <div className={`flex gap-3 p-3 items-start border-t-2 border-zinc-50/40 ${(i + 1 === cart.items.length) && 'border-b-2'}`} >
            <img className='w-20 aspect-square' src={item.product.image.url} alt={item.product.name} />
            <div className='text-zinc-50 w-full'>
              <h2 className='text-2xl font-bold'>{item.product.name}</h2>
              <ul className='text-sm text-zinc-400 my-1' >
                {item.selectedOptions.map((opt) => {
                  if (!opt.value) return null;
                  return <li>{`${opt.name}: ${opt.value}`}</li>
                })}
              </ul>
              <div className='flex justify-between'>
                <p>Qty: {item.quantity}</p>
                <p>Rs. {item.price.total}</p>
              </div>
            </div>
          </div>
        ))}

      </div>

      <div className='sticky bottom-4 left-0 w-full text-zinc-50 z-40 p-3 bg-zinc-950/50 backdrop-blur-3xl rounded-2xl' >
        <div className='flex justify-between text-lg py-3 my-4 border-y-2 border-y-amber-400 px-2'>
          <p className='font-bold' >Total Amount</p>
          <p>Rs. {cart.totalAmount}</p>
        </div>
        <Button isLoading={isSubmitting} form='checkoutForm' title='Place Order' func={handleSubmit(submitCheckoutForm)} className='w-full' />
      </div>

    </div>
  )
}

export default OrderSummary
