import { useLoaderData } from "react-router";
import CarouselSlider from "../components/CarouselSlider";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

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
      <h2 className="mt-5 md:mt-10 mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 mx-auto text-center">
        <div className="w-full bg-linear-to-br from-red-500 to-red-300 text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-xl py-12 md:py-15 lg:py-20">
          <p className="underline">Total Movies</p>
          <p>{movies.length}</p>
        </div>
        <div className="w-full bg-linear-to-br from-red-500 to-red-300 text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-xl py-12 md:py-15 lg:py-20">
          <p className="underline">Total Users</p>
          <p>{users.length}</p>
        </div>
      </div>
      {/* ------------------------------------------------------------------ */}
      {/* Top Rated Movies section */}
      <h2 className="mt-5 md:mt-10 mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Top Rated Movies
      </h2>
      <MovieCard movies={topMovies}></MovieCard>
      {/* ------------------------------------------------------------------ */}
      {/* Recently Added Movies section */}
      <h2 className="mt-5 md:mt-10 mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Recently Added
      </h2>
      <MovieCard movies={recentMovies}></MovieCard>
      {/* ------------------------------------------------------------------ */}
    </div>
  );
};

export default Home;
