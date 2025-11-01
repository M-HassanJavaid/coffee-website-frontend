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
        <section className="p-16 bg-neutral-800 text-zinc-50">
            <h2 className="text-7xl text-zinc-50 font-fjalla font-extrabold text-center mb-10 max-sm:text-6xl">
                What Our Clients Say?
            </h2>

            <Slider {...settings}>
                {testimonials.map((item, i) => (
                    <div className="p-4 cursor-grab">
                        <div className="
                        bg-black text-zinc-50 shadow-lg rounded-2xl p-8 h-full flex flex-col 
                        items-center text-center hover:shadow-2xl transition-all duration-500 border-4
                        border-zinc-50 hover:border-white hover:text-zinc-50">
                            <p className="italic mb-6 ">“{item.message}”</p>
                            <h3 className="text-xl font-semibold text-amber-400">
                                {item.name}
                            </h3>
                        </div>
                    </div>
                ))}
            </Slider>
        </section>
    );
};

export default Testimonials;
