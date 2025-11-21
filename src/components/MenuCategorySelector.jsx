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
        <div className='bg-neutral-800 pb-2 px-2 transition-all overflow-auto sticky top-20 z-20' >
            <div className='overflow-auto flex justify-center gap-5 p-2 mx-auto max-w-6xl rounded-b-2xl bg-neutral-900 border border-b-amber-400 border-x-amber-400 border-t-transparent'>
                {category.map((item, i) => (
                    <a href={'#' + item.id}>
                        <div className='shrink-0 p-4 border-transparent rounded-2xl border-2 hover:border-amber-400 group cursor-pointer transition' key={i}>
                            <img className='h-12 aspect-square mx-auto' src={item.img} alt="Due to soem issue icon could not load!" />
                            <p className='text-center text-zinc-50 group-hover:text-amber-400'>{item.name}</p>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    )
}

export default MenuCategorySelector