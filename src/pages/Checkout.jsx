import { useState , useContext , useEffect} from 'react'
import Navbar from '../components/Navbar'
import CheckoutForm from '../components/CheckoutForm'
import OrderSummary from '../components/OrderSummary'
import { AppContext } from '../App'
import AlertBox from '../components/AlertBox'

import { z } from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const checkoutSchema = z.object({
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),

    phone: z
        .string()
        .min(7, "Phone number is too short")
        .regex(
            /^(\+|0)[0-9]+$/,
            "Phone number must start with + or 0, gaps are not allowed and contain only numbers after that"
        ),


    streetAddress: z
        .string()
        .min(10, "Street address should be at least 10 characters"),

    landmark: z.string().optional(),

    postalCode: z
        .string()
        .min(5, "Postal Code must be 5 digits")
        .max(5, "Postal Code must be 5 digits")
        .regex(/^[0-9]{5}$/, "Postal Code must contain only 5 digits"),

    description: z.string().optional(),

    saveData: z.boolean().optional(),
});





const Checkout = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState(null);
    const { alertMessage , setAlertMessage } = useContext(AppContext)

     const {
        register,
        handleSubmit,
        formState: { errors , isSubmitting },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
    });

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
            setCart(res.cart);
        } catch (error) {
            setAlertMessage(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => { getCart(); } , []);
    


    return (
        <>
            <Navbar />
            <div className='flex gap-10 min-h-[calc(100vh-80px)] justify-center mt-20 p-2 bg-neutral-800' >
                <CheckoutForm register={register} errors={errors} />
                <OrderSummary isLoading={isLoading} cart={cart} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
            </div>
            <AlertBox/>
        </>
    )
}

export default Checkout
