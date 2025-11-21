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
        <section className="mission-section text-zinc-50 py-24 px-6 md:px-16 overflow-hidden isolate " ref={sectionRef}>
            <div className="max-w-6xl mx-auto text-center">
                {/* Title */}
                <h2 className="mission-title font-fjalla text-6xl font-bold mb-6">
                    Our Mission
                </h2>
                {/* Description */}
                <p className="mission-text text-lg text-zinc-300 max-w-2xl mx-auto mb-16">
                    To empower creators and businesses with design, innovation, and digital
                    excellence. We strive to craft experiences that connect people and leave
                    a lasting impact.
                </p>

                {/* Mission Cards */}
                <div className="flex justify-center gap-5 flex-wrap">
                    {missionData.map((d)=> (
                    <WobbleCard containerClassName='mission-card max-w-lg bg-neutral-950 backdrop-blur-lg border-2 border-white hover:border-4 hover:border-amber-400'>
                        <div className="mission-card bg-transparent p-8 rounded-2xl transition-all duration-500">
                            <h3 className="text-2xl font-semibold mb-4 text-amber-400">{d.title}</h3>
                            <p className="text-zinc-300">{d.para}</p>
                        </div>
                    </WobbleCard>
                    ))}
                    
                </div>
            </div>
        </section>
    );
};

export default OurMission;
