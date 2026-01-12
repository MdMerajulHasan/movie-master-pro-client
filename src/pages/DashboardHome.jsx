import React, { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GenrePieChart from "../components/GenrePieChart";
import { AuthContext } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const DashboardHome = () => {
  const { user } = use(AuthContext);
  const [watchedData, setWatchedData] = useState([]);
  useEffect(() => {
    fetch(`https://movie-master-pro-api.vercel.app/watch-list/${user.email}`)
      .then((res) => res.json())
      .then((data) => setWatchedData(data))
      .catch((err) => toast(err.message));
  }, [user]);

  //making an object with each genre watched and genre count
  const genreCount = watchedData.reduce((acc, curr) => {
    acc[curr.genre] = (acc[curr.genre] || 0) + 1;
    return acc;
  }, {});

  //making an array of object , each object has genre and count value , to use in chart
  const chartData = Object.keys(genreCount).map((genre) => ({
    genre,
    count: genreCount[genre],
  }));

  return (
    <div>
      <h2 className="pt-5 md:pt-10 mb-1 md:pb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Total Watched
      </h2>
      <div className="h-screen">
        <div className="w-11/12 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white font-bold text-2xl md:text-3xl lg:text-4xl rounded-md py-12 md:py-15 lg:py-20"
          >
            <p className="mb-2">Total Movies Watched</p>
            <p>{watchedData.length}</p>
          </motion.div>
        </div>
        <h2 className="pt-5 md:pt-10 mb-1 md:pb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
          Watched Data Chart
        </h2>
        {chartData.length > 0 ? (
          <GenrePieChart data={chartData}></GenrePieChart>
        ) : (
          <p className="text-primary font-bold text-center">
            You Have Not Watched Any Movie Yet!
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
