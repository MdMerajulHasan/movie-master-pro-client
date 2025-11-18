import { use } from "react";
import { BsStarFill } from "react-icons/bs";
import { FaGripLinesVertical } from "react-icons/fa";
import { Link, useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const MovieDetails = () => {
  const movie = useLoaderData();
  const navigate = useNavigate();
  const { _id } = movie;
  const { loading, setLoading, user } = use(AuthContext);

  const handlePlay = () => {
    const playedMovie = {
      movie: movie.title,
      poster: movie.posterUrl,
      played: user.email,
    };
    fetch(`http://localhost:3000/movies/watch-list`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(playedMovie),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast("Movie added to watch list!");
        }
      })
      .catch((error) => {
        toast("Ops! Movie didn't added to watch list: " + error.message);
      });
  };

  const handleDelete = (id) => {
    setLoading(true);
    fetch(`http://localhost:3000/movies/${id}`, {
      method: "DELETE",
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.deletedCount) {
          setLoading(false);
          toast("Movie Deleted Successfully!");
          navigate(`/movies/my-collection/${user.email}`);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast("Ops! Movie Not Deleted: " + err.message);
      });
  };

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="hero bg-base-200 my-5 md:my-10">
        <div className="hero-content text-xs md:text-base text-primary flex-col md:flex-row-reverse">
          <img
            src={movie.posterUrl}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div>
            <div className="flex gap-0.5 items-center">
              <p className="flex gap-0.5 items-center">
                {movie.duration} min
                <FaGripLinesVertical />
              </p>
              <p className="flex gap-0.5 items-center">
                {movie.genre}
                <FaGripLinesVertical />
              </p>
              <p>{movie.releaseYear}</p>
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold">
              {movie.title}
            </h1>
            <p className="flex gap-0.5 items-center">
              {movie.rating}
              <BsStarFill></BsStarFill>
            </p>
            <p className="py-6">{movie.plotSummary}</p>
            <div className="flex gap-0.5 items-center">
              <p className="flex gap-0.5 items-center">
                {movie.language}
                <FaGripLinesVertical />
              </p>
              <p className="flex gap-0.5 items-center">
                {movie.country}
                <FaGripLinesVertical />
              </p>
              <p>{movie.director}</p>
            </div>
            <p>Cast: {movie.cast}</p>
            <p>Added By: {movie.addedBy}</p>

            <div className="flex gap-5 items-center mt-1">
              {/* play button without user */}
              {!user ? (
                <button className="btn btn-secondary w-20">Play</button>
              ) : (
                ""
              )}
              {user ? (
                <>
                  {/* paly button with user and will add to watch list  */}
                  <Link onClick={handlePlay}>
                    <button className="btn btn-secondary w-20">Play</button>
                  </Link>
                  {/* to see the watch list go to a new page */}
                  <Link to={`/watch-list/${user?.email}`}>
                    <button className="btn btn-secondary w-20">Watched</button>
                  </Link>
                </>
              ) : (
                ""
              )}
              {user?.email === movie?.addedBy && (
                <>
                  <Link to={`/movies/update/${movie._id}`}>
                    <button className="btn btn-secondary w-20">Edit</button>
                  </Link>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="btn btn-primary w-20"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default MovieDetails;
