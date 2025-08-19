import React from "react";
import titlebg from "../../../img/titlebg.png";
import bg from "../../../img/bg2.png";
import sol1 from "../../../img/solicon1.png";
import sol2 from "../../../img/solicon2.png";
import sol3 from "../../../img/solicon3.png";
import sol4 from "../../../img/solicon4.png";
import sol5 from "../../../img/solicon5.png";
import sol6 from "../../../img/solicon6.png";
import { motion } from "framer-motion";

const features = [
  {
    title: "Buy Surda Token with Card",
    description:
      "Easily purchase Surda tokens using your debit or credit card—no crypto experience needed.",
    icon: sol1,
    id: 1,
  },
  {
    title: "P2P Trading Marketplace",
    description:
      "Trade Surda tokens securely with other users through a decentralized, system-protected peer-to-peer protocol.",
    icon: sol2,
    id: 2,
  },
  {
    title: "Video Surveys & Scheduling",
    description:
      "Participate in high-value video surveys and schedule your sessions directly within the platform.",
    icon: sol3,
    id: 3,
  },
  {
    title: "Airtime & Data Purchase",
    description:
      "Use your Surda tokens to instantly top-up mobile airtime and data on major Nigerian networks.",
    icon: sol4,
    id: 4,
  },
  {
    title: "External Data Seller Marketplace",
    description:
      "Browse and purchase verified datasets from approved external data providers—all powered by smart contracts.",
    icon: sol5,
    id: 5,
  },
  {
    title: "Public API Access (B2B)",
    description:
      "Businesses can integrate Surdatics tools via RESTful APIs to launch surveys, verify users, or handle token payments.",
    icon: sol6,
    id: 6,
  },
];

const Solution: React.FC = () => {
  return (
    <section className="bg-gray-950 text-white py-8 md:py-16 px-4"
     style={{
                backgroundImage: `url(${bg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}>
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" flex flex-col-reverse gap-5 md:flex-row max-w-6xl mx-auto"
        >
          <div className="text-center md:flex-1 space-y-2 flex flex-col items-center max-w-sm mx-auto lg:mx-2">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xs text-[#00DCFF] p-1 px-4  rounded-full capitalize tracking-widest border border-white/15">
                Features
              </p>
            </div>
            <h2 className=" md:text-2xl max-w-sm  font-bold">Our Solutions</h2>
            <p className="max-w-2xl mx-auto text-gray-300  text-xs text-center  px-3 leading-relaxed">
              Secure, scalable, and decentralized solutions for your digital
              assets— experience the future of financial freedom.
            </p>
          </div>{" "}
          <div className="text-center md:flex-1 flex flex-col md:flex-row justify-center items-center md:justify-end ">
            <h2
              className="  md:text-xl font-semibold py-2 px-6 rounded-full"
              style={{
                backgroundImage: `url(${titlebg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
              Surdatics Features
            </h2>
          </div>
        </motion.div>

        {/* Grid / Flex Layout */}
        <motion.div
          className="flex flex-wrap px-3 gap-6 justify-center"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`bg-white/3   transition border border-transparent hover:border-blue-500/50 flex flex-col items-center  w-full sm:w-[48%] lg:w-[31%] p-6 rounded-xl shadow-inner shadow-white/40 hover:scale-95 ${
                feature.id > 3
                  ? "skew-x-4 md:skew-x-6"
                  : "-skew-x-4 md:-skew-x-6"
              }   `}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className="w-10 my-0.5 p-2 rounded-full bg-white/10"
              />
              <h4 className="font-semibold text-center text-lg mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-400 text-sm text-center ">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
