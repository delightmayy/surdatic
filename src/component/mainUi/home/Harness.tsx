"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import img from "../../../img/img.png";
import harn1 from "../../../img/harn1.png";
import harn2 from "../../../img/harn2.png";
import harn3 from "../../../img/harn3.png";
import harn4 from "../../../img/harn4.png";

const features = [
  {
    title: "AI-Generated Surveys, Smarter Data",
    desc: "Our AI machine creates tailored survey questions automatically, ensuring relevance, accuracy, and faster insights for every research need.",
    icon: harn1,
  },
  {
    title: "AI-Powered Video Survey Intelligence",
    desc: "Surdatii AI automatically reviews video surveys, extracts key insights, and generates instant analysis.",
    icon: harn2,
  },
  {
    title: "Fraud Detection & Validation",
    desc: "Surdatii AI detects inconsistent or false responses, ensuring only high-quality, authentic data is reviewed.",
    icon: harn3,
  },
  {
    title: "Personalized User Experience",
    desc: "Surdatii AI tailors surveys, notifications, and marketplace offers to each user’s behavior and preferences.",
    icon: harn4,
  },
];

// ✅ Correctly typed variant with dynamic delay
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (custom: number = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Harness = () => {
  return (
    <motion.section
      className=" bg-gradient-to-b from-black/95 to-black text-white px-4 py-10 md:py-20 md:px-12 relative"
      initial="hidden"
      whileInView="visible"
      variants={fadeInUp}
      viewport={{ once: true }}
    >
      <div className="absolute blur-[100px] p-20 md:p-30 top-2 left-20 md:bg-cyan-400 bg-cyan-400/50"></div>

      <motion.div
        variants={fadeInUp}
        custom={0}
        className="max-w-7xl mx-auto flex flex-col items-center text-center gap-4"
      >
        <p className="text-xs text-gray-400">
          Powered by{" "}
          <span className="text-sky-400 cursor-pointer">Surdati AI</span>
        </p>
        <h2 className=" md:text-2xl font-semibold max-w-2xl">
          Harness the power of <br /> artificial intelligence
        </h2>
      </motion.div>

      <div className="mt-12 flex flex-col lg:flex-row lg:justify-center lg:items-start gap-4 ">
        {/* Left Features */}
        <div className="flex flex-col  gap-10 lg:gap-30 lg:translate-x-28 lg:flex-1  justify-between">
          {[0, 2].map((idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              custom={idx + 1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-4 items-start md:items-center max-w-md mx-auto rounded bg-white/5 p-4"
            >
              <div className="flex-shrink-0 flex items-center justify-center">
                <img src={features[idx].icon} alt="" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xs">{features[idx].title}</h3>
                <p className="text-xs text-gray-300 mt-1">
                  {features[idx].desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center Mobile Phone Image */}
        <motion.div
          variants={fadeInUp}
          custom={1.5}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex justify-center lg:flex-1"
        >
          <img src={img} alt="surdati ai" className="w-5/6 h-auto sm:h-4/5 md:h-3/5 lg:h-auto lg:w-auto" />
        </motion.div>

        {/* Right Features */}
        <div className="flex flex-col gap-10 lg:gap-30 lg:-translate-x-28 flex-1 lg:flex-1 justify-between">
          {[1, 3].map((idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              custom={idx + 1.5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex gap-4 items-start md:items-center max-w-md mx-auto rounded bg-white/5 p-4"
            >
              <div className="flex-shrink-0 flex items-center justify-center">
                <img src={features[idx].icon} alt="" className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-xs">{features[idx].title}</h3>
                <p className="text-xs text-gray-300 mt-1">
                  {features[idx].desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Harness;
