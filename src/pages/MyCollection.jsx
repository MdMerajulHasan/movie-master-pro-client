import { use, useEffect, useState } from "react";
import CollectionCard from "../components/CollectionCard";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const MyCollection = () => {
  const { user } = use(AuthContext);
  const [movies, setMovies] = useState([]);
  const { loading } = use(AuthContext);
  useEffect(() => {
    fetch(
      `https://movie-master-pro-api.vercel.app/movies/my-collection/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => setMovies(data))
      .catch((err) => toast(err.message));
  }, [user]);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="py-5 md:py-10">
      <h2 className="mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        My Collection
      </h2>
      {movies.length ? (
        <CollectionCard movies={movies}></CollectionCard>
      ) : (
        <div className="flex flex-col gap-1 justify-center items-center">
          <p className="text-primary font-bold text-center">
            You Have Not Added Any Movie Yet!
          </p>
          <Link to="/movies/add">
            <button className="btn btn-secondary w-20">Add</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCollection;
