import { Pencil, XCircle, XIcon } from "lucide-react";
import { useState, useContext } from "react";
import QuantityInput from "./quantityInput";
import TinySpinner from "./TinySpinner";
import { AppContext } from "../App";

const CartItem = ({
    image,
    id,
    title,
    options,
    quantity,
    totalPrice,
    note,
    setCartItems,
    setTotalPrice
}) => {

    const [isRemoving, setIsRemoving] = useState(false);
    const [isQuantityChanging, setIsQuantityChanging] = useState(false)

    const { alertMessage, setAlertMessage } = useContext(AppContext);

    async function changeQuantity(id, quantity, action) {
        try {

            setIsQuantityChanging(true)

            if (action === 'increment') {
                quantity++;
            } else {
                quantity--;
            }

            let res = await fetch(`https://coffee-website-backend-gamma.vercel.app/cart/update/${id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    quantity
                })
            });

            res = await res.json();
            if (!res.ok) throw new Error(res.message)

            console.log(res)

            setCartItems(res.cart.items);
            setTotalPrice(res.cart.totalAmount)


        } catch (error) {
            setAlertMessage(error.message)
        } finally {
            setIsQuantityChanging(false)
        }
    }


    async function removeCartItem(cartId) {
        try {

            setIsRemoving(true)
            let res = await fetch(`https://coffee-website-backend-gamma.vercel.app/cart/remove/${cartId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            res = await res.json();

            if (!res.ok) {
                throw new Error(res.message)
            }

            console.log(res.cart)
            setCartItems(res.cart.items);
            console.log(res.cart.totalAmount)
            setTotalPrice(res.cart.totalAmount);
            setAlertMessage(res.message);
        } catch (error) {
            setAlertMessage(error.message)
            alert(error.message)
        } finally {
            setIsRemoving(false)
        }
    }


    return (
        <div className={`flex gap-4 p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl backdrop-blur-sm shadow-md ${isRemoving && 'opacity-50 pointer-events-none'}`}>

            {/* IMAGE */}
            <img
                src={image}
                alt={title}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-xl"
            />

            {/* CONTENT */}
            <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                    <h2 className="text-lg sm:text-xl font-semibold text-neutral-100">
                        {title}
                    </h2>

                    <div className="flex gap-3 ">
                        <button className="text-neutral-400 hover:text-neutral-200 transition cursor-pointer">
                            <Pencil size={24} />
                        </button>
                        <button className="text-neutral-400 hover:text-neutral-200 transition cursor-pointer">
                            {isRemoving ? <TinySpinner /> : <XIcon size={24} onClick={() => removeCartItem(id)} />}
                        </button>

                    </div>
                </div>

                {/* OPTIONS */}
                <div className="text-sm text-neutral-400 mt-1 space-y-1">
                    {options.map((opt, i) =>
                        !opt.value ? null : (
                            <p key={i}>
                                <span className="text-neutral-300 font-medium">
                                    {opt.name}:
                                </span>{" "}
                                {opt.value}
                            </p>
                        )
                    )}
                </div>

                {/* NOTE */}
                {note && (
                    <p className="text-sm text-neutral-400 mt-1">
                        <span className="font-medium text-neutral-300">Note:</span>{" "}
                        {note}
                    </p>
                )}

                {/* BOTTOM ROW */}
                <div className="mt-3 flex justify-between items-center">
                    <QuantityInput
                        quantity={quantity}
                        onIncrement={() => changeQuantity(id, quantity, 'increment')}
                        onDecrement={() => changeQuantity(id, quantity, 'decrement')}
                        isChanging={isQuantityChanging}
                    />

                    <p className="text-lg font-bold text-green-400">
                        Rs. {totalPrice}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
