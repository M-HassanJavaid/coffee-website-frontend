import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

export default function AboutHero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate background scale for depth
      gsap.to(".about-bg", {
        scale: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Animate text lines
      gsap.fromTo(
        '.lines',
        { y: 100, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.3,
          ease: "power4.out",
          delay: 0.5,
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="w-full min-h-screen flex items-center justify-center overflow-hidden bg-neutral-800 text-zinc-50 isolate pt-[100px]"
    >
      {/* Background Image with Overlay */}
      <img src="/about-bg.webp" alt="" className="fixed -z-20 h-screen w-screen object-cover object-center inset-0 about-bg bg-cover bg-center scale-100 transition-all duration-1000"/>
      <div className="fixed -z-10 inset-0 bg-neutral-800 opacity-50 h-screen w-screen backdrop-blur-sm" id="about-overlay"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1
          className="font-fjalla lines text-6xl md:text-7xl font-extrabold text-zinc-50 tracking-wide drop-shadow-[0_0_15px_rgba(255,193,7,0.5)]"
        >
          About Us
        </h1>

        <p
          className="lines my-6 text-lg md:text-xl text-zinc-50 leading-relaxed"
        >
          We don’t just build brands — we craft experiences that move people.
        </p>

        <p
          className="lines my-4 text-lg md:text-xl text-zinc-50 max-w-2xl mx-auto"
        >
          Every project we create blends creativity, purpose, and innovation — so
          your story doesn’t just stand out, it inspires.
        </p>

        <Button title='Explore Our Journey' element='#about-story' className='my-5 lines'/>
      </div>
    </section>
  );
}
