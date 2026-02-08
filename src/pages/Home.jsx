import { Link, useLoaderData } from "react-router";
import CarouselSlider from "../components/CarouselSlider";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { FaAngleDown, FaChrome, FaSafari } from "react-icons/fa";
import { MdTabletAndroid } from "react-icons/md";
import { IoLogoAndroid } from "react-icons/io";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { ErrorBoundary } from "react-error-boundary";
import { motion } from "framer-motion";
import ContactUs from "../components/ContactUs";
import Comments from "../components/Comments";
const errorFallback = ({ error }) => {
  return <p>Something Went Wrong: {error.message}</p>;
};
const Home = () => {
  const movies = useLoaderData();
  const [users, setUsers] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [recentMovies, setRecentMovies] = useState([]);
  const [pending, setPending] = useState(0);
  const loading = pending > 0;
  // const toastUsersLoaded = useRef(false);
  // const toastTopLoaded = useRef(false);
  // const toastRecentLoaded = useRef(false);

  // load users data from database
  useEffect(() => {
    setPending((p) => p + 1);
    fetch("https://movie-master-pro-api.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        // if (!toastUsersLoaded.current) {
        //   toast("User Data Loaded!");
        // }
        // toastUsersLoaded.current = true;
        setUsers(data);
      })
      .catch((err) => {
        toast(err);
      })
      .finally(() => {
        setPending((p) => p - 1);
      });
  }, []);
  // load top rated movies from database
  useEffect(() => {
    setPending((p) => p + 1);
    fetch("https://movie-master-pro-api.vercel.app/movies/top-rated")
      .then((res) => res.json())
      .then((data) => {
        // if (!toastTopLoaded.current) {
        //   toast("Top Rated Movies Loaded!");
        // }
        // toastTopLoaded.current = true;
        setTopMovies(data);
      })
      .catch((err) => {
        toast(err);
      })
      .finally(() => {
        setPending((p) => p - 1);
      });
  }, []);
  // load recent 6 movies
  useEffect(() => {
    setPending((p) => p + 1);
    fetch("https://movie-master-pro-api.vercel.app/movies/recent")
      .then((res) => res.json())
      .then((data) => {
        // if (!toastRecentLoaded.current) {
        //   toast("Recent Movies Loaded!");
        // }
        // toastRecentLoaded.current = true;
        setRecentMovies(data);
      })
      .catch((err) => {
        toast(err);
      })
      .finally(() => {
        setPending((p) => p - 1);
      });
  }, []);
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <ErrorBoundary FallbackComponent={errorFallback}>
      <div className="pt-5 md:pt-10 mb-0">
        <CarouselSlider movies={movies.result}></CarouselSlider>
        {/* statistics section */}
        <h2 className="pt-5 md:pt-10 mb-1 md:pb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          Statistics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="underline mb-2">Total Movies</p>
            <p>{movies.result.length}</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="underline mb-2">Total Users</p>
            <p>{users.length}</p>
          </motion.div>
        </div>
        {/* ------------------------------------------------------------------ */}
        {/* Top Rated Movies section */}
        <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          Top Rated Movies
        </h2>
        <MovieCard movies={topMovies}></MovieCard>
        {/* ------------------------------------------------------------------ */}
        {/* Recently Added Movies section */}
        <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          Recently Added
        </h2>
        <MovieCard movies={recentMovies}></MovieCard>
        {/* ------------------------------------------------------------------ */}
        {/* Genre Section */}
        <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          Genre
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-11/12 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-base-200 dark:bg-slate-900 p-4 rounded-md"
          >
            <img
              className="w-[300px] h-[150px] mx-auto rounded-md"
              src="https://i.ibb.co.com/VcRKVyGh/action.webp"
              alt="genre pic action"
            />
            <Link to="/movies?genre=Action">
              <button
                className="text-white font-bold bg-linear-to-r from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] rounded-sm w-full mt-1"
                style={{ width: "100%" }}
              >
                Action
              </button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-base-200 dark:bg-slate-900 p-4 rounded-md"
          >
            <img
              className="w-[300px] h-[150px] mx-auto rounded-md"
              src="https://i.ibb.co.com/Xf0fL8nL/drama.jpg"
              alt="genre pic drama"
            />
            <Link to="/movies?genre=Drama">
              <button
                className="text-white font-bold bg-linear-to-r from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] rounded-sm w-full mt-1"
                style={{ width: "100%" }}
              >
                Drama
              </button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-base-200 dark:bg-slate-900 p-4 rounded-md"
          >
            <img
              className="w-[300px] h-[150px] mx-auto rounded-md"
              src="https://i.ibb.co.com/N2XfGz8Y/comedy.webp"
              alt="genre pic comedy"
            />
            <Link to="/movies?genre=Comedy">
              <button
                className="text-white font-bold bg-linear-to-r from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] rounded-sm w-full mt-1"
                style={{ width: "100%" }}
              >
                Comedy
              </button>
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-base-200 dark:bg-slate-900 p-4 rounded-md"
          >
            <img
              className="w-[300px] h-[150px] mx-auto rounded-md"
              src="https://i.ibb.co.com/Df5Nrv8S/sifi.jpg"
              alt="genre pic si-fi"
            />
            <Link to="/movies?genre=Sci-Fi">
              <button
                className="text-white font-bold bg-linear-to-r from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] rounded-sm w-full mt-1"
                style={{ width: "100%" }}
              >
                Sci-fi
              </button>
            </Link>
          </motion.div>
        </div>
        {/* ------------------------------------------------------------------------*/}
        {/* why choose movie master pro section */}
        <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          Why Choose Movie Master Pro
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 mx-auto text-center pb-5 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Secure Authentication Using Firebase</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Watch-list Feature</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Add Movie Feature</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Edit Added Movie Feature</p>
          </motion.div>
        </div>
        {/* ------------------------------------------------------------------ */}
        {/* features section */}
        <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 mx-auto text-center pb-5 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Registration With Email and Password</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Adding Movie</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Update Added Movie</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Delete Added Movie</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Explore My Collection</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold lg:text-2xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Checking Watch History</p>
          </motion.div>
        </div>
        {/* ------------------------------------------------------------------ */}
        {/* about platform section */}
        <h2 className="mt-5 md:mt-10 mb-1 md:mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          About Platform
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 mx-auto text-center pb-5 md:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="underline mb-2">Supported Platforms</p>
            <ul className="w-1/2 md:w-4/5 lg:w-1/2 mx-auto text-xs md:text-base">
              <li className="flex justify-start gap-0.5 items-center">
                <FaChrome />
                Chrome
              </li>
              <li className="flex justify-start gap-0.5 items-center">
                <FaSafari />
                Safari
              </li>
              <li className="flex justify-start gap-0.5 items-center">
                <MdTabletAndroid />
                Mobile Android
              </li>
              <li className="flex justify-start gap-0.5 items-center">
                <IoLogoAndroid />
                Android TV
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="underline mb-2">Features of Platforms</p>
            <ul className="w-1/2 md:w-4/5 lg:w-1/2 mx-auto text-xs md:text-base">
              <li className="flex justify-start gap-0.5 items-center">
                <FaChrome />
                Stream and download
              </li>
              <li className="flex justify-start gap-0.5 items-center">
                <FaSafari />
                Stream and download
              </li>
              <li className="flex justify-start gap-0.5 items-center">
                <MdTabletAndroid />
                Stream and download
              </li>
              <li className="flex justify-start gap-0.5 items-center">
                <IoLogoAndroid />
                Watch in 4K UHD
              </li>
            </ul>
          </motion.div>
        </div>
        {/* ------------------------------------------------------------------ */}
        {/* contact us section */}
        <Comments></Comments>
        {/* ------------------------------------------------------------------ */}
        {/* contact us section */}
        <ContactUs></ContactUs>
        {/* ------------------------------------------------------------------ */}
        {/*  FAQ section */}
        <div className="pb-5 md:pb-10 text-primary dark:text-white">
          <h2 className="mt-5 md:mt-10 pb-1 md:pb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
            FAQ
          </h2>
          <div className="space-y-1">
            <details
              className="collapse bg-base-100 dark:bg-slate-900 border border-base-300"
              name="my-accordion-det-1"
              open
            >
              <summary className="collapse-title font-semibold flex justify-between">
                What is Movie Master Pro?
                <FaAngleDown />
              </summary>
              <div className="collapse-content text-sm">
                Movie Master Pro is a MERN-based movie management web
                application that allows users to add movies, manage personal
                collections, create a watchlist, and explore detailed
                information about each movie in one place.
              </div>
            </details>
            <details
              className="collapse bg-base-100 dark:bg-slate-900 border border-base-300"
              name="my-accordion-det-1"
            >
              <summary className="collapse-title font-semibold flex justify-between">
                Need an account to use Movie Master Pro? <FaAngleDown />
              </summary>
              <div className="collapse-content text-sm">
                <p>Yes. You must be logged in to:</p>
                <ol className="list-disc">
                  <li className="ml-4">Add movies</li>
                  <li className="ml-4">Access your personal collection</li>
                  <li className="ml-4">Manage your watchlist</li>
                  <li className="ml-4">Remove movies you’ve added</li>
                </ol>
                <p>This ensures your data remains private and secure.</p>
              </div>
            </details>
          </div>
          <Link to="/faq">
            <button className="text-white font-bold bg-linear-to-r from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] rounded-sm w-full py-2 mt-1 hover:cursor-pointer">
              More FAQ...
            </button>
          </Link>
        </div>
        {/* ------------------------------------------------------------------ */}
      </div>
    </ErrorBoundary>
  );
};

export default Home;
