import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Button from "./Button";

function AboutStory() {
  const storyRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate image
      gsap.fromTo(
        ".story-image",
        { scale: 1.2, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power4.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
            // markers: true
          },
        }
      );

      // Animate text elements
      gsap.fromTo(
        ".story-text",
        { y: 60, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, storyRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about-story"
      ref={storyRef}
      className="bg-neutral-800 text-zinc-50 py-24 px-6 overflow-hidden min-h-screen scroll-mt-[100px]"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        {/* Left Image */}
        <div className="relative w-full lg:w-1/2">
          <div className="story-image w-full h-[400px] rounded-3xl overflow-hidden shadow-[0_0_40px_rgba(255,193,7,0.2)]">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-amber-400 rounded-3xl blur-3xl opacity-40"></div>
        </div>

        {/* Right Content */}
        <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
          <h2 className="story-text text-5xl md:text-6xl font-extrabold text-zinc-50 font-fjalla">
            Our Story
          </h2>

          <p className="story-text text-zinc-50 text-lg leading-relaxed">
            What started as a small dream soon became a passion to craft
            something extraordinary — a space where creativity, care, and
            culture blend in every sip.
          </p>

          <p className="story-text text-zinc-50 text-lg leading-relaxed">
            Every bean we roast and every story we tell carries our belief that
            great coffee connects people. From local farmers to your favorite
            cup, it’s a journey of love, patience, and perfection.
          </p>

          <Button title='Discover More' className='story-text'/>

        </div>
      </div>
    </section>
  );
}


export default AboutStory