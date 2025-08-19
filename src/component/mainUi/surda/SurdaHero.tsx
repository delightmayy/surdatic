import React from "react";
import { motion } from "framer-motion";
import CountdownTimer from "../Counter";
import herobg from "../../../img/bg3.png";
import hero from "../../../img/surdahero.png";

const SurdaHero: React.FC = () => {
  return (
    <section className="bg-[#0F1118] text-white px-4 md:px-8 py-16"
    style={{
        backgroundImage: `url(${herobg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover", // optional, makes sure it fills the area
      }}>
      <div className="max-w-5xl mx-auto space-y-16 lg:my-10">
        {/* === Top Row: Hero Text + Visual === */}
        <div className="flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between gap-12">
          {/* Text Column */}
          <motion.div
            className="flex-1 lg:flex flex-col gap-2 text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-2xl md:text-4xl font-semibold leading-tight mb-3 md:mb-4"
              initial={{ x: -40 }}
              whileInView={{ x: 0 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
            >
              Join the SURDA Revolution
            </motion.h1>

            <motion.p
              className="text-white/80 text-sm md:text-base max-w-lg mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              viewport={{ once: true }}
            >
              Claim Your Free SURDA Tokens Today
            </motion.p>

            <motion.p
              className="text-xs md:text-sm text-gray-400 max-w-xl mx-auto md:mx-0"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              viewport={{ once: true }}
            >
              Join the SURDA Revolution: Claim Your Free SURDA Tokens Today!
            </motion.p>

            <div className=" flex gap-2 justify-center text-xs md:justify-start">
              {" "}
              <motion.a
                href="#"
                className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Try Now →
              </motion.a>
              <motion.a
                href="#"
                className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Marketplace →
              </motion.a>
            </div>
            <CountdownTimer/>
          </motion.div>

          {/* Image/Visual/Card */}
          <motion.div
            className="flex-1 hidden md:flex justify-center md:justify-end w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            
              <img
                src={hero}
                alt="Globe with avatars"
                className="w-full  h-auto lg:w-100 lg:h-100  "
              />
           
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SurdaHero;
