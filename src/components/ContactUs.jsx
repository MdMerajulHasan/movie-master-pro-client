import React from "react";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <div>
      <h2 className="mt-5 md:mt-10 mb-4 text-primary dark:text-white font-bold text-2xl text-center md:text-4xl lg:text-6xl">
        Contact Us
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 w-11/12 mx-auto pb-10"
      >
        <div className="bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white flex justify-center items-center text-primary dark:text-white dark:bg-slate-900 p-6 rounded-xl">
          <div className="">
            <h3 className="lg:text-2xl font-bold mb-4">Get in Touch</h3>
            <p className="mb-2">📧 Email: support@moviemasterpro.com</p>
            <p className="mb-2">📍 Location: Bangladesh</p>
            <p className="mb-2">🕒 Support: 24/7 Online</p>
            <p className="mt-4 text-sm opacity-80">
              We usually respond within 24 hours.
            </p>
          </div>
        </div>
        <form className="bg-linear-to-br from-red-500 dark:from-[#3b82f6] to-red-300 dark:to-[#93c5fd] text-white dark:bg-slate-900 p-6 rounded-xl">
          <div className="mb-4">
            <label className="block mb-1 font-semibold">Name</label>
            <input
              type="text"
              className="w-full p-2 rounded-md bg-base-100 dark:bg-slate-800"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full p-2 rounded-md bg-base-100 dark:bg-slate-800"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-semibold">Message</label>
            <textarea
              rows="4"
              className="w-full p-2 rounded-md bg-base-100 dark:bg-slate-800"
              required
            ></textarea>
          </div>
          
          <button className="w-full bg-base-200 dark:bg-slate-950 text-primary dark:text-white font-bold py-2 rounded-md">
            Send Message
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactUs;
