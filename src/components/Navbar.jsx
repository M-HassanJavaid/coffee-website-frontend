import { useLayoutEffect, useState, useRef, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser, faCircleArrowDown, faSignOutAlt, faSignInAlt, faUserPlus, faHistory } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../App';
gsap.registerPlugin(ScrollTrigger);


const Navbar = ({ animation }) => {

  const [NavOpen, setNavOpen] = useState(false)
  const [UserMenuOpen, setUserMenuOpen] = useState(false)
  const navbar = useRef(null)
  const navigate = useNavigate()
  const { user, setUser, setAlertMessage } = useContext(AppContext);

  const handleLogout = async () => {
    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      res = await res.json();
      setUser(null);
      setAlertMessage(res.message || 'Logged out successfully!');
      setUserMenuOpen(false);
      navigate('/');
    } catch (error) {
      setUser(null);
      setAlertMessage('Logged out!');
      setUserMenuOpen(false);
      navigate('/');
    }
  };

  useLayoutEffect(() => {
    if (!animation) return;
    const ctx = gsap.context(
      gsap.to(navbar.current, {
        backgroundColor: 'oklch(0.269 0 0)',
        scrollTrigger: {
          trigger: navbar.current,
          start: 'top -10%',
          end: 'top -20%',
          scrub: true,
        }
      }), navbar)

    console.log(navbar)

    return () => ctx.revert();

  }, []);

  return (
    <nav className={`${animation ? 'bg-transparent' : 'bg-neutral-800'} fixed z-50 top-0 left-0 w-full isolate transition-colors duration-300`} ref={navbar}>
      <div className='flex relative gap-4 justify-between px-4 md:px-8 py-3 h-[60px] md:h-[80px] items-center text-zinc-50 max-w-[1700px] mx-auto'>
        {/* Brand/Logo - Order 1 on Desktop, 2 on Mobile */}
        <h1 className='italic text-zinc-50 text-xl md:text-3xl max-lg:order-2 font-fjalla truncate'>CoffeeClub</h1>
        
        {/* Toggle Button - Order 1 on Mobile to keep it on the left */}
        <button 
          aria-label="Toggle Navigation"
          className={`hidden max-lg:block max-lg:order-1 transition-all duration-300 ${NavOpen ? 'rotate-180' : 'rotate-0'}`} 
          onClick={() => setNavOpen(!NavOpen)}
        >
          <FontAwesomeIcon icon={faCircleArrowDown} className='text-2xl md:text-4xl' />
        </button>

        {/* Navigation Links */}
        <ul className={`flex text-nowrap gap-4 lg:gap-6 overflow-hidden transition-all duration-300 max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:w-full max-lg:bg-neutral-800/98 max-lg:backdrop-blur-md max-lg:px-5 
                       max-lg:justify-center max-lg:flex-col max-lg:items-center max-lg:z-50 ${NavOpen ? 'open-nav' : 'close-nav'}`}>
          <li className='block my-1.5 hover:text-amber-400 font-medium text-sm md:text-base tracking-wide transition-colors'><Link to='/' onClick={() => setNavOpen(false)}>HOME</Link></li>
          <li className='block my-1.5 hover:text-amber-400 font-medium text-sm md:text-base tracking-wide transition-colors'><Link to='/menu' onClick={() => setNavOpen(false)}>MENU</Link></li>
          <li className='block my-1.5 hover:text-amber-400 font-medium text-sm md:text-base tracking-wide transition-colors'><Link to='/about' onClick={() => setNavOpen(false)}>ABOUT US</Link></li>
        </ul>

        {/* Action Icons - Order 3 */}
        <ul className='flex gap-4 md:gap-6 items-center max-lg:order-3'>
          <li className='hover:text-amber-400 hover:scale-110 transition-transform'>
            <Link to='/cart' aria-label="Cart">
              <FontAwesomeIcon icon={faCartShopping} className='text-lg md:text-2xl cursor-pointer' />
            </Link>
          </li>
          <li className='relative' onMouseEnter={() => setUserMenuOpen(true)} onMouseLeave={() => setUserMenuOpen(false)}>
            <div className='hover:text-amber-400 hover:scale-110 transition-transform cursor-pointer py-2'>
                <FontAwesomeIcon icon={faUser} className='text-lg md:text-2xl' />
            </div>

            <AnimatePresence>
              {UserMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className='absolute right-0 top-full mt-1 w-48 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-xl shadow-2xl overflow-hidden z-[100]'
                >
                  <div className='flex flex-col p-2'>
                    {user ? (
                      <>
                        <div className='px-4 py-2 text-xs font-semibold text-amber-400 uppercase tracking-wider border-b border-neutral-800 mb-1'>
                          Account
                        </div>
                        <Link 
                          to='/orders' 
                          onClick={() => setUserMenuOpen(false)}
                          className='flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-neutral-800 hover:text-amber-400 rounded-lg transition-all duration-200'
                        >
                          <FontAwesomeIcon icon={faHistory} />
                          My Orders
                        </Link>
                        <button 
                          onClick={handleLogout}
                          className='flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-rose-500/10 hover:text-rose-500 rounded-lg transition-all duration-200 text-left'
                        >
                          <FontAwesomeIcon icon={faSignOutAlt} />
                          Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <Link 
                          to='/login' 
                          onClick={() => setUserMenuOpen(false)}
                          className='flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-amber-400 hover:text-neutral-900 rounded-lg transition-all duration-200'
                        >
                          <FontAwesomeIcon icon={faSignInAlt} />
                          Login
                        </Link>
                        <Link 
                          to='/signup' 
                          onClick={() => setUserMenuOpen(false)}
                          className='flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-zinc-300 hover:bg-amber-400 hover:text-neutral-900 rounded-lg transition-all duration-200'
                        >
                          <FontAwesomeIcon icon={faUserPlus} />
                          Signup
                        </Link>
                      </>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
