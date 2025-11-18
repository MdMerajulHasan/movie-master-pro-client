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
    fetch("http://localhost:3000/movies/add", {
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
    <div className="flex mb-5 md:mb-10 w-4/5 md:w-1/2 mx-auto justify-center items-center text-primary">
      <form className="w-full" onSubmit={handleAdd}>
        <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          Add A Movie
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
            placeholder="Type movie name"
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
            placeholder="Type movie genre"
            className="input w-full"
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
            placeholder="Type movie release year"
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
            placeholder="Type movie director"
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
            placeholder="Type movie cast"
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
            placeholder="Type movie rating"
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
            placeholder="Type movie duration (min)"
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
            placeholder="Type movie plot summary"
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
            placeholder="Type poster URL"
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
            placeholder="Type movie language"
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
            placeholder="Type movie country"
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
