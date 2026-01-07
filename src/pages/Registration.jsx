import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { RiGoogleFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router";
import Loader from "../components/Loader";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, setLoading, update, setUser, register, googleLogin } =
    use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  // google login or signup
  const handleGoogleLogin = () => {
    setLoading(true);
    googleLogin()
      .then((result) => {
        setLoading(false);
        const user = result.user;
        setUser(user);
        navigate(location?.state || "/");
        toast("Successfully Logged in user!");
      })
      .catch((error) => {
        setLoading(false);
        toast(error.message);
      });
  };

  // signup with name, email, password and photURL(optional)
  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;
    register(email, password)
      .then((result) => {
        const currentUser = result.user;
        currentUser.displayName = name;
        currentUser.photoURL = photoURL;
        const userToDB = {
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
        };
        update({ displayName: name, photoURL: photoURL }).catch((error) => {
          setLoading(false);
          toast(error.message);
        });
        setUser(currentUser);
        fetch("https://movie-master-pro-api.vercel.app/users/add", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userToDB),
        })
          .then(() => {
            toast("User Successfully Added To DB!");
          })
          .then((error) => {
            setLoading(false);
            toast(error);
          });
        setLoading(false);
        e.target.reset();
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setLoading(false);
        toast(error.message);
      });
  };
  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="py-5 md:py-10 flex w-4/5 md:w-1/2 mx-auto justify-center items-center text-primary dark:text-secondary">
        <form className="w-full" onSubmit={handleRegister}>
          <h2 className="mb-1 md:mb-4 text-center dark:text-white font-bold text-xl md:text-2xl lg:text-4xl">
            Register
          </h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary dark:text-white">
              Give your name
            </legend>
            <input type="text" name="name" className="input w-full" required />
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary dark:text-white">
              Give your mail
            </legend>
            <label className="input w-full validator">
              <input type="email" name="email" required />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary dark:text-white">
              Give photo url
            </legend>
            <label className="input validator w-full">
              <input type="url" name="photoURL" />
            </label>
            <div className="validator-hint hidden">Enter valid url link</div>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-primary dark:text-white">
              Create your password
            </legend>
            <label className="input w-full validator">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                minLength="6"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must be more than 6 characters, including number, lowercase letter, uppercase letter"
              />
              <span
                className="hover:cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaEye></FaEye>
              </span>
            </label>
            <p className="validator-hint hidden">
              Must be more than 6 characters, including
              <br />
              At least one number <br />
              At least one lowercase letter <br />
              At least one uppercase letter
            </p>
          </fieldset>
          <button
            type="submit"
            className="text-center mx-auto btn-primary w-full"
          >
            Register
          </button>
          <div className="flex gap-2 justify-center items-center">
            <p className="dark:text-white">Already have account?</p>
            <Link state={location?.state} className="text-blue-500" to="/login">
              Login
            </Link>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="btn-primary my-2 flex items-center justify-center gap-2 w-full"
          >
            <RiGoogleFill></RiGoogleFill> Google Login
          </button>
        </form>
      </div>
    );
  }
};

export default Registration;
