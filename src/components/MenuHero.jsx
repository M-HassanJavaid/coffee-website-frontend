import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Button from "./Button";

const MenuHero = () => {
  

  return (
    <section className="bg-neutral-800 text-zinc-50 px-6 relative overflow-hidden min-h-[50vh] md:h-screen flex flex-col justify-center items-center py-12 md:py-20">
      {/* Decorative background pattern */}
      <div className="absolute inset-0 bg-[url('/coffee-bg-pattern.png')] opacity-5 bg-cover bg-center"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10 px-4">
        <h1 className="menu-hero-title text-4xl sm:text-5xl md:text-7xl font-fjalla font-extrabold mb-4 leading-tight">
          Discover Our Menu
        </h1>

        <p className="menu-hero-sub text-zinc-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-8">
          Handcrafted with passion, brewed to perfection — explore our rich selection of coffees, teas, and signature blends that define the taste of true indulgence.
        </p>

        <Button title='Explore Menu' invert={true} element='#productsSection' className="px-8 py-3 text-sm md:text-base" />
      </div>
    </section>
  );
};

export default MenuHero;
