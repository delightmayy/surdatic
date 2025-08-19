import React from "react";
import { motion } from "framer-motion";
import titlebg from "../../../img/titlebg.png";
import icon1 from "../../../img/whyicon1.png";
import icon2 from "../../../img/whyicon2.png";
import icon3 from "../../../img/whyicon3.png";
import mmmbg from "../../../img/Subtract.png";
import logo from "../../../img/logolarge.png";
import twitter from "../../../img/twitterx.png";
import reddit from "../../../img/reddit.png";
import google from "../../../img/google.png";
import discord from "../../../img/discord.png";
import matamask from "../../../img/metamask.png";

const Company: React.FC = () => {
  return (
    <section className="bg-black text-white py-8 md:py-16 px-4 relative">
      <div className="absolute blur-[100px] p-20 bottom-1/3 left-20 bg-cyan-400"></div>
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
        {/* Left Side */}
        <motion.div
          className="flex-1 space-y-6 mx-auto"
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="text-center flex flex-col lg:flex-row justify-center items-center">
            <h2
              className=" bg-black md:text-xl font-semibold py-2 px-6 rounded-full"
              style={{
                backgroundImage: `url(${titlebg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
              Company’s Description
            </h2>
          </div>
          <div className="flex flex-col items-center lg:items-start">
            <h2 className=" px-3 py-1 my-2 md:text-2xl font-semibold border-b-2 border-dashed border-b-blue-400/50">
              Why Surdatics
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300 text-center lg:text-start px-3 leading-relaxed">
              Surdatics is a blockchain-powered platform that transforms survey
              data collection by rewarding users with Surda tokens. It ensures
              secure, high-quality responses, enables users to monetize their
              data, and features a built-in wallet for seamless token management
              — making data collection smarter, engaging, and rewarding.
            </p>
          </div>
          {/* Feature Cards */}
          <div className="space-y-4">
            {[
              {
                icon: icon1,
                title: "Streamlined And Affordable Data",
                desc: "We offer efficient and easily accessible survey results, enhancing data quality and informed decision-making.",
              },
              {
                icon: icon2,
                title: "Decentralized Data",
                desc: "We provide secure and tamper-proof storage, protecting information from unauthorized access or alterations through blockchain technology.",
              },
              {
                icon: icon3,
                title: "Data Integrity",
                desc: "We guarantee accurate and trustworthy survey data, enhancing the value and ensuring the reliability of decisions.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-white/8 shadow-white/40  p-4 rounded-md shadow-inner flex items-start gap-4 max-w-md mx-auto lg:mx-2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <img src={feature.icon} alt={feature.title} className="w-10" />
                <div>
                  <h4 className="font-semibold">{feature.title}</h4>
                  <p className="text-gray-400 text-sm mt-0.5">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="flex-1 flex flex-col  items-center w-full max-w-md mx-auto  lg:items-end rounded-3xl"
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
          style={{
            backgroundImage: `url(${mmmbg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {/* Logo box */}
          <motion.div
            className=" rounded-lg shadow-lg  w-full flex flex-col"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex-1 flex flex-col items-center justify-center p-20 md:py-30 ">
              <img
                src={logo}
                alt="Surdatics Logo"
                className="h-40 w-40 lg:w-50 lg:h-50  object-contain "
              />
            </div>
            {/* Social Icons */}
            <motion.div
              className="flex bg-black/95 rounded items-center py-4 p-3 w-7/10 shadow-inner shadow-white/40 gap-4 ms-2 mt-1 sm:mt-4 lg:mt-0 justify-evenly "
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <img
                src={discord}
                alt="discord"
                className="text-2xl text-white hover:scale-90 cursor-pointer  w-6 lg:w-8"
              />

              <img
                src={matamask}
                alt="metamask"
                className="text-2xl text-white hover:scale-90 cursor-pointer  w-6 lg:w-8"
              />
              <img
                src={twitter}
                alt="twitter"
                className="text-2xl text-white hover:scale-90 cursor-pointer  w-6 lg:w-8"
              />
              <img
                src={reddit}
                alt="reddit"
                className="text-2xl text-white hover:scale-90 cursor-pointer  w-6 lg:w-8"
              />

              <img
                src={google}
                alt="google"
                className="text-2xl text-white hover:scale-90 cursor-pointer  w-6 lg:w-8"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Company;
