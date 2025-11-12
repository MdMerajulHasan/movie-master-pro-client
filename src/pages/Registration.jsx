import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import { FaEye } from "react-icons/fa";
import { RiGoogleFill } from "react-icons/ri";
import { Link } from "react-router";

const Registration = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { update, setUser, register, googleLogin } = use(AuthContext);

  // google login or signup
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  // signup with name, email, password and photURL(optional)
  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photoURL = e.target.photoURL.value;
    const password = e.target.password.value;
    register(email, password)
      .then((result) => {
        const currentUser = result.user;
        currentUser.displayName = name;
        currentUser.photoURL = photoURL;
        update({ displayName: name, photoURL: photoURL })
          .then()
          .catch((error) => {
            toast(error.message);
          });
        setUser(currentUser);
        e.target.reset();
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  return (
    <div className="flex w-4/5 md:w-1/2 mx-auto justify-center items-center text-primary">
      <form className="w-full" onSubmit={handleRegister}>
        <h2 className="text-center font-bold text-xl md:text-2xl lg:text-4xl">
          Register
        </h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary">
            Give your name
          </legend>
          <input
            type="text"
            name="name"
            className="input w-full"
            placeholder="Type name here"
            required
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary">
            Give your mail
          </legend>
          <input
            type="email"
            name="email"
            className="input w-full"
            placeholder="Type email here"
            required
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary">
            Give photo url
          </legend>
          <input
            type="url"
            name="photoURL"
            className="input w-full"
            placeholder="Paste photo url here"
          />
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-primary">
            Create your password
          </legend>
          <label className="input w-full validator">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Type password here"
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
          <p>Already have account?</p>
          <Link className="text-blue-500" to="/login">
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
};

export default Registration;
