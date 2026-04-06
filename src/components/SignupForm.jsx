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
    const { setAlertMessage, setUser } = useContext(AppContext)

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

            let res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
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

            setUser(res.user)
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

    // useLayoutEffect(() => {
    //     const ctx = gsap.context(() => {
    //         gsap.from(".signup-box", {
    //             y: 60,
    //             opacity: 0,
    //             filter: "blur(5px)",
    //             duration: 1,
    //             ease: "power3.out",
    //         });

    //         gsap.from(".signup-input", {
    //             y: 20,
    //             opacity: 0,
    //             stagger: 0.2,
    //             delay: 0.5,
    //             ease: "power2.out",
    //         });
    //     }, formRef);

    //     return () => ctx.revert();

    // }, []);

    if (isSubmitting) {
        return <Loader style={{height: '100vh'}} />
    }

    return (
    <div
      ref={formRef}
      className="min-h-screen flex items-center justify-center bg-neutral-800 px-4 py-12 pt-[80px] md:pt-[100px]"
    >
      <div className="signup-box bg-black text-zinc-50 rounded-xl shadow-2xl w-full max-w-sm p-6 sm:p-8 md:p-10 border-[1px] border-amber-400/50">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-amber-400 italic">
          Join Us 🤝
        </h2>

        <form className="space-y-4 md:space-y-5" >
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">
              Name
            </label>
            <input
              ref={nameInput}
              type="text"
              placeholder="Enter your full name"
              className="signup-input w-full px-4 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 focus:shadow-[0_0_15px_rgba(255,193,7,0.2)] transition-all text-sm md:text-base outline-none"
            />
          </div>
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              ref={emailInput}
              type="email"
              placeholder="Enter your email"
              className="signup-input w-full px-4 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 focus:shadow-[0_0_15px_rgba(255,193,7,0.2)] transition-all text-sm md:text-base outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                ref={passwordInput}
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="signup-input w-full px-4 py-2.5 pr-12 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 focus:shadow-[0_0_15px_rgba(255,193,7,0.2)] transition-all text-sm md:text-base outline-none"
              />
              <button
                type="button"
                onClick={changePasswordInput}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <ul className="text-[10px] sm:text-xs text-zinc-400 space-y-1 pl-2">
            <li className="font-bold my-1 sm:my-2 text-amber-400/80">Password should have:</li>
            <li className="flex items-center before:content-['•'] before:mr-2 before:text-amber-500">Minimum 8 letters.</li>
            <li className="flex items-center before:content-['•'] before:mr-2 before:text-amber-500">Minimum 1 uppercase letter.</li>
            <li className="flex items-center before:content-['•'] before:mr-2 before:text-amber-500">Minimum 1 lowercase letter.</li>
            <li className="flex items-center before:content-['•'] before:mr-2 before:text-amber-500">Minimum 1 number.</li>
            <li className="flex items-center before:content-['•'] before:mr-2 before:text-amber-500">Minimum 1 special character.</li>
          </ul>

          <div className="pt-2">
            <Button title='Signup' className='w-full py-2.5 text-sm md:text-base font-bold' func={(e) => {
              e.preventDefault();
              submitForm();
            }} />
          </div>
        </form>

        <p className="text-center text-zinc-400 mt-6 text-xs md:text-sm">
          Already have an account?{" "}
          <Link to='/login' className="text-amber-500 font-semibold hover:text-amber-400 transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
    );
};

export default SignupForm;
