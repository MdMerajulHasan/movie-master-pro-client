import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import React from "react";

const CarouselSlider = ({ movies }) => {
  return (
    <div className="w-3/5 md:w-[45%] lg:w-[30%] mx-auto h-full">
      <Carousel
        showIndicators={false}
        showThumbs={false}
        dynamicHeight={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showStatus={false}
        className="md:h-[350px] lg:h-full"
      >
        {movies.map((movie, index) => (
          <div key={index} className="md:h-[350px] lg:h-full">
            <img className="rounded-lg h-full" src={movie.posterUrl} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
