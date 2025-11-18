import { use } from "react";
import CollectionCard from "../components/CollectionCard";
import { Link, useLoaderData } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Loader from "../components/Loader";

const MyCollection = () => {
  const movies = useLoaderData();
  const { loading } = use(AuthContext);

  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="my-5 md:my-10">
      <h2 className="mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
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
