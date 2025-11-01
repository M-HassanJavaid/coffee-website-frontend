import React from 'react'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import BestSeller from '../components/BestSeller.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import AboutUs from '../components/aboutUs.jsx'
import Process from '../components/Process.jsx'
import Testimonials from '../components/Testimonials.jsx'
import Footer from '../components/Footer.jsx'
import Loader from '../components/Loader.jsx'
import AlertBox from '../components/AlertBox.jsx'
import CTASection from '../components/CTASection.jsx'

const Home = () => {
    return (
        <>
            <Navbar animation={true} />
            <Hero/>
            <BestSeller/>
            <WhyChooseUs/>
            <AboutUs/>
            <Process/>
            <Testimonials/>
            <CTASection/>
            <Footer/>
            <AlertBox/>
        </>
    )
}

export default Home
