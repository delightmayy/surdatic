import React from "react";
import { motion } from "framer-motion";
import herobg from "../../../img/bg3.png";
import hero from "../../../img/markethero.png";
const MarketPlaceHero: React.FC = () => {
  return (
    <section
      className="bg-black text-white py-20 "
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // optional, makes sure it fills the area
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
          Explore the SURDATICS
          <br className="hidden sm:block" />
          <span className=" ">Marketplace</span>
        </motion.h1>

        <h2 className="text-white/60 text-sm md:text-base max-w-lg mb-4">
          Buy, and List, NFT-Backed Data
        </h2>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-gray-400 text-xs md:text-sm max-w-lg mb-8"
        >
          0ur marketplace offers a secure platform for researchers, analysts,
          and data enthusiasts to access and exchange high-quality, validated
          data.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 md:px-6 md:py-2 py-1 border-blue-400/50 border-1 lg:border-2 border-dashed  rounded-md text-white text-sm lg:font-medium hover:text-blue-500 hover:border-blue/50"
        >
          Marketplace →
        </motion.button>

        {/* Images Section */}
        <div className="mt-16 flex flex-col md:flex-row items-center gap-8">
          {/* Left Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex-1 flex justify-center translate-y-15"
          >
            <img
              src={hero}
              alt="Earnings card"
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MarketPlaceHero;
