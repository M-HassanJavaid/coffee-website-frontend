import { useRef, createContext, useState, useEffect, useContext } from 'react'
import Navbar from '../components/Navbar'
import MenuHero from '../components/MenuHero'
import CoffeeSearchBar from '../components/CoffeeSearchBar'
import MenuCategorySelector from '../components/MenuCategorySelector'
import MenuProducts from '../components/MenuProducts'
import AlertBox from '../components/AlertBox'
import Footer from '../components/Footer'
import ProductPage from '../components/ProductPage'
import { Outlet } from 'react-router-dom'
import { AppContext } from '../App'

export const menuContext = createContext();



const Menu = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const searchBar = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { setAlertMessage } = useContext(AppContext)

  useEffect(() => {
    async function getProducts() {
      try {
      
        let res = await fetch(`${import.meta.env.VITE_API_URL}/product/all?query=${searchTerm}`);
        res = await res.json();
        setProducts(res.products)
        console.log(res.products)
      } catch (error) {
        setAlertMessage(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    getProducts();

  }, [searchTerm])



  return (
    <menuContext.Provider value={{ isLoading, setIsLoading, searchBar, products, searchTerm, setSearchTerm }}>
      <Navbar/>
      <MenuHero />
      <CoffeeSearchBar />
      <MenuCategorySelector />
      <MenuProducts />
      <Footer/>
      <AlertBox/>
      <Outlet/>
      {/* <Cart/> */}
    </menuContext.Provider>
  )
}

export default Menu
