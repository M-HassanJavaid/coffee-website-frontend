import { Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import CartItem from "./CartItem";
import Loader from "./Loader";
import { AppContext } from "../App";
import Button from "./Button";

const CartPage = () => {

    const { alertMessage, setAlertMessage } = useContext(AppContext);

    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [totalPrice, setTotalPrice] = useState("Calculating...");

    async function getCart() {
        try {
            let res = await fetch(
                "https://coffee-website-backend-gamma.vercel.app/cart/me",
                {
                    method: "GET",
                    credentials: "include",
                }
            );
            res = await res.json();
            if (!res.ok) throw new Error(res.message);
            setCartItems(res.cart.items);
            setTotalPrice(res.cart.totalAmount);
        } catch (error) {
            setAlertMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        getCart();
    }, []);

    const handleClearCart = () => {};

    if (isLoading) return <Loader style={{ minHeight: "100vh" }} />;

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-8 pt-[100px]">
            <div className="">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Your Cart</h1>

                    {cartItems.length > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
                        >
                            <Trash2 size={18} />
                            Clear Cart
                        </button>
                    )}
                </div>

                {/* CART ITEMS */}
                <div className="space-y-5">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item._id}
                            id={item._id}
                            image={item.product.image.url}
                            title={item.product.name}
                            options={item.selectedOptions}
                            quantity={item.quantity}
                            totalPrice={item.price.total}
                            note={item.note}
                            setCartItems={setCartItems}
                            setTotalPrice={setTotalPrice}
                        />
                    ))}

                    {cartItems.length === 0 && (
                        <p className="text-center text-xl mt-16 text-neutral-400">
                            Your cart is empty 🛒
                        </p>
                    )}
                </div>

                {/* FOOTER - TOTAL */}
                {cartItems.length > 0 && (
                    <div className="sticky bottom-2 p-3 rounded-2xl mt-10 py-5 backdrop-blur-xl bg-neutral-900/60 border-t border-neutral-700">
                        <div className="flex justify-between items-center text-lg font-semibold px-1">
                            <span className="text-neutral-300">Total</span>
                            <span className="text-green-400">Rs. {totalPrice}</span>
                        </div>

                        {/* <button className="w-full mt-5 py-4 text-lg font-semibold bg-green-600 hover:bg-green-500 rounded-xl transition-all shadow-lg shadow-green-600/20">
                            Proceed to Checkout
                        </button> */}
                        <Button title='Proceed to Checkout' className='my-3' />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
