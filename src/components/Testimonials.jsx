import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
    {
        name: "Sarah Johnson",
        message:
            "This platform transformed the way I showcase my work. The design and responsiveness are simply top-notch!",
    },
    {
        name: "Michael Lee",
        message:
            "I was amazed by the quality and speed of the service. It's like having a personal web developer on demand.",
    },
    {
        name: "Emily Carter",
        message:
            "The smooth animations and modern design blew me away. I highly recommend this to anyone looking for a digital edge.",
    },
    {
        name: "James Miller",
        message:
            "Super easy to use and customize. I got my site running in minutes, and it looks absolutely stunning!",
    },
];

const Testimonials = () => {
    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 800,
        slidesToShow: 2,
        slidesToScroll: 1,
        swipe: true,
        arrows: false,
        responsive: [
            {
                breakpoint: 768,
                settings: { slidesToShow: 1 },
            },
        ],
    };

    return (
        <section className="py-16 md:py-24 px-4 md:px-16 bg-neutral-800 text-zinc-50 min-h-[50vh] md:min-h-[80vh] flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl md:text-7xl text-zinc-50 font-fjalla font-extrabold text-center mb-8 md:mb-12 leading-tight">
                What Our Clients Say?
            </h2>

            <div className="max-w-6xl mx-auto w-full">
                <Slider {...settings}>
                    {testimonials.map((item, i) => (
                        <div key={i} className="p-2 sm:p-4 cursor-grab">
                            <div className="
                            bg-neutral-900 border-2 border-neutral-700 hover:border-amber-400 text-zinc-50 shadow-lg rounded-2xl p-6 sm:p-8 h-full flex flex-col 
                            items-center text-center transition-all duration-300">
                                <p className="italic mb-4 md:mb-6 text-sm sm:text-base leading-relaxed opacity-90">“{item.message}”</p>
                                <h3 className="text-lg sm:text-xl font-semibold text-amber-400">
                                    {item.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Testimonials;
