import React from 'react'
import WhyChooseUsCard from './WhyChooseUsCard'

const whyChooseUs = () => {

    const features = [
        {
            img: '/Roasted_coffee_beans.jpg',
            title: "Expertly Roasted Beans",
            desc: "Each batch is hand-roasted by skilled artisans to bring out the coffee’s true character and depth of flavor.",
        },
        {
            img: '/whyUs2.png',
            title: "Unmatched Quality",
            desc: "We use only top-grade Arabica beans, sourced from the world’s most renowned coffee-growing regions.",
        },
        {
            img: '/whyUs3.png',
            title: "Fast & Fresh Delivery",
            desc: "Your coffee arrives swiftly at your doorstep — fresh, aromatic, and ready to brew your perfect cup.",
        },
        {
            img: '/whyUs4.png',
            title: "Ethically Sourced",
            desc: "We partner directly with sustainable farms to ensure fair trade and eco-friendly coffee cultivation.",
        },
    ];

    return (
        <section className='bg-neutral-800 px-4 pt-12 pb-20'>
            <h1 className='font-fjalla text-4xl sm:text-5xl md:text-7xl text-zinc-50 py-8 text-center font-extrabold px-4 leading-tight'>
                Why Choose Us?
            </h1>
            <p className='text-center text-zinc-100 max-w-4xl mx-auto pb-10 text-base md:text-lg animate-paragraphs leading-relaxed px-4'>
                At <span className='font-bold italic tracking-widest text-amber-400'>Coffee Club</span>, every cup tells a story. We source the finest beans, roast them with precision,
                and deliver a taste that blends passion with perfection. From rich aroma to smooth flavor —
                we’re committed to giving coffee lovers a truly elevated experience,
                one sip at a time.
            </p>

            <div className='flex justify-center gap-6 flex-wrap px-4'>
                {features.map((f , i) => <WhyChooseUsCard {...f} key={i} />)}
            </div>


        </section>
    )
}

export default whyChooseUs