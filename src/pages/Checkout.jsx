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
    fullName: z.string().min(3, "Full Name must be at least 3 characters"),

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
    const [savedAddress, setSavedAddress] = useState(null);
    const { alertMessage , setAlertMessage } = useContext(AppContext)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors , isSubmitting },
    } = useForm({
        resolver: zodResolver(checkoutSchema),
    });

    async function getCart() {
        try {
            let res = await fetch(
                `${import.meta.env.VITE_API_URL}/cart/me`,
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

    async function getSavedAddress() {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/user/profile`, {
                method: 'GET',
                credentials: 'include',
            });
            const data = await res.json();
            if (data.ok && data.profile) {
                if (data.profile.name) {
                    setValue('fullName', data.profile.name);
                }
                if (data.profile.address) {
                    setSavedAddress(data.profile.address);
                }
            }
        } catch (_) {
            // silently ignore — address just won't be pre-filled
        }
    }

    useEffect(() => {
        getCart();
        getSavedAddress();
    }, []);
    


    return (
        <div className="min-h-screen bg-neutral-950 text-zinc-50 flex flex-col">
            <Navbar />
            
            <main className="flex-grow pt-24 pb-12 px-4 md:px-8 max-w-[1400px] mx-auto w-full">
                <header className="mb-10 text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-fjalla italic text-amber-400 mb-4 tracking-tight">Checkout</h1>
                    <p className="text-zinc-400 max-w-2xl">Complete your coffee journey. Enter your shipping details and review your selection.</p>
                </header>

                <div className='flex flex-col lg:flex-row gap-12' >
                    <div className="flex-grow lg:max-w-[65%]">
                        <CheckoutForm register={register} errors={errors} setValue={setValue} savedAddress={savedAddress} />
                    </div>
                    <div className="lg:w-[35%]">
                        <div className="sticky top-24">
                            <OrderSummary isLoading={isLoading} cart={cart} handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
                        </div>
                    </div>
                </div>
            </main>

            <AlertBox/>
        </div>
    )
}

export default Checkout
