import React, { use, useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const Limit = 10;

const AllMovies = () => {
  const { loading, setLoading } = use(AuthContext);
  const [params] = useSearchParams();
  const genre = params.get("genre");

  const [moviesToShow, setMoviesToShow] = useState([]);
  const [rating, setRating] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    if (rating) {
      fetch(
        `http://localhost:3000/movies?min=${rating}&genre=${
          genre || ""
        }&limit=${Limit}&skip=${currentPage * Limit}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMoviesToShow(data.result);
          const pages = Math.ceil(data.total / Limit);
          setTotalPage(pages);
          setRating(rating);
          setLoading(false);
          toast("Movies Filtered Successfully!");
        })
        .catch((err) => toast("Movies did not filtered: " + err.message));
    } else {
      const url = genre
        ? `http://localhost:3000/movies?genre=${genre}&limit=${Limit}&skip=${
            currentPage * Limit
          }&search=${searchText || ""}`
        : `http://localhost:3000/movies?limit=${Limit}&skip=${
            currentPage * Limit
          }&search=${searchText || ""}`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setMoviesToShow(data.result);
          const pages = Math.ceil(data.total / Limit);
          setTotalPage(pages);
          setLoading(false);
        })
        .catch((err) => toast(err.message));
    }
  }, [genre, setLoading, currentPage, rating, searchText]);

  const handleFilter = (rating) => {
    setLoading(true);
    fetch(
      `http://localhost:3000/movies?min=${rating}&genre=${
        genre || ""
      }&limit=${Limit}&skip=${currentPage * Limit}`
    )
      .then((res) => res.json())
      .then((data) => {
        setMoviesToShow(data.result);
        const pages = Math.ceil(data.total / Limit);
        setTotalPage(pages);
        setRating(rating);
        setLoading(false);
        toast("Movies Filtered Successfully!");
      })
      .catch((err) => toast("Movies did not filtered: " + err.message));
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchDone = () => {
    setSearchText(searchInput);
    setCurrentPage(0);
  };

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="py-5 md:py-10">
      <h2 className="mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        All Movies
      </h2>
      <div className="mb-1 md:mb-4 w-11/12 mx-auto flex flex-col md:flex-row gap-2 md:gap-0 md:justify-between items-center">
        <div className="flex gap-1 items-center w-full md:w-auto">
          <label className="input text-primary border-primary dark:border-secondary dark:text-secondary">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" onChange={handleSearch} />
          </label>
          <button onClick={handleSearchDone} className="btn btn-secondary w-20">
            Search
          </button>
        </div>
        <select
          onChange={(e) => handleFilter(e.target.value)}
          className="select w-full md:w-auto border-primary dark:border-secondary text-primary dark:bg-slate-800 dark:text-white font-bold md:text-xs"
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
      <div>
        {moviesToShow?.length ? (
          <MovieCard movies={moviesToShow}></MovieCard>
        ) : (
          <p className="text-center text-primary font-bold text-base md:text-xl lg:text-3xl">
            No movies found!
          </p>
        )}
        <div className="flex justify-center flex-wrap gap-3 py-10">
          {currentPage > 0 && (
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              className="btn btn-secondary w-20"
            >
              Prev
            </button>
          )}

          {[...Array(totalPage).keys()].map((i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`btn ${i === currentPage && "btn-secondary"} w-20`}
            >
              {i + 1}
            </button>
          ))}
          {currentPage < totalPage - 1 && (
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="btn btn-secondary w-20"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllMovies;
