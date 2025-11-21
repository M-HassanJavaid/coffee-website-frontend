import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import SignupForm from '../components/SignupForm'
import AlertBox from '../components/AlertBox'


const Signup = () => {
  return (
    <>
    <Navbar animation={false} />
    <SignupForm/>
    <Footer/>
    <AlertBox/>
    </>
  )
}

export default Signup