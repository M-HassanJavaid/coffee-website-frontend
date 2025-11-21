import { useContext, useLayoutEffect, useRef, useState, } from "react";
import { useNavigate, Link } from "react-router-dom";
import { gsap } from "gsap";
import Button from "./Button";
import { Eye, EyeClosed } from 'lucide-react'
import Loader from "./Loader";
import { isEmail, isStrongPassword } from 'validator'
import { AppContext } from "../App";




const SignupForm = () => {
    const formRef = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const nameInput = useRef();
    const [showPassword, setShowPassword] = useState(false)
    const [isSubmitting, setisSubmitting] = useState(false);
    const { setAlertMessage } = useContext(AppContext)

    const navigate = useNavigate()

    async function submitForm() {
        try {
            let email = emailInput.current.value;
            let password = passwordInput.current.value;
            let name = nameInput.current.value;

            if (!isEmail(email)) {
                setAlertMessage('Your email is not valid.');
                return;
            }

            if (!isStrongPassword(password)) {
                setAlertMessage('Your password does not meet our requirements.');
                return;
            }

            console.log(name , name.length)

            if (name.length < 3) {
                setAlertMessage('Name should have minimum 3 characters.')
                return;
            }

            setisSubmitting(true)

            let res = await fetch('https://coffee-website-backend-gamma.vercel.app/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    name
                })
            });

            res = await res.json();

            if (!res.ok) {
                setAlertMessage(res.message);
                return;
            }

            setAlertMessage('You have successfully signup.')
            navigate('/')

        } catch (error) {

            setAlertMessage(error.message)

        } finally {
            setisSubmitting(false)
        }

    }

    function changePasswordInput() {
        setShowPassword(!showPassword)
    }

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".signup-box", {
                y: 60,
                opacity: 0,
                filter: "blur(5px)",
                duration: 1,
                ease: "power3.out",
            });

            gsap.from(".signup-input", {
                y: 20,
                opacity: 0,
                stagger: 0.2,
                delay: 0.5,
                ease: "power2.out",
            });
        }, formRef);

        return () => ctx.revert();

    }, []);

    if (isSubmitting) {
        return <Loader style={{height: '100vh'}} />
    }

    return (
        <div
            ref={formRef}
            className="min-h-screen flex items-center justify-center bg-neutral-800 p-5 pt-[100px]"
        >
            <div className="signup-box bg-black text-zinc-50 rounded-2xl shadow-2xl w-[90%] max-w-md p-10 border-2 border-amber-400">
                <h2 className="text-3xl font-bold text-center mb-6 text-amber-400">
                    Join Us 🤝
                </h2>

                <form className="space-y-5" >
                    <div>
                        <label className="block text-zinc-50 font-semibold mb-2">
                            Name
                        </label>
                        <input
                            ref={nameInput}
                            type="email"
                            placeholder="Enter your full name"
                            className="signup-input w-full px-4 py-3 rounded-lg bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>
                    <div>
                        <label className="block text-zinc-50 font-semibold mb-2">
                            Email
                        </label>
                        <input
                            ref={emailInput}
                            type="email"
                            placeholder="Enter your email"
                            className="signup-input w-full px-4 py-3 rounded-lg bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-zinc-50 font-semibold mb-2">
                            Password
                        </label>
                        <input
                            ref={passwordInput}
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            className="signup-input w-full px-4 py-3 rounded-lg bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                        {showPassword ? (
                            <EyeClosed className="absolute right-3 top-10 cursor-pointer" size={30} color="black" onClick={changePasswordInput} />
                        ) : (
                            <Eye className="absolute right-3 top-10 cursor-pointer" size={30} color="black" onClick={changePasswordInput} />
                        )}

                    </div>

                    <ul className="">
                        <li className="font-bold my-2 text-amber-400">Password should have:</li>
                        <li>Minimum 8 letters.</li>
                        <li>Minimum 1 uppercase letter.</li>
                        <li>Minimum 1 lowercase letter.</li>
                        <li>Minimum 1 number.</li>
                        <li>Minimum 1 special character.</li>
                    </ul>

                    <Button title='Signup' className='w-full' func={(e) => {
                        e.preventDefault();
                        submitForm();
                    }} />
                </form>

                <p className="text-center text-zinc-50 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to='/login' className="text-amber-500 font-semibold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupForm;
