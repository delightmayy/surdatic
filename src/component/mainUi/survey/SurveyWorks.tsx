import { motion } from "framer-motion";
import React from "react";
import titlebg from "../../../img/titlebg.png";
import logo from "../../../img/minilogo.png";

interface Step {
  number: string;
  title: string;
  desc: string;
}

const SurveyWorks: React.FC = () => {
  const steps: Step[] = [
    {
      number: "1",
      title: "Participate in Surveys",
      desc: "Sign up and start participating in surveys designed by researchers. Your insights are crucial in shaping data-driven decisions.",
    },
    {
      number: "2",
      title: "Validation Process",
      desc: "After completing a survey, your responses undergo a rigorous validation process by our dedicated validators.",
    },
    {
      number: "3",
      title: "Earn $SURDA Tokens",
      desc: "Once validated, your account is credited with SURDA tokens. This seamless process allows you to earn rewards.",
    },
  ];

  return (
    <section className="bg-black/94 p-2 xl:p-6">
      <div className=" bg-black/60 max-w-6xl rounded-3xl shadow-inner shadow-white/40  xl:shadow-white/50 px-4 py-10 mx-auto space-y-10 xl:-translate-y-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" flex flex-col-reverse gap-5 md:flex-row max-w-6xl mx-auto text-white/70"
        >
          <div className="text-center md:flex-1 space-y-2 flex flex-col items-center max-w-sm mx-auto lg:mx-2">
            <div className="flex flex-col items-center md:items-start">
              <p className="text-xs  p-1 px-4  rounded-full capitalize tracking-widest border border-white/15">
                Survey<span className="text-[#00DCFF]"> Process</span>
              </p>
            </div>
            <h2 className=" md:text-2xl max-w-sm  font-bold">
              For Respondents
            </h2>
            <p className="max-w-2xl mx-auto text-gray-300  text-xs text-center  px-3 leading-relaxed">
              Respond to Surveys and Get Paid with $SURDA Tokens.
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
              How it Works
            </h2>
          </div>
        </motion.div>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row  gap-6">
          {/* Left Section */}
          <motion.div
            whileHover={{ scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center flex-1 max-w-md md:max-w-lg mx-auto  "
          >
            <div className=" bg-black rounded-2xl p-6 text-center lg:text-start border border-white/20">
              <div className="flex flex-col items-center lg:items-start mb-4">
                <div className="p-2 mt-2">
                  <img src={logo} alt="logo" className="w-8" />
                </div>
                <h3 className="font-semibold text-white border-b border-dashed md:border-b-2 border-b-sky-400">
                  For Respondents
                </h3>
              </div>
              <p className="text-gray-400 mb-4 text-sm">
                Respondents earn SURDA tokens by completing surveys. Once
                validated for accuracy, rewards are credited seamlessly —
                turning insights into instant value.
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

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="bg-white/6 rounded-2xl p-6 shadow-white/30 flex-1 flex flex-col justify-start pt-12 items-center text-center max-w-md md:max-w-lg mx-auto shadow-inner"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 0.95 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="text-blue-400 text-2xl font-bold p-3 px-6 rounded-full bg-white/10">
                {step.number}
              </div>
              <h3 className="text-lg text-white/70 my-1 font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SurveyWorks;
