import React from 'react'
import ProductCard from './ProductCard';

const categoryHeadings = {
  "hotCoffee": "Warm & Inviting Brews",
  "frappes": "Frosty & Delightful Frappes",
  "iceCoffee": "Iced Coffees to Chill Your Day",
  "tea": "Soothing Teas for Every Mood",
  "snacks": "Tasty Bites & Snacks",
  "cooler": "Refreshing Coolers & Beverages",
};


const ProductCategorySection = ({category , products}) => {
    
  return (
    <div id={category} className='scroll-mt-50'>
      <h1 className='font-fjalla text-5xl text-center text-zinc-50 p-5' >{categoryHeadings[category]}</h1>
      <div className='flex gap-5 flex-wrap px-3 py-6 justify-center'>
        {products
        .filter((p)=> p.category === category)
        .map((p)=> <ProductCard {...p} />)}
      </div>
    </div>
  )
}

export default ProductCategorySection
