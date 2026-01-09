import React, { use, useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import MovieCard from "../components/MovieCard";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const AllMovies = () => {
  const { loading, setLoading } = use(AuthContext);
  const [params] = useSearchParams();
  const genre = params.get("genre");
  const [moviesToShow, setMoviesToShow] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/movies?genre=${genre}`)
      .then((res) => res.json())
      .then((data) => {
        setMoviesToShow(data);
        setLoading(false);
      })
      .catch((err) => toast(err.message));
  }, [setLoading, genre]);

  const handleFilter = (rating) => {
    fetch(`http://localhost:3000/movies?min=${rating}&genre=${genre}`)
      .then((res) => res.json())
      .then((data) => {
        setMoviesToShow(data);
        toast("Movies Filtered Successfully!");
      })
      .catch((err) => toast("Movies did not filtered: " + err.message));
  };

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="py-5 md:py-10">
      <h2 className="mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        All Movies
      </h2>
      <div className="grid grid-cols-5 md:grid-cols-5 lg:grid-cols-7 gap-1 w-11/12 mx-auto">
        <div className="col-span-1">
          <select
            onChange={(e) => handleFilter(e.target.value)}
            className="select text-primary dark:bg-slate-800 dark:text-white font-bold md:text-xs"
          >
            <option value="">Sort By Rating</option>
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
        </div>
        <div className="col-span-4 md:col-span-4 lg:col-span-6">
          {moviesToShow?.length ? (
            <MovieCard movies={moviesToShow}></MovieCard>
          ) : (
            <p className="text-center text-primary font-bold text-base md:text-xl lg:text-3xl">
              No movies in this rating range or genre!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
