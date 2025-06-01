import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {Box} from "@mui/material";

const TextCarousel = () => {
    // Array of image URLs

    const images = [
        'images/carouselImages/0.jpg',
        'images/carouselImages/1.jpg',
        'images/carouselImages/2.jpg',
        'images/carouselImages/3.jpg',
        'images/carouselImages/4.jpg',
        'images/carouselImages/5.jpg',
        'images/carouselImages/6.jpg',
        'images/carouselImages/7.jpg',
        'http://localhost:3000/images/carouselImages/3.jpg',
    ];


    const items = images.map((image, index) => (
        <div className="item" key={index} id={"caroselImage" + index}>
            <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover rounded-xl"
                height={500}
                width={1500}
            />
        </div>
    ));

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
            <div className="relative w-full max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
                <Box
                sx={{
                    textAlign: "center",
                    '& .alice-carousel__wrapper': {
                        border: '2px solid green',
                    }
                }}
                >
                    <AliceCarousel
                        autoPlay
                        infinite
                        mouseTracking
                        items={items}
                        disableButtonsControls={true}
                        disableDotsControls={false}
                        autoPlayInterval={30000}
                        animationDuration={800}
                    />
                </Box>
            </div>
        </div>
    );
};

export default TextCarousel;
