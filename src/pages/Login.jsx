import { useContext } from 'react'
import Navbar from '../components/Navbar'
import LoginForm from '../components/LoginForm'
import AlertBox from '../components/AlertBox'
import Footer from '../components/Footer'



const Login = () => {

  return (
    <>
      <Navbar animation={false}/>
      <LoginForm />
      <Footer />
      <AlertBox />
    </>
  )
}

export default Login