import React, { use, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { FaEye } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import { RiGoogleFill } from "react-icons/ri";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

const Login = () => {
  const { loading, setLoading, login, setUser, googleLogin } = use(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // login or signup with google
  const handleGoogleLogin = () => {
    setLoading(true);
    googleLogin()
      .then((result) => {
        setLoading(false);
        const currentUser = result.user;
        setUser(currentUser);
        navigate(location?.state || "/");
        toast("Successfully Logged in user!");
      })
      .catch((error) => {
        setLoading(false);
        toast(error.message);
      });
  };

  // login with email and password
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;
    login(email, password)
      .then((result) => {
        setLoading(false);
        const currentUser = result.user;
        setUser(currentUser);
        e.target.reset();
        navigate(location?.state || "/");
        toast("Successfully Logged in user!");
      })
      .catch((error) => {
        setLoading(false);
        toast(error.message);
      });
  };

  const handleDemoLogin = () => {
    setLoading(true);
    login("merajuljim@gmail.com", "Jim123")
      .then((result) => {
        setLoading(false);
        const currentUser = result.user;
        setUser(currentUser);
        navigate(location?.state || "/");
        toast("Successfully Logged in user!");
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
      <div className="py-5 md:py-10 flex w-4/5 md:w-1/2 mx-auto text-secondary dark:text-white justify-center items-center">
        <form className="w-full" onSubmit={handleLogin}>
          <h2 className="mb-1 md:mb-4 text-center font-bold text-xl md:text-2xl lg:text-4xl">
            Login
          </h2>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-secondary dark:text-white">
              Give your mail
            </legend>
            <label className="input validator w-full">
              <input
                type="email"
                name="email"
                className="text-secondary"
                required
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </fieldset>
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-secondary dark:text-white">
              Give your password
            </legend>
            <label className="input w-full text-secondary">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
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
            className="text-center mx-auto btn-secondary w-full my-1 py-2"
          >
            Login
          </button>
          <div className="flex gap-2 justify-center items-center">
            <p>Don't have account?</p>
            <Link
              state={location?.state}
              className="text-primary dark:text-secondary"
              to="/registration"
            >
              Register
            </Link>
          </div>
          <button
            onClick={handleGoogleLogin}
            className="btn-secondary my-2 flex items-center justify-center gap-2 w-full py-2"
          >
            <RiGoogleFill></RiGoogleFill> Google Login
          </button>
          <button
            onClick={handleDemoLogin}
            className="btn-secondary my-2 flex items-center justify-center gap-2 w-full py-2"
          >
            Demo Login
          </button>
        </form>
      </div>
    );
  }
};

export default Login;
