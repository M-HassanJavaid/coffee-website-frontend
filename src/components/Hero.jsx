import { useContext, useLayoutEffect , useRef} from 'react'
import bgVideo from '../assets/bg-video.mp4'
import Button from './Button.jsx'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {

  return (
    <section className='min-h-screen relative pt-[80px]'>
        <video src={bgVideo} className='h-full w-full object-cover object-center absolute top-0 left-0 -z-2' muted autoPlay loop ></video>
        <div className='absolute top-0 left-0 h-full w-full bg-black -z-1 opacity-40' ></div>
        <div className='flex flex-col justify-start px-10 py-20 gap-10 max-w-[1700px] mx-auto max-sm:py-5' >
            <h1 className='text-zinc-50 font-fjalla text-7xl font-extrabold text-shadow-black max-sm:text-6xl'>Brewed to Perfection. <br /> Crafted for Coffee Lovers</h1>
            <p className='text-zinc-50 text-2xl max-sm:text-xl' >Enjoy freshly roasted coffee delivered right to your door.</p>
            <div className='flex max-w-sm gap-5 flex-wrap max-[400px]:w-full max-[400px]:items-stretch max-[400px]:flex-col '>
                <Button path='/' title='Order Now'  invert={true} />
                <Button path='/' title='Explore More' />
            </div>
        </div>
    </section>
  )
}

export default Hero
