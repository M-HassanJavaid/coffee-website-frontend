import { useContext, useLayoutEffect, useRef, useState ,} from "react";
import { useNavigate , Link} from "react-router-dom";
import { gsap } from "gsap";
import Button from "./Button";
import { Eye, EyeClosed } from 'lucide-react'
import Loader from "./Loader";
import Context from "../Context";



const LoginForm = () => {
  const formRef = useRef();
  const emailInput = useRef();
  const passwordInput = useRef();
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setisSubmitting] = useState(false);
  const { setAlertMessage } = useContext(Context)

  const navigate = useNavigate()

  async function submitForm() {
    try {

      let email = emailInput.current.value;
      let password = passwordInput.current.value;

      console.log(email , password)

      setisSubmitting(true);
      console.log('API is fetching...')
      let res = await fetch('https://coffee-website-backend-gamma.vercel.app/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });
      res = await res.json();

      if (!res.ok) {
        throw new Error(res.message)
      }

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".login-box", {
        y: 60,
        opacity: 0,
        filter: "blur(5px)",
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".login-input", {
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
    return <Loader height='100vh' />
  }

  return (
    <div
      ref={formRef}
      className="min-h-screen flex items-center justify-center bg-neutral-800"
    >
      <div className="login-box bg-black text-zinc-50 rounded-2xl shadow-2xl w-[90%] max-w-md p-10 border-2 border-amber-400">
        <h2 className="text-3xl font-bold text-center mb-6 text-amber-400">
          Welcome Back 👋
        </h2>

        <form className="space-y-5" >
          <div>
            <label className="block text-zinc-50 font-semibold mb-2">
              Email
            </label>
            <input
              ref={emailInput}
              type="email"
              placeholder="Enter your email"
              className="login-input w-full px-4 py-3 rounded-lg bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
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
              className="login-input w-full px-4 py-3 rounded-lg bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
            {showPassword ? (
              <EyeClosed className="absolute right-3 top-10 cursor-pointer" size={30} color="black" onClick={changePasswordInput} />
            ) : (
              <Eye className="absolute right-3 top-10 cursor-pointer" size={30} color="black" onClick={changePasswordInput} />
            )}

          </div>

          <Button title='Login' className='w-full' func={(e)=> {
             e.preventDefault();
             submitForm();
          }}/>
        </form>

        <p className="text-center text-zinc-50 mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to='/signup' className="text-amber-500 font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
