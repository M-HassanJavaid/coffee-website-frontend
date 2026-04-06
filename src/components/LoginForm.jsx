import { useContext, useLayoutEffect, useRef, useState ,} from "react";
import { useNavigate , Link} from "react-router-dom";
import { gsap } from "gsap";
import Button from "./Button";
import { Eye, EyeClosed } from 'lucide-react'
import Loader from "./Loader";
import { AppContext } from "../App";
import { isEmail } from "validator";


const LoginForm = () => {
  const formRef = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setisSubmitting] = useState(false);
  const { setAlertMessage, setUser } = useContext(AppContext)

  const navigate = useNavigate()

  async function submitForm() {
    try {

      let email = emailInput.current.value;
      let password = passwordInput.current.value;

      if (!email.trim() || !password.trim()) {
        throw new Error('One or more field is empty.')
      }

      setisSubmitting(true);
      let res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email,
          password
        })
      });
      res = await res.json();
      console.log('On login form => ' + res.message)

      if (!res.ok) {
        throw new Error(res.message)
      }

      setUser(res.user)
      setAlertMessage('You have successfully login!')
      navigate('/')

    } catch (error) {
      console.log(error.message)
      setAlertMessage(error.message)
    } finally{
      setisSubmitting(false)
    }
  }

  function changePasswordInput() {
    setShowPassword(!showPassword)
  }

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.from(".login-box", {
  //       y: 60,
  //       opacity: 0,
  //       filter: "blur(5px)",
  //       duration: 1,
  //       ease: "power3.out",
  //     });

  //     gsap.from(".login-input", {
  //       y: 20,
  //       opacity: 0,
  //       stagger: 0.2,
  //       delay: 0.5,
  //       ease: "power2.out",
  //     });
  //   }, formRef);

  //   return () => ctx.revert();

  // }, []);

  if (isSubmitting) {
    return <Loader style={{height: '100vh'}} />
  }

  return (
    <div
      ref={formRef}
      className="min-h-screen flex items-center justify-center bg-neutral-800 px-4 py-12"
    >
      <div className="login-box bg-black text-zinc-50 rounded-xl shadow-2xl w-full max-w-sm p-6 sm:p-8 md:p-10 border-[1px] border-amber-400/50">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-amber-400 italic">
          Welcome Back 👋
        </h2>

        <form className="space-y-4 md:space-y-5" >
          <div>
            <label className="block text-zinc-300 text-sm font-medium mb-1.5">
              Email
            </label>
            <input
              ref={emailInput}
              type="email"
              placeholder="Enter your email"
              className="login-input w-full px-4 py-2.5 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 focus:shadow-[0_0_15px_rgba(255,193,7,0.2)] transition-all text-sm md:text-base outline-none"
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
                className="login-input w-full px-4 py-2.5 pr-12 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 focus:shadow-[0_0_15px_rgba(255,193,7,0.2)] transition-all text-sm md:text-base outline-none"
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

          <div className="pt-2">
            <Button title='Login' className='w-full py-2.5 text-sm md:text-base font-bold' func={(e)=> {
               e.preventDefault();
               submitForm();
            }}/>
          </div>
        </form>

        <p className="text-center text-zinc-400 mt-6 text-xs md:text-sm">
          Don’t have an account?{" "}
          <Link to='/signup' className="text-amber-500 font-semibold hover:text-amber-400 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
