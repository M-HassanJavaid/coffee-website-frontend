import { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import ProductCard from "./ProductCard.jsx";
import Loader from "./Loader.jsx";
import Context from "../Context.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const BestSeller = () => {
  const bestSellerSec = useRef(null);
  const productCards = useRef([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const { setAlertMessage, alertMessage , isLoading, setIsLoading } = useContext(Context)

  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await fetch("https://coffee-website-backend-gamma.vercel.app/product/popular/3");
        let data = await res.json();
        console.log(data);

        if (!data.products) {
          throw new Error("Products not found!");
        }


        setBestSellingProducts(data.products);
      } catch (error) {
        console.error(error.message);
        setAlertMessage('Due to some error best selling products could not load.')
      } finally {
        setIsLoading((pre) => {
          return {
            ...pre,
            bestSeller: false
          }
        })

      }
    }

    fetchProducts()
  }, []);

  useLayoutEffect(() => {
    if (bestSellingProducts.length === 0) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: bestSellerSec.current,
          start: "top 50%",
          end: "top 0%",
          scrub: true,
          // markers: true, // remove later
        },
      });

      tl.from(productCards.current, {
        opacity: 0,
        y: 100,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.25,
      });
    }, bestSellerSec); // ✅ attach GSAP context to the section (not array)

    // ✅ Cleanup GSAP context on unmount
    return () => ctx.revert();
  }, [bestSellingProducts]); // rerun after data loads

  useLayoutEffect(()=>{
    for (const key in isLoading) {
      if (isLoading[key]) {
        return;
      }
    }

    ScrollTrigger.refresh();
  }, [isLoading])

  if (isLoading.bestSeller) {
    return <Loader  />
  }

  console.log(!isLoading.bestSeller);
  console.log(!(bestSellingProducts))
  if (!isLoading.bestSeller && bestSellingProducts.length === 0) {
    return (
      <p className="text-3xl text-red-900 text-center p-3 bg-neutral-800" >Due to some error products could not load!</p>
    )
  }

  return (
    <section className="bg-neutral-800 " ref={bestSellerSec}>
      <h1 className="text-7xl text-center font-extrabold font-fjalla text-shadow-black px-3 py-10 text-zinc-50 max-sm:text-6xl">
        Our BestSeller
      </h1>
      <div className="flex justify-center gap-3 flex-wrap">
        {bestSellingProducts.map((p, i) => (
          <ProductCard
            {...p}
            key={p._id}
            ref={(el) => (productCards.current[i] = el)}
          />
        ))}
      </div>
    </section>
  );
};

export default BestSeller;
