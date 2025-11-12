import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router";
import { RiGoogleFill } from "react-icons/ri";
import toast from "react-hot-toast";

const Login = () => {
  const { login, setUser, googleLogin } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  // login or signup with google
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const currentUser = result.user;
        setUser(currentUser);
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  // login with email and password
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then((result) => {
        const currentUser = result.user;
        setUser(currentUser);
        e.target.reset();
      })
      .catch((error) => {
        toast(error.message);
      });
  };
  return (
    <div className="flex w-4/5 md:w-1/2 mx-auto text-secondary justify-center items-center">
      <form className="w-full" onSubmit={handleLogin}>
        <h2 className="text-center font-bold text-xl md:text-2xl lg:text-4xl">
          Login
        </h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend text-secondary">
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
          <legend className="fieldset-legend text-secondary">
            Give your password
          </legend>
          <label className="input w-full">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Type password here"
              title="Give password to login"
            />
            <span
              className="hover:cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FaEye></FaEye>
            </span>
          </label>
        </fieldset>
        <p className="flex justify-end">Forgot Password?</p>
        <button
          type="submit"
          className="text-center mx-auto btn-secondary w-full my-1"
        >
          Login
        </button>
        <div className="flex gap-2 justify-center items-center">
          <p>Already have account?</p>
          <Link className="text-primary" to="/registration">
            Register
          </Link>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="btn-secondary my-2 flex items-center justify-center gap-2 w-full"
        >
          <RiGoogleFill></RiGoogleFill> Google Login
        </button>
      </form>
    </div>
  );
};

export default Login;
