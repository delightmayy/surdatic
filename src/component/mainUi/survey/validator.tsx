import React from "react";
import { motion } from "framer-motion";
import titlebg from "../../../img/titlebg.png";
import logo from "../../../img/minilogo.png";
import icon from "../../../img/solicon2.png";

const Validator: React.FC = () => {
  const data = [
    {
      title: "Becoming a Validator",
      desc: "Become a validator by locking $10,000 in SURDA tokens — a commitment that ensures trust, accountability, and high data quality standards.",
    },
    {
      title: "Validation Process",
      desc: "As a validator, your primary responsibility is to review and verify the accuracy and relevance of survey responses. Your expertise ensures that only high-quality data is accepted on our platform.",
    },
    {
      title: "Earn $SURDA Tokens",
      desc: "After validating survey responses, researchers review your work. Once approved, you’ll receive SURDA tokens as your reward — fast and efficiently.",
    },
    {
      title: "Submission Rejections",
      desc: "It's important to note that if your validations are rejected by the researchers, you will not receive payment for those specific tasks. This process ensures that only accurate and reliable data is validated and rewarded.",
    },
  ];
  return (
    <section className=" bg-black/60 p-4  mx-auto space-y-10 ">
      <div className="max-w-7xl mx-auto rounded-3xl shadow-inner shadow-white/40  xl:shadow-white/50 px-4 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" flex flex-col-reverse gap-5 md:flex-row-reverse max-w-6xl mx-auto text-white/70 mb-8"
        >
          <div className="text-center md:flex-1 space-y-2 flex flex-col items-center max-w-sm mx-auto lg:mx-2">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xs  p-1 px-4  rounded-full capitalize tracking-widest border border-white/15">
                Survey<span className="text-[#00DCFF]"> Process</span>
              </p>
            </div>
            <h2 className=" md:text-2xl max-w-sm  font-bold">For Validators</h2>
            <p className="max-w-2xl mx-auto text-gray-300  text-xs text-center  px-3 leading-relaxed">
              Earn $SURDA Tokens by Validating Surveys: Join Our Validator Team
            </p>
          </div>{" "}
          <div className="text-center md:flex-1 flex flex-col md:flex-row justify-center items-center md:justify-start ">
            <h2
              className="  md:text-xl font-semibold py-2 px-6 rounded-full"
              style={{
                backgroundImage: `url(${titlebg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
              How it Works
            </h2>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col  lg:grid items-start grid-cols-12 gap-8   ">
          {/* CTA Card */}

          <motion.div
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center flex-1 /*lg:flex-3/12 */  max-w-md md:max-w-lg mx-auto  lg:col-span-4 "
          >
            <div className=" bg-black rounded-2xl p-6 text-center lg:text-start border border-white/20">
              <div className="flex flex-col items-center lg:items-start mb-4">
                <div className="p-2 mt-2">
                  <img src={logo} alt="logo" className="w-8" />
                </div>
                <h3 className="font-semibold text-white border-b border-dashed md:border-b-2 border-b-sky-400">
                  For Validators
                </h3>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                Validators review survey responses for accuracy and quality.
                Approved validations earn SURDA tokens — a simple and rewarding
                way to contribute.
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 md:px-6 md:py-2 py-1 border-blue-400/50 border-1 lg:border-2 border-dashed  rounded-md text-white text-sm lg:font-medium hover:text-blue-500 hover:border-blue/50"
              >
                Try Now →
              </motion.button>
            </div>
          </motion.div>

          {/* Left Steps */}
          <div className=" flex flex-col  gap-4 flex-wrap lg:col-span-8 lg:grid grid-cols-12 mx-auto">
            {data.map((feature, index) => (
              <div
                key={index}
                className="bg-white/6 rounded-2xl p-6 shadow-white/30  flex flex-col justify-start items-center text-center max-w-md md:max-w-lg  mx-auto shadow-inner -skew-x-4 col-span-4 hover:scale-95 "
              >
                <img
                  src={icon}
                  alt={feature.title}
                  className="w-10 my-0.5 p-2 rounded-full bg-white/10"
                />
                <h4 className="font-semibold text-white/60 text-center text-lg mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-400 text-sm text-center ">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Validator;
