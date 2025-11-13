import React, { useEffect } from "react";
import { BiStar } from "react-icons/bi";
import { BsStarFill } from "react-icons/bs";
import { Link } from "react-router";
import "aos/dist/aos.css";
import Aos from "aos";

const MovieCard = ({ movies }) => {
  // animation
  useEffect(() => {
    Aos.init({ duration: 1000, once: false });
  }, []);
  console.log(movies);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {movies.map((movie) => (
        <div
          data-aos="zoom-in"
          key={movie._id}
          className="bg-base-200 rounded-md py-2"
        >
          <img
            className="w-4/5 mx-auto rounded-md"
            src={movie.posterUrl}
            alt="Movie poster"
          />
          <div className="w-4/5 mx-auto flex justify-between text-sm md:text-base text-primary font-bold">
            <p>{movie.title}</p>
            <p className="flex gap-0.5 items-center">
              {movie.rating}
              <BsStarFill></BsStarFill>
            </p>
          </div>
          <div className="w-4/5  mx-auto font-bold">
            <Link className="w-full mx-auto" to={`/movies/${movie._id}`}>
              <button
                className="text-white bg-linear-to-r from-red-500 to-red-300 rounded-sm w-full"
                style={{ width: "100%" }}
              >
                See more...
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieCard;
