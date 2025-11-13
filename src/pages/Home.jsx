import { useLoaderData } from "react-router";
import CarouselSlider from "../components/CarouselSlider";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { FaChrome, FaSafari } from "react-icons/fa";
import { MdTabletAndroid } from "react-icons/md";
import { IoLogoAndroid } from "react-icons/io";

const Home = () => {
  const movies = useLoaderData();
  const [users, setUsers] = useState(0);
  const [topMovies, setTopMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);

  // load users data from database
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  // load top rated movies from database
  useEffect(() => {
    fetch("http://localhost:3000/movies/top-rated")
      .then((res) => res.json())
      .then((data) => setTopMovies(data));
  }, []);
  // load recent 6 movies
  useEffect(() => {
    fetch("http://localhost:3000/movies/recent")
      .then((res) => res.json())
      .then((data) => setRecentMovies(data));
  }, []);

  return (
    <div className="mt-5 md:mt-10 mb-0">
      <CarouselSlider movies={movies}></CarouselSlider>
      {/* statistics section */}
      <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 mx-auto text-center">
        <div className="w-full bg-linear-to-br from-red-500 to-red-300 text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-xl py-12 md:py-15 lg:py-20">
          <p className="underline mb-2">Total Movies</p>
          <p>{movies.length}</p>
        </div>
        <div className="w-full bg-linear-to-br from-red-500 to-red-300 text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-xl py-12 md:py-15 lg:py-20">
          <p className="underline mb-2">Total Users</p>
          <p>{users.length}</p>
        </div>
      </div>
      {/* ------------------------------------------------------------------ */}
      {/* Top Rated Movies section */}
      <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Top Rated Movies
      </h2>
      <MovieCard movies={topMovies}></MovieCard>
      {/* ------------------------------------------------------------------ */}
      {/* Recently Added Movies section */}
      <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Recently Added
      </h2>
      <MovieCard movies={recentMovies}></MovieCard>
      {/* ------------------------------------------------------------------ */}
      {/* Genre Section */}
      <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Genre
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-11/12 mx-auto">
        <div className="bg-base-200 p-2 rounded-md">
          <img
            className="w-[300px] h-[150px] rounded-md"
            src="https://i.ibb.co.com/VcRKVyGh/action.webp"
            alt=""
          />
          <button
            className="text-white font-bold bg-linear-to-r from-red-500 to-red-300 rounded-sm w-full mt-1"
            style={{ width: "100%" }}
          >
            Action
          </button>
        </div>
        <div className="bg-base-200 p-2 rounded-md">
          <img
            className="w-[300px] h-[150px] rounded-md"
            src="https://i.ibb.co.com/Xf0fL8nL/drama.jpg"
            alt=""
          />
          <button
            className="text-white font-bold bg-linear-to-r from-red-500 to-red-300 rounded-sm w-full mt-1"
            style={{ width: "100%" }}
          >
            Drama
          </button>
        </div>
        <div className="bg-base-200 p-2 rounded-md">
          <img
            className="w-[300px] h-[150px] rounded-md"
            src="https://i.ibb.co.com/N2XfGz8Y/comedy.webp"
            alt=""
          />
          <button
            className="text-white font-bold bg-linear-to-r from-red-500 to-red-300 rounded-sm w-full mt-1"
            style={{ width: "100%" }}
          >
            Comedy
          </button>
        </div>
        <div className="bg-base-200 p-2 rounded-md">
          <img
            className="w-[300px] h-[150px] rounded-md"
            src="https://i.ibb.co.com/Df5Nrv8S/sifi.jpg"
            alt=""
          />
          <button
            className="text-white font-bold bg-linear-to-r from-red-500 to-red-300 rounded-sm w-full mt-1"
            style={{ width: "100%" }}
          >
            Si-fi
          </button>
        </div>
      </div>
      {/* ------------------------------------------------------------------------*/}
      {/* about platform section */}
      <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        About Platform
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 mx-auto text-center mb-5 md:mb-10">
        <div className="w-full bg-linear-to-br from-red-500 to-red-300 text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-xl py-12 md:py-15 lg:py-20">
          <p className="underline mb-2">Supported Platforms</p>
          <ul className="w-1/2 mx-auto text-xs md:text-base">
            <li className="flex justify-start gap-0.5 items-center">
              <FaChrome />
              Chrome
            </li>
            <li className="flex justify-start gap-0.5 items-center">
              <FaSafari />
              Safari
            </li>
            <li className="flex justify-start gap-0.5 items-center">
              <MdTabletAndroid />
              Mobile Android
            </li>
            <li className="flex justify-start gap-0.5 items-center">
              <IoLogoAndroid />
              Android TV
            </li>
          </ul>
        </div>
        <div className="w-full bg-linear-to-br from-red-500 to-red-300 text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-xl py-12 md:py-15 lg:py-20">
          <p className="underline mb-2">Features of Platforms</p>
          <ul className="w-4/5 lg:w-[60%] mx-auto text-xs md:text-base">
            <li className="flex justify-start gap-0.5 items-center">
              <FaChrome />
              Stream, Filter and download
            </li>
            <li className="flex justify-start gap-0.5 items-center">
              <FaSafari />
              Stream, Filter and download
            </li>
            <li className="flex justify-start gap-0.5 items-center">
              <MdTabletAndroid />
              Stream and download
            </li>
            <li className="flex justify-start gap-0.5 items-center">
              <IoLogoAndroid />
              Watch in 4K UHD
            </li>
          </ul>
        </div>
      </div>
      {/* ------------------------------------------------------------------ */}
    </div>
  );
};

export default Home;
