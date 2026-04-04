import { useLayoutEffect, useRef, useContext } from 'react'
import Button from './Button.jsx';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { HomeContext } from '../pages/Home.jsx';

const aboutUs = () => {

  const img = useRef(null)
  const { isLoading } = useContext(HomeContext)


  useLayoutEffect(() => {
    const ctx = gsap.context(
      gsap.from(img.current, {
        x: -150,
        y: 100,
        scale: 0.2,
        scrollTrigger: {
          trigger: img.current,
          start: 'top 85%',
          end: 'top 65%',
          scrub: 3,
          // markers: true
        }
      }), img)

    return () => ctx.revert()

  }, [])

  useLayoutEffect(() => ScrollTrigger.refresh(), [isLoading])

  return (
    <section className="bg-neutral-800 text-white py-16 md:py-20 px-6 flex flex-col lg:flex-row gap-8 lg:gap-16 justify-center items-center min-h-[80vh]" >
      <img ref={img}
        src="https://media.istockphoto.com/id/1859646927/photo/closeup-image-of-a-man-and-a-woman-clinking-white-coffee-mugs-in-cafe.jpg?s=612x612&w=0&k=20&c=ildJ3UpGXCI7Xc-mQD40a4M65JB4rnBPYJSlpFIPBok="
        alt="Our Coffee Story"
        className="rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] object-cover w-full h-[300px] sm:h-[400px] lg:h-[500px] max-w-lg lg:w-1/2"
      />

      <div className="w-full flex flex-col justify-center lg:text-left text-center max-w-xl lg:w-1/2">
        <h2 className="text-4xl sm:text-5xl md:text-7xl text-zinc-50 font-extrabold py-3 md:py-5 font-fjalla leading-tight">
          Our Story
        </h2>
        <p className="text-zinc-100 leading-relaxed text-base md:text-lg mb-4 md:mb-6 animate-paragraphs px-2 lg:px-0 opacity-90">
          What started as a small roastery with a passion for pure flavor has grown into a movement to redefine coffee culture.
          Every bean we roast carries our dedication to quality, craftsmanship, and the joy of connection that only coffee can bring.
        </p>
        <p className="text-zinc-100 leading-relaxed text-base md:text-lg mb-8 md:mb-10 animate-paragraphs px-2 lg:px-0 opacity-90">
          From sourcing ethical beans from sustainable farms to handcrafting every blend with precision — we believe coffee isn’t just a drink, it’s an experience that unites people across the world.
        </p>

        <div className="w-full max-w-xs mx-auto lg:mx-0">
          <Button path='/' title='Read More' className="py-3 text-sm md:text-base"/>
        </div>
      </div>
    </section>
  );
}

export default aboutUs