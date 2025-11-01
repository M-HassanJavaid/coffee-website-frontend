import { useRef, useLayoutEffect , useEffect, useContext} from "react";
import { Bean, Flame, Coffee, CupSoda } from "lucide-react";
import ProcessCard from "./ProcessCard.jsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Context from "../Context.js";

const Process = () => {
  const steps = [
    {
      icon: <Bean className="w-10 h-10 text-amber-500" />,
      title: "1. Select Premium Beans",
      desc: "We handpick the finest Arabica beans from sustainable farms known for quality and flavor depth.",
    },
    {
      icon: <Flame className="w-10 h-10 text-amber-500" />,
      title: "2. Roast to Perfection",
      desc: "Each batch is expertly roasted to balance aroma, strength, and smoothness — the mark of great coffee.",
    },
    {
      icon: <Coffee className="w-10 h-10 text-amber-500" />,
      title: "3. Brew with Care",
      desc: "Our baristas craft each cup using precise brewing methods that enhance every note and nuance.",
    },
    {
      icon: <CupSoda className="w-10 h-10 text-amber-500" />,
      title: "4. Enjoy the Experience",
      desc: "From the first sip to the last drop — indulge in a cup that’s bold, rich, and full of passion.",
    },
  ];

  const processSection = useRef(null);
  const processCards = useRef([]);
  const { isLoading } = useContext(Context)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = processCards.current; 

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: processSection.current,
          start: "top 40%",
          // markers: true,
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        cards,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.25,
        }
      );

    }, processSection);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(()=>{
    for (const key in isLoading) {
      if (isLoading[key]) {
        return;
      }
    }

    ScrollTrigger.refresh();
  }, [isLoading])

  return (
    <section
      className="bg-neutral-800 text-zinc-50 py-20 px-6"
      ref={processSection}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-7xl font-extrabold text-zinc-50 font-fjalla mb-5 max-sm:text-6xl">
          How It Works?
        </h2>
        <p className="text-zinc-50 max-w-2xl mx-auto mb-14 text-lg animate-paragraphs">
          From sourcing to serving, we follow a meticulous process to ensure every cup delivers perfection.
        </p>
        <div className="grid max-sm:grid-cols-1 max-lg:grid-cols-2 grid-cols-4 gap-10">
          {steps.map((step, index) => (
            <ProcessCard
              key={index}
              step={step}
              index={index}
              length={steps.length}
              ref={(el) => (processCards.current[index] = el)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
