import { useLayoutEffect } from 'react'
import AboutHero from '../components/AboutHero'
import Navbar from '../components/Navbar'
import AboutStory from '../components/AboutStory'
import OurMission from '../components/OurMission'
import CTASection from '../components/CTASection'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Footer from '../components/Footer'
const About = () => {

    useLayoutEffect(() => {

        gsap.to('#about-overlay', {
            opacity: 1,
            scrollTrigger: {
                trigger: '.mission-section',
                start: 'top 90%',
                end: 'top 50%',
                scrub: true,
                markers: true
            }
        })

    })



    return (
        <>
            <Navbar animation={true} />
            <AboutHero />
            <AboutStory />
            <OurMission />
            <CTASection/>
            <Footer/>
        </>
    )
}

export default About