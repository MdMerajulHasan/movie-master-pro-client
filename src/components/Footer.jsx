import React, { use } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";

const Footer = () => {
  const { user } = use(AuthContext);

  return (
    <div className="bg-black dark:bg-slate-900 py-5 md:py-10 text-white text-xs font-bold">
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-around md:items-start">
        <div>
          <h5 className="text-base">Go to</h5>
          <ul className="space-y-1">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies">All Movies</Link>
            </li>
            {user && (
              <>
                <li>
                  <Link to="/movies/my-collection">My Collection</Link>
                </li>
                <li>
                  <Link to="/movies/add">Add Movie</Link>
                </li>
                <li>
                  <Link to={`/watch-list/${user.email}`}>Watch List</Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div>
          <h5 className="text-base">Find Us On</h5>
          <div className="flex flex-col gap-1 md:flex-row md:gap-2 md:items-center">
            <FaFacebook size={20}></FaFacebook>
            <FaLinkedin size={20}></FaLinkedin>
            <FaGithub size={20}></FaGithub>
          </div>
        </div>
      </div>
      <p className="text-center"> Copyright &copy; 2025 Movie Master Pro </p>
    </div>
  );
};

export default Footer;
