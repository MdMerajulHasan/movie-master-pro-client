import React, { use } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const WatchList = () => {
  const watchedMovies = useLoaderData();
  const { loading } = use(AuthContext);
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div>
      <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Watch List
      </h2>
      {watchedMovies.length ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 w-11/12 mx-auto mb-5 md:mb-10">
          {watchedMovies.map((movie) => {
            return (
              <div
                className="flex flex-col justify-center text-primary font-bold items-center"
                key={movie._id}
              >
                <div>
                  <img
                    className="w-20 md:w-32 h-20 md:h-32 rounded-md"
                    src={movie.poster}
                    alt="movie poster"
                  />
                </div>
                <div>{movie.movie}</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-1 justify-center items-center">
          <p className="text-primary font-bold text-center">
            You Have Not Played Any Movie!
          </p>
          <Link to="/movies">
            <button className="btn btn-secondary w-20">Play Now!</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default WatchList;
