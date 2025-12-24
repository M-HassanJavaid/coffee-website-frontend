import { useEffect, useLayoutEffect, useState, createContext , lazy} from 'react'
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Menu from './pages/Menu.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
// Sub Pages

import ProductPage from './components/ProductPage.jsx'

gsap.registerPlugin(ScrollTrigger)


const AppContext = createContext();

function App() {

  const [alertMessage, setAlertMessage] = useState(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [confirm, setConfirm] = useState({message: '' , func: () => {} })


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
      path: '/contact',
      element: <Contact/>
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
      element: <Cart/>,
      children: [
        {
          path: 'edit/:id',
          element: <ProductPage  isCartItem={true} />
        }
      ]
    },
    {
      path: '/checkout',
      element: <Checkout/>
    },
    {
      path: '/test',
      element: <p>Nothing to test</p>
    }
  ])

  return (
    <AppContext.Provider value={{ alertMessage, setAlertMessage , isCartOpen , setIsCartOpen , confirm , setConfirm }}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  )
}

export default App
export { AppContext }
