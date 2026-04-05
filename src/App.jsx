import { useEffect, useLayoutEffect, useState, createContext , lazy} from 'react'
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import About from './pages/About.jsx'
import Menu from './pages/Menu.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Orders from './pages/Orders.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
// Sub Pages

import ProductPage from './components/ProductPage.jsx'

gsap.registerPlugin(ScrollTrigger)


const AppContext = createContext();

function App() {

  const [alertMessage, setAlertMessage] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [confirm, setConfirm] = useState({message: '' , func: () => {} })
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        let res = await fetch('https://coffee-website-backend-gamma.vercel.app/auth/refreshToken', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const data = await res.json();
        if (data.ok) {
          // You might want to fetch actual user profile here if refreshToken doesn't return it
          // For now, we'll assume the session is valid
          setUser({ name: 'User' }); // Minimal user object
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
    checkAuth();
  }, []);


  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <Signup />
    },
    {
      path: '/about',
      element: <About />
    },
    {
      path: '/menu',
      element: <Menu/>,
      children: [
        {
          path: ':id',
          element: <ProductPage isCartItem={false} />
        }
      ]
    },
    {
      path: '/cart',
      element: <ProtectedRoute><Cart/></ProtectedRoute>,
      children: [
        {
          path: 'edit/:id',
          element: <ProductPage  isCartItem={true} />
        }
      ]
    },
    {
      path: '/checkout',
      element: <ProtectedRoute><Checkout/></ProtectedRoute>
    },
    {
      path: '/orders',
      element: <ProtectedRoute><Orders/></ProtectedRoute>
    },
    {
      path: '/test',
      element: <p>Nothing to test</p>
    }
  ])

  return (
    <AppContext.Provider value={{ alertMessage, setAlertMessage , isCartOpen , setIsCartOpen , confirm , setConfirm, user, setUser, isLoading }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}

export default App
export { AppContext }
