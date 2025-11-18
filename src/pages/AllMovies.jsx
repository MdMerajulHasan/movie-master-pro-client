import React, { useState } from "react";
import { useLoaderData } from "react-router";
import MovieCard from "../components/MovieCard";
import toast from "react-hot-toast";

const AllMovies = () => {
  const allMovies = useLoaderData();
  const [rating, setRating] = useState("");
  const [moviesToShow, setMoviesToShow] = useState(allMovies);
  const handleFilter = () => {
    if (rating) {
      fetch(`http://localhost:3000/movies?min=${rating}`)
        .then((res) => res.json())
        .then((data) => {
          setMoviesToShow(data);
          toast("Movies Filtered Successfully!");
        })
        .catch((err) => toast("Movies did not filtered: " + err.message));
    }
  };

  return (
    <div className="my-5 md:my-10">
      <h2 className="mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        All Movies
      </h2>
      <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-1 w-11/12 mx-auto">
        <div className="col-span-1">
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="select text-primary font-bold md:text-xs"
          >
            <option value="" disabled>
              Sort By Rating
            </option>
            <option value="1">1-10</option>
            <option value="2">2-10</option>
            <option value="3">3-10</option>
            <option value="4">4-10</option>
            <option value="5">5-10</option>
            <option value="6">6-10</option>
            <option value="7">7-10</option>
            <option value="8">8-10</option>
            <option value="9">9-10</option>
            <option value="10">10</option>
          </select>
          <button
            className="btn btn-primary w-20 mt-1 md:mt-4"
            onClick={handleFilter}
          >
            Filter
          </button>
        </div>
        <div className="col-span-3 md:col-span-4 lg:col-span-6">
          {moviesToShow?.length ? (
            <MovieCard movies={moviesToShow}></MovieCard>
          ) : (
            <p className="text-center text-primary font-bold text-base md:text-xl lg:text-3xl">
              No movies in this rating range!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
