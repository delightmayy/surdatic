import React from "react";
import { motion } from "framer-motion";
import herobg from "../../../img/surveybg.png";

const SurveyHero: React.FC = () => {
  return (
    <section
      className="bg-[#0F1118] text-white px-4 md:px-12 py-20 md:py-28 lg:py-36"
      style={{
        backgroundImage: `url(${herobg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // optional, makes sure it fills the area
      }}
    >
      <div className="max-w-6xl mt-3 lg:mt-10 mx-auto space-y-16">
        {/* === Top Row: Hero Text + Visual === */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-12">
          {/* Text Column */}
          <motion.div
            className="flex-1 text-center md:text-left max-w-md"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-3xl md:text-4xl font-bold leading-tight mb-3 md:mb-6"
              initial={{ x: -40 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              Earn Rewards for Your Insights:
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl mb-4 text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              viewport={{ once: true }}
            >
              Respond – Design – Validate
              <br />
              Surveys to earn more
            </motion.p>

            <motion.p
              className="text-gray-400 text-xs md:text-sm max-w-lg mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
            >
              Join a blockchain-powered ecosystem where your voice has value.
              Secure, rewarding, and built for the next-gen internet.
            </motion.p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 md:px-6 md:py-2 py-1 border-blue-400/50 border-1 lg:border-2 border-dashed  rounded-md text-white text-sm lg:font-medium hover:text-blue-500 hover:border-blue/50"
            >
              Try Now →
            </motion.button>
          </motion.div>

          {/* Image/Visual/Card */}
          <div className="flex-1 flex justify-center md:justify-end w-full"></div>
        </div>
      </div>
    </section>
  );
};

export default SurveyHero;
