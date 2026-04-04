import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WobbleCard from "../aceternityComponents/woobleCard";
gsap.registerPlugin(ScrollTrigger);

const missionData = [
  {
    title: "Innovation",
    para: "We embrace creativity and forward-thinking to build unique digital experiences that inspire, engage, and set new standards for excellence.",
  },
  {
    title: "Integrity",
    para: "Honesty and transparency drive everything we do. We believe trust is built through consistent quality, reliability, and open communication.",
  },
  {
    title: "Excellence",
    para: "From design to delivery, we pursue perfection. Every project we touch is a reflection of our passion for quality and detail.",
  },
  {
    title: "Collaboration",
    para: "We work hand-in-hand with our clients, combining ideas and expertise to bring visions to life with purpose and precision.",
  },
  {
    title: "Impact",
    para: "Our mission goes beyond design — we aim to make a difference, creating digital experiences that inspire action and add real value.",
  },
];



const OurMission = () => {

    const sectionRef = useRef(null)

    useLayoutEffect(() => {
        gsap.context(() => {
            gsap.from(".mission-title", {
                opacity: 0,
                y: 50,
                duration: 1.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 85%",
                },
            });

            gsap.from(".mission-text", {
                opacity: 0,
                y: 60,
                duration: 1.2,
                delay: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                },
            });

            gsap.fromTo('.mission-card',
                {
                    y: 50,
                    opacity: 0
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.3,
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 50%',
                        // markers: true
                    }
                }
            );
        }, sectionRef);
    }, []);

    return (
        <section className="mission-section text-zinc-50 py-16 md:py-24 px-6 md:px-16 overflow-hidden isolate" ref={sectionRef}>
            <div className="max-w-6xl mx-auto text-center">
                {/* Title */}
                <h2 className="mission-title font-fjalla text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">
                    Our Mission
                </h2>
                {/* Description */}
                <p className="mission-text text-base md:text-lg text-zinc-300 max-w-2xl mx-auto mb-10 md:mb-16 leading-relaxed opacity-90 px-4">
                    To empower creators and businesses with design, innovation, and digital
                    excellence. We strive to craft experiences that connect people and leave
                    a lasting impact.
                </p>

                {/* Mission Cards */}
                <div className="flex justify-center gap-4 md:gap-6 flex-wrap px-4">
                    {missionData.map((d, i)=> (
                    <WobbleCard key={i} containerClassName='mission-card max-w-[320px] sm:max-w-md bg-neutral-950/50 backdrop-blur-md border-[1px] border-white/20 hover:border-amber-400/50 transition-colors duration-500'>
                        <div className="mission-card bg-transparent p-6 md:p-8 rounded-2xl">
                            <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-amber-400 italic tracking-wide">{d.title}</h3>
                            <p className="text-zinc-300 text-sm md:text-base leading-relaxed opacity-80">{d.para}</p>
                        </div>
                    </WobbleCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurMission;
