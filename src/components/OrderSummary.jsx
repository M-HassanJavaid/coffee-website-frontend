import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Loader from './Loader'
import { AppContext } from '../App'
import { ShoppingBag, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react'

const OrderSummary = ({ isLoading, cart, handleSubmit, isSubmitting }) => {
  const { setAlertMessage } = useContext(AppContext)
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)

  async function submitCheckoutForm(data) {
    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/order/checkout`, {
        method: 'POST', 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          note: data.description,
          paymentMethod: 'cash_on_delivery',
          address: { 
            phone: data.phone,
            street: data.streetAddress,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
            landmark: data.landmark || 'Not Given'
          }
        })
      });

      res = await res.json();
      if (!res.ok) throw new Error(res.message)
      
      // If user checked "save my info", persist address to their profile
      if (data.saveData) {
        await fetch(`${import.meta.env.VITE_API_URL}/user/update/address`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: data.phone,
            street: data.streetAddress,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
            landmark: data.landmark || 'Not Given',
          }),
        });
      }

      setAlertMessage('Your order has been placed successfully!')
      navigate('/orders')

    } catch (error) {
      setAlertMessage(error.message)
    }
  }

  if (orderPlaced) {
    return (
      <div className="w-full bg-neutral-900/60 backdrop-blur-md border border-amber-400/30 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center space-y-4">
        <div className="w-20 h-20 bg-amber-400/20 rounded-full flex items-center justify-center mb-2">
          <CheckCircle2 className="w-10 h-10 text-amber-400 animate-bounce" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-100">Order Placed!</h2>
        <p className="text-zinc-400">Taking you to your orders...</p>
      </div>
    )
  }

  if (!cart) {
    return (
      <div className='w-full bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 rounded-[2rem] p-12 flex justify-center items-center shadow-2xl min-h-[300px]'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='w-full bg-neutral-900/40 backdrop-blur-sm border border-neutral-800 rounded-[2rem] overflow-hidden flex flex-col shadow-2xl transition-all duration-500' >
      <div className="p-6 border-b border-neutral-800 flex items-center gap-3">
        <ShoppingBag className="w-5 h-5 text-amber-400" />
        <h2 className="text-xl font-bold text-zinc-100">Order Summary</h2>
      </div>

      <div className='flex-1 p-6 space-y-6 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-800'>
        {cart.items.map((item, i) => (
          <div key={i} className="flex gap-4 group">
            <div className="relative w-20 h-20 rounded-2xl bg-neutral-800/50 border border-neutral-700/50 p-2 flex-shrink-0 group-hover:border-amber-400/30 transition-colors">
              <img className='w-full h-full object-contain' src={item.product.image.url} alt={item.product.name} />
              <div className="absolute -top-2 -right-2 bg-amber-400 text-neutral-900 text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-neutral-900">
                {item.quantity}
              </div>
            </div>
            
            <div className='flex-grow min-w-0 flex flex-col justify-center'>
              <h3 className='text-sm font-bold text-zinc-100 truncate group-hover:text-amber-400 transition-colors'>{item.product.name}</h3>
              <div className='flex flex-wrap gap-1 mt-1'>
                {item.selectedOptions.map((opt, idx) => {
                  if (!opt.value) return null;
                  return (
                    <span key={idx} className="text-[10px] font-medium text-zinc-500 bg-neutral-800 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                      {opt.value}
                    </span>
                  )
                })}
              </div>
              <p className='text-xs font-bold text-zinc-400 mt-2'>Rs. {item.price.total}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='p-6 bg-neutral-950/40 border-t border-neutral-800 space-y-4' >
        <div className="space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Subtotal</span>
                <span className="text-zinc-300">Rs. {cart.totalAmount}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-zinc-500 font-medium">Delivery</span>
                <span className="text-emerald-500 font-bold uppercase text-[10px] tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full">Free</span>
            </div>
        </div>

        <div className='flex justify-between items-center pt-4 border-t border-neutral-800/50'>
          <span className='text-lg font-bold text-zinc-100' >Total</span>
          <span className="text-2xl font-black text-amber-400">Rs. {cart.totalAmount}</span>
        </div>

        <div className="pt-2">
            <Button 
                isLoading={isSubmitting} 
                form='checkoutForm' 
                title='Place Order' 
                func={handleSubmit(submitCheckoutForm)} 
                className='w-full !rounded-2xl !py-4 group relative overflow-hidden' 
            />
            <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                <CreditCard className="w-3 h-3" />
                <span>Secure Checkout with Cash on Delivery</span>
            </div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
