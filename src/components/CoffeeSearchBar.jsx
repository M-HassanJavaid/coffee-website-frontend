import { Search, Filter } from "lucide-react";
import Button from "./Button";
import { useContext } from "react";
import { menuContext } from "../pages/Menu";


const category = [
  {
    name: 'Hot Coffee',
    img: '/hotCoffeeIcon.webp'
  },
  {
    name: 'Frappes',
    img: '/frappesIcon.webp'
  },
  {
    name: 'Ice Coffee',
    img: '/icedCoffeeIcon.webp'
  },
  {
    name: 'Tea',
    img: '/teaIcon.webp'

  },
  {
    name: 'Others',
    img: '/extrasIcon.webp'
  },
  {
    name: 'Snacks',
    img: '/snacksIcon.webp'
  },
  {
    name: 'Coolers',
    img: '/coolersIcon.webp'
  },
]


const CoffeeSearchBar = () => {

  function searchProducts(value) {
    setIsLoading(true);
    setSearchTerm(value);
  }

  const { isLoading, setIsLoading, searchBar, products, setSearchTerm, searchTerm } = useContext(menuContext)

  return (
    <section className="bg-neutral-800 px-2 text-zinc-50 scroll-mt-22" id="productsSection">
      <div className="max-w-6xl mx-auto text-center space-y-10">
        {/* Title */}
        <h2 className="font-fjalla text-6xl font-bold tracking-tight">
          Find Your Perfect{" "}
          <span className="text-amber-400">Coffee</span>
        </h2>

        {/* Search + Filters Container */}
        <div className={` bg-neutral-900 p-6 rounded-t-2xl shadow-lg border border-t-amber-400 border-x-amber-400 ${isLoading || searchTerm ? 'border-b-amber-400 rounded-b-2xl' : 'border-b-transparent'}`}>

          {/* Search Bar */}
          <div className="relative flex-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400 h-5 w-5" />
            <input
              onChange={(e) => searchProducts(e.target.value)}
              ref={searchBar}
              type="text"
              placeholder="Search coffee..."
              className="w-full pl-12 pr-4 py-3 rounded-full bg-neutral-700 text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
            />
          </div>



          {/* <Button title='Search Now' className='' func={(e)=> searchProducts(e.target.value)}/> */}
        </div>
      </div>
    </section>
  );
};

export default CoffeeSearchBar;
