import { useRef , useEffect , useContext , useLayoutEffect} from 'react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Context from '../Context';

const WhyChooseUsCard = ({ img, title, desc }) => {

  const card = useRef()
  const { isLoading } = useContext(Context)

  useLayoutEffect(() => {
    gsap.fromTo(card.current, {
      y: 0,
      duration: 1,
      ease: "power3.out",
    }, { 
      y: 150,
      scrollTrigger:{
        trigger: card.current, 
        start: "top 70%",
        end: "top 10%",
        scrub: 3,
        // markers: true,
      }
    })

  }, [])
  
  useLayoutEffect(()=>{
    for (const key in isLoading) {
      if (isLoading[key]) {
        return;
      }
    }

    ScrollTrigger.refresh();
  }, [isLoading])

  return (
    <div className='h-90 w-75 m-3 bg-black relative isolate py-3 rounded-sm overflow-hidden text-center'>
      <img src={img} className='h-full w-full object-cover object-center absolute top-0 left-0 -z-1' alt="" />
      <div className=' bg-black/50 backdrop-blur-lg rounded-sm border-zinc-50 w-full border-y-2 text-zinc-50 p-2' ref={card}>
        <h2 className='text-2xl font-fjalla py-2 text-amber-400 italic tracking-widest'>{title}</h2>
        <p className='py-2'>{desc}</p>
      </div>
    </div>
  )
}

export default WhyChooseUsCard