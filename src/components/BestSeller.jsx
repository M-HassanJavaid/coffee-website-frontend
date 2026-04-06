import { useEffect, useLayoutEffect, useRef, useState, useContext } from "react";
import ProductCard from "./ProductCard.jsx";
import Loader from "./Loader.jsx";
import { HomeContext } from "../pages/Home.jsx";
import { AppContext } from '../App.jsx'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CometCard } from "../aceternityComponents/comet-card.jsx";
gsap.registerPlugin(ScrollTrigger);

const BestSeller = () => {
  const bestSellerSec = useRef(null);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const { isLoading, setIsLoading } = useContext(HomeContext)
  const { setAlertMessage } = useContext(AppContext)

  useEffect(() => {
    async function fetchProducts() {
      try {
        let res = await fetch(`${import.meta.env.VITE_API_URL}/product/popular/3`);
        res = await res.json();
        if (!res.ok) {
          throw new Error(res.message);
        }
        if (!res.products) {
          throw new Error("Products not found!");
        }
        setBestSellingProducts(res.products);
      } catch (error) {
        setAlertMessage('Due to some error best selling products could not load.');
      } finally {
        setIsLoading((prev) => ({
          ...prev,
          bestSeller: false,
        }));
      }
    }

    fetchProducts();
  }, []);




  useLayoutEffect(() => ScrollTrigger.refresh(), [isLoading])


  if (isLoading.bestSeller) {
    return <Loader />
  }

  if (!isLoading.bestSeller && bestSellingProducts.length === 0) {
    return (
      <p className="text-3xl text-red-900 text-center p-3 bg-neutral-800" >Due to some error products could not load!</p>
    )
  }

  return (
    <section className="bg-neutral-800 py-12 md:py-20 bestSellerSection" ref={bestSellerSec}>
      <h1 className="text-4xl sm:text-5xl md:text-7xl text-center font-extrabold font-fjalla text-shadow-black px-4 mb-8 text-zinc-50 leading-tight">
        Our BestSeller
      </h1>
      <div className="flex justify-center gap-4 md:gap-8 flex-wrap px-4">
        {bestSellingProducts.map((p, i) => (
          <CometCard>
            <button
              type="button"
              className="my-6 md:my-10 flex w-fit cursor-pointer flex-col items-stretch rounded-[16px] border-0 p-1 md:p-3"
              aria-label={`View ${p.name}`}
              style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
              }}>
              <ProductCard
                {...p}
                key={p._id}
                className='bestSellerCards'
              />
            </button>
          </CometCard>

        ))}
      </div>
    </section>
  );
};

export default BestSeller;



export function CometCardDemo() {
  return (
    <CometCard>
      <button
        type="button"
        className="my-10 flex w-80 cursor-pointer flex-col items-stretch rounded-[16px] border-0 bg-[#1F2121] p-2 saturate-0 md:my-20 md:p-4"
        aria-label="View invite F7RA"
        style={{
          transformStyle: "preserve-3d",
          transform: "none",
          opacity: 1,
        }}>
        <div className="mx-2 flex-1">
          <div className="relative mt-2 aspect-[3/4] w-full">
            <img
              loading="lazy"
              className="absolute inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover contrast-75"
              alt="Invite background"
              src="https://images.unsplash.com/photo-1505506874110-6a7a69069a08?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              style={{
                boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                opacity: 1,
              }} />
          </div>
        </div>
        <div
          className="mt-2 flex flex-shrink-0 items-center justify-between p-4 font-mono text-white">
          <div className="text-xs">Comet Invitation</div>
          <div className="text-xs text-gray-300 opacity-50">#F7RA</div>
        </div>
      </button>
    </CometCard>
  );
}
