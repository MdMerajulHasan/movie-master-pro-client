import React from "react";
import { useLoaderData } from "react-router";
import MovieCard from "../components/MovieCard";

const AllMovies = () => {
  const allMovies = useLoaderData();
  return (
    <div className="my-5 md:my-10">
      <h2 className="mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        All Movies
      </h2>
      <MovieCard movies={allMovies}></MovieCard>
    </div>
  );
};

export default AllMovies;
