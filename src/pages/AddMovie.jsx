import React, { use } from "react";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { useNavigate } from "react-router";

const AddMovie = () => {
  const { loading, setLoading, user } = use(AuthContext);
  const navigate = useNavigate();
  const handleAdd = (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const movie = {
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
    fetch("https://movie-master-pro-api.vercel.app/movies/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(movie),
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.insertedId) {
          toast("Movie Added Successfully!");
          setLoading(false);
          form.reset();
          navigate(`/movies/my-collection/${user.email}`);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast("Ops! Movie Not Added: " + err.message);
      });
  };
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="flex pb-5 md:pb-10 w-4/5 md:w-1/2 mx-auto justify-center items-center text-primary dark:text-secondary">
      <form className="w-full" onSubmit={handleAdd}>
        <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          Add A Movie
        </h2>
        {/*add title*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give movie name here
          </legend>
          <input type="text" name="title" className="input w-full" required />
        </fieldset>
        {/*add genre*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give movie genre here
          </legend>
          <input type="text" name="genre" className="input w-full" required />
        </fieldset>
        {/*add releaseYear*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give movie release year here
          </legend>
          <input
            type="text"
            name="releaseYear"
            className="input w-full"
            required
          />
        </fieldset>
        {/*add director*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give director's name here
          </legend>
          <input
            type="text"
            name="director"
            className="input w-full"
            required
          />
        </fieldset>
        {/*add cast*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give movie cast here
          </legend>
          <input type="text" name="cast" className="input w-full" required />
        </fieldset>
        {/*add rating*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give movie rating here
          </legend>
          <input type="text" name="rating" className="input w-full" required />
        </fieldset>
        {/*add duration*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give movie duration in min
          </legend>
          <input
            type="text"
            name="duration"
            className="input w-full"
            required
          />
        </fieldset>
        {/*add plotSummary*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give plotSummary here
          </legend>
          <input
            type="text"
            name="plotSummary"
            className="input w-full"
            required
          />
        </fieldset>
        {/*add posterUrl*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give thr Url of movie poster
          </legend>
          <input
            type="url"
            name="posterUrl"
            className="input w-full"
            required
          />
        </fieldset>
        {/*add language*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give movie language
          </legend>
          <input
            type="text"
            name="language"
            className="input w-full"
            required
          />
        </fieldset>
        {/*add country*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Give country name of movie
          </legend>
          <input type="text" name="country" className="input w-full" required />
        </fieldset>
        {/*add addedBy*/}
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary dark:text-white">
            Your logged in email
          </legend>
          <input
            type="email"
            name="addedBy"
            value={user?.email}
            readOnly
            className="input w-full"
          />
        </fieldset>
        <button
          type="submit"
          className="text-center mx-auto btn-primary w-full my-1"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
