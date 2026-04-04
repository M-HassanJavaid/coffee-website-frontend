import { useContext, useLayoutEffect, useRef } from 'react'
import bgVideo from '../assets/bg-video.mp4'
import Button from './Button.jsx'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  return (
    <section className='min-h-[80vh] md:min-h-screen relative pt-[60px] md:pt-[80px] flex justify-start items-start'>
      <video src={bgVideo} className='h-full w-full object-cover object-center absolute top-0 left-0 -z-2' muted autoPlay loop ></video>
      <div className='absolute top-0 left-0 h-full w-full bg-black -z-1 opacity-40' ></div>
      <div className='flex flex-col justify-center px-6 md:px-10 py-12 md:py-20 gap-6 md:gap-10 max-w-[1700px] mx-auto w-full' >
        <h1 className='text-zinc-50 font-fjalla text-4xl sm:text-5xl md:text-7xl font-extrabold text-shadow-black leading-tight'>
          Brewed to Perfection. <br className="hidden md:block" /> Crafted for Coffee Lovers
        </h1>
        <p className='text-zinc-50 text-lg md:text-2xl max-w-2xl' >Enjoy freshly roasted coffee delivered right to your door.</p>
        <div className='flex max-w-sm gap-4 flex-wrap max-[400px]:flex-col '>
          <Button path='/' title='Order Now' invert={true} />
          <Button path='/' title='Explore More' />
        </div>
      </div>
    </section>
  )
}

export default Hero
