import { useContext, createContext, useState , useLayoutEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import BestSeller from '../components/BestSeller.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import AboutUs from '../components/AboutUs.jsx'
import Process from '../components/Process.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Footer from '../components/Footer.jsx'
import AlertBox from '../components/AlertBox.jsx'
import CTASection from '../components/CTASection.jsx'

const HomeContext = createContext();

const Home = () => {

    const [isLoading, setIsLoading] = useState({
        bestSeller: true,
        reviews: false
    })


    useLayoutEffect(() => {
        const el = document.querySelectorAll('.animate-paragraphs');
        if (!el) return;

        el.forEach(element => {
            gsap.fromTo(element,
                {
                    y: 50,
                    opacity: 0,
                    filter: "blur(5px)",
                },
                {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 70%",
                        toggleActions: "play none none reverse",
                        // markers: true,
                    },
                }
            );
        });

    }, [])

    useLayoutEffect(() => ScrollTrigger.refresh(), [isLoading])

    return (
        <HomeContext.Provider value={{isLoading , setIsLoading}}>
            <Navbar animation={true} />
            <Hero />
            <BestSeller />
            <WhyChooseUs />
            <AboutUs />
            <Process />
            <Testimonials />
            <CTASection parentPage='home'/>
            <Footer />
            <AlertBox />
        </HomeContext.Provider>

    )
}

export default Home
export { HomeContext }
