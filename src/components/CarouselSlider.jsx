import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import React from "react";

const CarouselSlider = ({ movies }) => {
  return (
    <div className="w-3/5 md:w-[30%] lg:w-[25%] mx-auto h-2/3">
      <Carousel
        showIndicators={false}
        showThumbs={true}
        dynamicHeight={false}
        autoPlay={true}
        infiniteLoop={true}
        interval={3000}
        showStatus={true}
        className="md:h-full lg:h-full"
      >
        {movies.map((movie, index) => (
          <div key={index} className="md:h-[350px] lg:h-[60-vh]">
            <img className="rounded-lg h-full" src={movie.posterUrl} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselSlider;
