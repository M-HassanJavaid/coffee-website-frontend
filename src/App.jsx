import { useEffect, useLayoutEffect, useState } from 'react'
import { RouterProvider, createBrowserRouter, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { gsap } from "gsap"
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Context from './Context.js'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
gsap.registerPlugin(ScrollTrigger)

function App() {

  const [alertMessage, setAlertMessage] = useState(null)
  const [isLoading, setIsLoading] = useState({
    bestSeller: true,
    reviews: false
  })



  useLayoutEffect(() => {
    const el = document.querySelectorAll('.animate-paragraphs');
    if (!el) return;

    el.forEach(element => {
      gsap.fromTo(element,
        {
          y: 50,
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 70%",
            toggleActions: "play none none reverse",
            // markers: true,
          },
        }
      );
    });

  }, [])

  useLayoutEffect(() => {
    for (const key in isLoading) {
      if (isLoading[key]) {
        return;
      }
    }

    ScrollTrigger.refresh();
  }, [isLoading])


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
      element: <Signup/>
    }
  ])

  return (
    <Context.Provider value={{ alertMessage, setAlertMessage, isLoading, setIsLoading }}>
      <RouterProvider router={router} />
    </Context.Provider>
  )
}

export default App
