import React, { use } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const UpdateMovie = () => {
  const movie = useLoaderData();
  const navigate = useNavigate();
  const { loading, setLoading, user } = use(AuthContext);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const updatedMovie = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: Number(form.releaseYear.value),
      director: form.director.value,
      cast: form.cast.value,
      rating: Number(form.rating.value),
      duration: Number(form.duration.value),
      plotSummary: form.plotSummary.value,
      posterUrl: form.posterUrl.value,
      language: form.language.value,
      country: form.country.value,
      addedBy: form.addedBy.value,
    };
    fetch(`http://localhost:3000/movies/update/${movie._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(updatedMovie),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.matchedCount) {
          setLoading(false);
          toast("Movie Updated Successfully!");
          navigate(`/movies/my-collection/${user?.email}`);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast("Ops! Movie Not Updated: " + error.message);
      });
  };
  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="flex mb-5 md:mb-10 w-4/5 md:w-1/2 mx-auto justify-center items-center text-primary">
        <form className="w-full" onSubmit={handleUpdate}>
          <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
            Update Movie
          </h2>
          {/*add title*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give movie name here
            </legend>
            <input
              type="text"
              name="title"
              className="input w-full"
              placeholder={movie.title || ""}
              defaultValue={movie.title}
              required
            />
          </fieldset>
          {/*add genre*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give movie genre here
            </legend>
            <input
              type="text"
              name="genre"
              className="input w-full"
              placeholder={movie.genre || ""}
              defaultValue={movie.genre}
              required
            />
          </fieldset>
          {/*add releaseYear*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give movie release year here
            </legend>
            <input
              type="text"
              name="releaseYear"
              className="input w-full"
              placeholder={movie.releaseYear || ""}
              defaultValue={movie.releaseYear}
              required
            />
          </fieldset>
          {/*add director*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give director's name here
            </legend>
            <input
              type="text"
              name="director"
              className="input w-full"
              placeholder={movie.director || ""}
              defaultValue={movie.director}
              required
            />
          </fieldset>
          {/*add cast*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give movie cast here
            </legend>
            <input
              type="text"
              name="cast"
              className="input w-full"
              placeholder={movie.cast || ""}
              defaultValue={movie.cast}
              required
            />
          </fieldset>
          {/*add rating*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give movie rating here
            </legend>
            <input
              type="text"
              name="rating"
              className="input w-full"
              placeholder={movie.rating || ""}
              defaultValue={movie.rating}
              required
            />
          </fieldset>
          {/*add duration*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give movie duration in min
            </legend>
            <input
              type="text"
              name="duration"
              className="input w-full"
              placeholder={movie.duration || ""}
              defaultValue={movie.duration}
              required
            />
          </fieldset>
          {/*add plotSummary*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give plotSummary here
            </legend>
            <input
              type="text"
              name="plotSummary"
              className="input w-full"
              placeholder={movie.plotSummary || ""}
              defaultValue={movie.plotSummary}
              required
            />
          </fieldset>
          {/*add posterUrl*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give thr Url of movie poster
            </legend>
            <input
              type="url"
              name="posterUrl"
              className="input w-full"
              placeholder={movie.posterUrl || ""}
              defaultValue={movie.posterUrl}
              required
            />
          </fieldset>
          {/*add language*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give movie language
            </legend>
            <input
              type="text"
              name="language"
              className="input w-full"
              placeholder={movie.language || ""}
              defaultValue={movie.language}
              required
            />
          </fieldset>
          {/*add country*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Give country name of movie
            </legend>
            <input
              type="text"
              name="country"
              className="input w-full"
              placeholder={movie.country || ""}
              defaultValue={movie.country}
              required
            />
          </fieldset>
          {/*add addedBy*/}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary">
              Your logged in email
            </legend>
            <input
              type="email"
              name="addedBy"
              placeholder={user?.email || "Your Email"}
              defaultValue={user?.email}
              readOnly
              className="input w-full"
            />
          </fieldset>
          <button
            type="submit"
            className="text-center mx-auto btn-primary w-full"
          >
            Update
          </button>
        </form>
      </div>
    );
  }
};

export default UpdateMovie;
