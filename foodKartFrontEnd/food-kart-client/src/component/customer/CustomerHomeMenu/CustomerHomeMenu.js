import React, {useContext} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {CustomerContext} from "../CustomerLoginContextAndProvider/CustomerLoginContextAndProvider";

const textSlides = [
    "slide1", "slide2", "slide3", "slide4", "slide5",
    "slide6", "slide7", "slide8", "slide9", "slide10"
];

const TextCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: false,
        arrows: false,
    };

    const {customerEmail, setCustomerEmail} =  useContext(CustomerContext);

    console.log("customerEmail in Home = 44444 ", customerEmail)


    return (
        <div style={{ width: '400px', margin: '0 auto', textAlign: 'center' }}>
            {/*<Slider {...settings}>*/}
            {/*    {textSlides.map((text, index) => (*/}
            {/*        <div key={index}>*/}
            {/*            <h2 style={{*/}
            {/*                padding: '40px 0',*/}
            {/*                background: '#eee',*/}
            {/*                borderRadius: '10px'*/}
            {/*            }}>*/}
            {/*                {text}*/}
            {/*            </h2>*/}
            {/*        </div>*/}
            {/*    ))}*/}
            {/*</Slider>*/}
            Home
        </div>
    );
};

export default TextCarousel;
