import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import React from "react";

const CarouselSlider = ({ movies }) => {
  return (
    <div className="w-3/5 md:w-[45%] mx-auto h-screen">
      <Carousel
        showIndicators={false}
        showThumbs={false}
        dynamicHeight={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showStatus={false}
        className="md:h-[350px] lg:h-[600px]"
      >
        {movies.map((movie, index) => (
          <div key={index} className="md:h-[350px] lg:h-[600px]">
            <img className="rounded-lg" src={movie.posterUrl} />
            <p className="legend hidden md:flex justify-center">
              {movie.title}
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
