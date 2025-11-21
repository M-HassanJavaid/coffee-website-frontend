import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Button from "./Button";

const MenuHero = () => {
  

  return (
    <section className="bg-neutral-800 text-zinc-50 px-6  relative overflow-hidden h-screen flex flex-col justify-center items-center">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/coffee-bg-pattern.png')] opacity-10 bg-cover bg-center"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h1 className="menu-hero-title text-7xl font-fjalla font-extrabold mb-4 max-sm:text-5xl">
          Discover Our Menu
        </h1>

        <p className="menu-hero-sub text-zinc-300 max-w-2xl mx-auto text-lg leading-relaxed mb-8">
          Handcrafted with passion, brewed to perfection — explore our rich selection of coffees, teas, and signature blends that define the taste of true indulgence.
        </p>

        <Button title='Discover Menu' invert={true} element='#productsSection'/>
      </div>
    </section>
  );
};

export default MenuHero;
