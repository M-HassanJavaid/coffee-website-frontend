import AlertBox from "../components/AlertBox";
import CartPage from "../components/CartPage";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Cart = () => {


    return (
        <>
            <Navbar animation={true}/>
            <CartPage />
            <AlertBox/>
            <Footer/>
        </>
    );
};

export default Cart;
