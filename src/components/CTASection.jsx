import { useLayoutEffect, useRef , useContext} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger)
import Context from "../Context";
import Button from "./Button";

const CTASection = () => {
  const sectionRef = useRef();
  const { isLoading } = useContext(Context)

  useLayoutEffect(()=>{
    for (const key in isLoading) {
      if (isLoading[key]) {
        return;
      }
    }

    ScrollTrigger.refresh();
  }, [isLoading])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-content", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger:{
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 50%',
          toggleActions: "play none none reverse",

        }
      });

      gsap.from(".cta-btn", {
        scale: 0.8,
        opacity: 0,
        delay: 0.5,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger:{
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 50%',
          toggleActions: "play none none reverse",

        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-neutral-800 text-zinc-50 py-20 px-6 relative"
    >
      <div className="max-w-5xl mx-auto text-center space-y-6 cta-content">
        <h2 className="text-5xl font-extrabold font-fjalla tracking-wide max-sm:text-4xl">
          Start Your Coffee Journey Today ☕
        </h2>
        <p className="text-zinc-300 max-w-2xl mx-auto text-lg">
          Discover the finest blends, enjoy handcrafted flavors, and experience
          coffee made with passion. Every sip tells a story — make yours
          unforgettable.
        </p>
        <div className="flex justify-center gap-4 flex-wrap max-w-[400px] mx-auto">
          <Button title='Shop Now' invert={true}/>
          <Button title='Learn More'/>
        </div>
      </div>

      {/* optional decorative glow */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-400 blur-3xl opacity-30"></div>
      <div className="absolute top-0 right-0 w-60 h-60 bg-amber-400 blur-[100px] opacity-20"></div>
    </section>
  );
};

export default CTASection;
