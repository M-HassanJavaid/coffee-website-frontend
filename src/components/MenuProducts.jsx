import {useContext} from 'react'
import { menuContext } from '../pages/Menu'
import Loader from './Loader'
import ProductCard from './ProductCard'
import ProductCategorySection from './ProductCategorySection'


const categories = [ 'hotCoffee', 'frappes', 'iceCoffee', 'tea', 'snacks', 'cooler' ]

const MenuProducts = () => {

  const {isLoading , setIsLoading , searchBar , products , searchTerm} = useContext(menuContext)


  if (isLoading) {
    return <Loader/>
  }

  if(searchTerm){
    return(
      <section className='flex justify-center gap-5 p-5 bg-neutral-800 flex-wrap'>
        {products.length === 0 && <p className='text-white text-3xl text-center'>No matches found!</p>}
        {products.map((p)=> <ProductCard {...p} />)}
      </section>
    )
  }



  return (
    <section className='bg-neutral-800'>
      {categories.map((c)=> <ProductCategorySection category={c} products={products}/>)}
    </section>
  )
}

export default MenuProducts