import { Outlet } from "react-router-dom";
import AlertBox from "../components/AlertBox";
import CartPage from "../components/CartPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { createContext, useState } from "react";
import ConfirmBox from "../components/ConfirmBox";

export const CartContext = createContext();

const Cart = () => {

    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState("Calculating...");




    return (
        <CartContext.Provider value={{cartItems, setCartItems , totalPrice, setTotalPrice}}>
            <Navbar animation={true} />
            <CartPage />
            <AlertBox />
            <Footer />
            <ConfirmBox/>
            <Outlet />
        </CartContext.Provider>
    );
};

export default Cart;
