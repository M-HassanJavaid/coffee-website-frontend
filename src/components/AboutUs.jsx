import { useLayoutEffect , useRef , useContext} from 'react'
import Button from './Button.jsx';
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import Context from '../Context.js';

const aboutUs = () => {

  const img = useRef(null)
  const { isLoading } = useContext(Context)


  useLayoutEffect(() => {

    for (const key in isLoading) {
      if (isLoading[key]) {
        return;
      }
    }

    const ctx = gsap.context(
      gsap.from(img.current , {
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

      return ()=> ctx.revert()

  }, [isLoading])

    return (
    <section className="bg-neutral-800 text-white py-20 px-6 flex gap-3 justify-around flex-wrap" >
          <img ref={img}
            src="https://media.istockphoto.com/id/1859646927/photo/closeup-image-of-a-man-and-a-woman-clinking-white-coffee-mugs-in-cafe.jpg?s=612x612&w=0&k=20&c=ildJ3UpGXCI7Xc-mQD40a4M65JB4rnBPYJSlpFIPBok="
            alt="Our Coffee Story"
            className="rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] object-cover w-full h-[500px] max-w-[500px]"
          />

        <div className="w-full flex flex-col justify-center max-w-xl">
          <h2 className="text-7xl text-zinc-50 font-extrabold py-5 font-fjalla max-sm:text-6xl">
            Our Story
          </h2>
          <p className="text-zinc-50 leading-relaxed text-lg mb-6 animate-paragraphs">
            What started as a small roastery with a passion for pure flavor has grown into a movement to redefine coffee culture.
            Every bean we roast carries our dedication to quality, craftsmanship, and the joy of connection that only coffee can bring.
          </p>
          <p className="text-zinc-50 leading-relaxed text-lg mb-10 animate-paragraphs">
            From sourcing ethical beans from sustainable farms to handcrafting every blend with precision — we believe coffee isn’t just a drink, it’s an experience that unites people across the world.
          </p>

          <Button path='/' title='Read More'/>

        </div>
    </section>
  );
}

export default aboutUs