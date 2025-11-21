import { useLayoutEffect, useState, useRef , useContext} from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


const Navbar = ({animation}) => {

  const [NavOpen, setNavOpen] = useState(false)
  const navbar = useRef(null)

  useLayoutEffect(() => {
    if(!animation) return;
    const ctx = gsap.context(
      gsap.to(navbar.current , {
        backgroundColor: 'oklch(0.269 0 0)',
        scrollTrigger:{
          trigger: navbar.current,
          start: 'top -10%',
          end: 'top -20%',
          scrub: true,
        }
      }), navbar )

      console.log(navbar)

      return () =>  ctx.revert();

  }, []);

  return (
    <nav className={`${animation ? 'bg-transparent' : 'bg-neutral-800'} fixed z-20 top-0 left-0 w-screen isolate`} ref={navbar}>
      <div className='flex relative gap-2.5 justify-between px-5 py-3 h-[80px] items-center text-zinc-50 max-w-[1700px] mx-auto'>
        <h1 className='italic text-zinc-50 text-3xl max-lg:order-2'>CoffeeClub</h1>
        <p className={`hidden max-lg:block max-lg:order-1 transition-all ${NavOpen ? 'rotate-180' : 'rotate-0'}`} onClick={() => setNavOpen(!NavOpen)} ><FontAwesomeIcon icon={faCircleArrowDown} className='text-4xl' /></p>
        <ul className={`flex text-nowrap gap-4 overflow-hidden transition-all max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:w-full max-lg:bg-neutral-800 max-lg:px-5 
                       max-lg:justify-center max-lg:flex-wrap max-lg:z-50 ${NavOpen ? 'open-nav' : 'close-nav'}`}>
          <li className='block my-1.5 hover:text-amber-400'><Link to='/'>HOME</Link></li>
          <li className='block my-1.5 hover:text-amber-400'><Link to='/menu'>MENU</Link></li>
          <li className='block my-1.5 hover:text-amber-400'><Link to='/about'>ABOUT US</Link></li>
          <li className='block my-1.5 hover:text-amber-400'><Link to='/contact'>CONTACT US</Link></li>
          <li className='block my-1.5 hover:text-amber-400'><Link to='/signup'>SIGNUP</Link></li>
          <li className='block my-1.5 hover:text-amber-400'><Link to='/login'>LOGIN</Link></li>
          <li className='block my-1.5 hover:text-amber-400'><Link to='/'>LOGOUT</Link></li>
        </ul>
        <ul className='flex gap-4 items-center max-lg:order-3'>
          <li className='hover:text-amber-400 hover:scale-110'><Link to='/cart'><FontAwesomeIcon icon={faCartShopping} className='text-2xl cursor-pointer' /></Link></li>
          <li className='hover:text-amber-400 hover:scale-110'><Link><FontAwesomeIcon icon={faUser} className='text-2xl cursor-pointer' /></Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
