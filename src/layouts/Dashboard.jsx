import React, { use } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { BiHome, BiUser } from "react-icons/bi";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

const Dashboard = () => {
  const { user, logout } = use(AuthContext);
  const handleLogout = () => {
    logout()
      .then()
      .catch((error) => {
        toast(error.message);
      });
  };
  const links = (
    <>
      <li>
        <NavLink
          className="flex gap-1 items-center"
          to={`/dashboard`}
        >
          <BiHome></BiHome> <span className="hidden md:flex">Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink className="flex gap-1 items-center" to="/dashboard/profile">
          <CgProfile></CgProfile>{" "}
          <span className="hidden md:flex">Profile</span>
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="h-screen">
      <div className="navbar z-50 sticky top-0 bg-base-100 dark:bg-slate-900 shadow-sm">
        <div className="navbar-start">
          <div>
            {/* <div
              tabIndex={0}
              role="button"
              className="btn text-primary dark:text-white flex md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div> */}
          </div>
          <a
            href="/"
            className="btn btn-ghost font-bold text-xs md:text-xl lg:text-2xl text-primary dark:text-white"
          >
            Movie Master Pro
          </a>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex items-center gap-2">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  {user.photoURL ? (
                    <li className="flex justify-center items-center">
                      <img
                        className="w-14 h-10 rounded-full inline"
                        src={user.photoURL}
                      />
                    </li>
                  ) : (
                    <span>
                      <BiUser
                        className="text-primary dark:text-white"
                        size={40}
                      ></BiUser>
                    </span>
                  )}
                </div>
                <ul
                  tabIndex={0}
                  className="menu text-xs text-primary dark:text-white menu-sm dropdown-content mt-3 Z-[1] p-2 shadow bg-base-100 dark:bg-slate-800 rounded-box w-52"
                >
                  <Link
                    to={`/dashboard/profile`}
                    className="mx-auto w-full text-center"
                  >
                    <span className="btn btn-primary dark:btn-secondary w-full h-4 md:h-6 my-1">
                      Profile
                    </span>
                  </Link>
                  <Link
                    to={`/dashboard`}
                    className="mx-auto w-full text-center"
                  >
                    <span className="btn btn-primary dark:btn-secondary w-full h-4 md:h-6 my-1">
                      Dashboard Home
                    </span>
                  </Link>
                  <Link
                    onClick={handleLogout}
                    to="/dashboard"
                    className="mx-auto w-full text-center"
                  >
                    <span className="btn btn-primary dark:btn-secondary w-full h-4 md:h-6 my-1">
                      Logout
                    </span>
                  </Link>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login">
                <button className="btn btn-secondary w-20">Login</button>
              </Link>
              <Link to="/registration">
                <button className="btn btn-primary w-20">Register</button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-20 lg:grid-cols-24 md:grid-cols-26">
        <div className="flex col-span-1 lg:col-span-2 md:col-span-3 flex-col gap-5 bg-base-100 dark:bg-slate-950 text-primary dark:text-white h-full">
          {links}
        </div>
        <div className="col-span-19 lg:col-span-22 md:col-span-23 dark:bg-slate-800 dark:text-white bg-base-200 h-full">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
