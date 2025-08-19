// src/components/Hero.tsx
import React from "react";
import { motion } from "framer-motion";
import hero1 from "../../../img/mainhero1.png";
import hero2 from "../../../img/mainhero2.png";
import hero3 from "../../../img/mainhero3.png";
import herobg from "../../../img/hero1bg.png";

const HomeHero: React.FC = () => {
  return (
    <section
      className="bg-black text-white py-20"
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", 
      }}
    >
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-bold leading-tight mb-3 md:mb-6"
        >
          The Future of Data <br className="hidden sm:block" />
          <span className=" ">Collection Starts Here</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 text-xs md:text-sm max-w-lg mb-8"
        >
          Join a blockchain-powered ecosystem where your voice has value.
          Secure, rewarding, and built for the next-gen internet.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 md:px-6 md:py-2 py-1 border-blue-400/50 border-1 lg:border-2 border-dashed  rounded-md text-white text-sm lg:font-medium hover:text-blue-500 hover:border-blue/50"
        >
          Try Now →
        </motion.button>

        {/* Images Section */}
        <div className="mt-6 md:mt-12  flex flex-col md:flex-row items-center gap-8 lg:gap-14 xl:gap-20">
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 flex justify-center gap-2"
          >
            <img
              src={hero1}
              alt="Earnings card"
              className="rounded-lg shadow-lg max-h-80 w-auto"
            />
          </motion.div>

          {/* Center Phone */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex-1 flex justify-center"
          >
            <img
              src={hero2}
              alt="mainhero"
              className="rounded-xl shadow-xl max-h-120 xl:w-80 w-auto"
            />
          </motion.div>

          {/* Right Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex-1 flex justify-center"
          >
            <img
              src={hero3}
              alt="Survey metrics card"
              className="rounded-lg shadow-lg max-h-80 w-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
