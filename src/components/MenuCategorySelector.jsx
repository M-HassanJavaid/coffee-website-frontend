import { useState, useEffect, useContext, useLayoutEffect, useRef } from 'react'
import { menuContext } from '../pages/Menu'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);


const MenuCategorySelector = () => {

    const { isLoading, setIsLoading, searchBar, products, searchTerm, setSearchTerm } = useContext(menuContext)

    if (isLoading || searchTerm) {
        return null
    }

    useLayoutEffect(() => ScrollTrigger.refresh(), [isLoading])


    const category = [
        {
            name: 'Hot Coffee',
            img: '/hotCoffeeIcon.webp',
            id: 'hotCoffee'
        },
        {
            name: 'Frappes',
            img: '/frappesIcon.webp',
            id: 'frappes'
        },
        {
            name: 'Ice Coffee',
            img: '/icedCoffeeIcon.webp',
            id: 'iceCoffee'
        },
        {
            name: 'Tea',
            img: '/teaIcon.webp',
            id: 'tea'

        },
        {
            name: 'Snacks',
            img: '/snacksIcon.webp',
            id: 'snacks'
        },
        {
            name: 'Coolers',
            img: '/coolersIcon.webp',
            id: 'cooler'
        },
    ]



    return (
        <div className='bg-neutral-800 pb-2 px-2 transition-all overflow-auto sticky top-[60px] md:top-[80px] z-50' >
            <div className='overflow-x-auto flex justify-start sm:justify-center gap-3 sm:gap-5 p-2 mx-auto max-w-6xl rounded-b-2xl bg-neutral-900 border-b-2 border-x-2 border-amber-400 border-t-transparent scrollbar-hide'>
                {category.map((item, i) => (
                    <a href={'#' + item.id} key={i} className='shrink-0'>
                        <div className='p-2 sm:p-4 border-2 border-transparent rounded-xl hover:border-amber-400 group cursor-pointer transition-all duration-300'>
                            <img 
                                className='h-8 sm:h-12 aspect-square mx-auto mb-1 sm:mb-2 object-contain' 
                                src={item.img} 
                                alt={item.name} 
                            />
                            <p className='text-[10px] sm:text-xs md:text-sm text-center text-zinc-50 group-hover:text-amber-400 font-medium whitespace-nowrap uppercase tracking-wider'>
                                {item.name}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default MenuCategorySelector