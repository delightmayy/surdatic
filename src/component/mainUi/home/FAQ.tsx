import { motion } from "framer-motion";
import React, { useState } from "react";
import titlebg from "../../../img/titlebg.png";

const faqs = [
  {
    question: "What is Surdatics?",
    answer:
      "Surdatics is an innovative, blockchain and AI-powered research platform that connects researchers, businesses, and individuals.",
  },
  {
    question:
      "What is Surdatics’s API, and how can it benefit my organization?",
    answer:
      "Surdatics’s API provides seamless integration for data analysis, research sharing, and collaboration with enterprise-grade features.",
  },
  {
    question: "How does Surdatics’s referral program work?",
    answer:
      "Earn tokens by referring researchers and organizations to the platform. Track rewards directly from your dashboard.",
  },
  {
    question: "How is Surdatics beneficial for students and researchers?",
    answer:
      "Surdatics gives access to research datasets, tools for publishing, and collaborative AI solutions for data-driven projects.",
  },
  {
    question: "How does the Surdatics platform ensure the quality of data?",
    answer:
      "Quality is ensured using AI validation, peer-review systems, and blockchain-backed traceability.",
  },
  {
    question: "How can I buy the Surdatics ($SURDA) token?",
    answer:
      "You can purchase $SURDA via supported exchanges listed on the Surdatics platform with secure wallet integration.",
  },
  {
    question: "What is the Surdatics Data NFT Marketplace?",
    answer:
      "It is a platform where verified datasets are minted as NFTs, enabling secure ownership, sharing, and monetization.",
  },
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="w-full px-6 py-12 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col px-4 sm-px-6 lg:px-2  gap-8">
        {/* FAQ Content */}
        <div className="flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className=" flex flex-col-reverse gap-5 md:flex-row max-w-6xl mx-auto my-6"
          >
            <div className="text-center md:flex-1 space-y-2 flex flex-col items-center max-w-sm mx-auto lg:mx-2">
              <div className="flex flex-col items-center md:items-start">
                <p className="text-xs  p-1 px-4  rounded-full capitalize tracking-widest border border-white/15">
                  Popular <span className="text-[#00DCFF]">Questions</span>
                </p>
              </div>
              <h2 className=" md:text-2xl max-w-sm  font-bold">FAQ’s</h2>
              <p className="max-w-2xl mx-auto text-gray-300  text-xs text-center  px-3 leading-relaxed">
                Explore our most frequently asked questions to learn how to get
                the most out of your Surda tokens.
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

          <div className="space-y-3 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-white/20 rounded-md">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-4 py-4 flex justify-between items-center"
                >
                  <span className=" text-sm md:text-base text-white/80 font-medium">
                    {faq.question}
                  </span>
                  <span className=" text-base md:text-xl text-blue-400">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-4 pb-4 text-white/30 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Image or Visual Side 
        <div className="flex-1 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/400x400?text=Surdatics+Image"
            alt="Surdatics Illustration"
            className="w-full max-w-sm rounded-lg shadow-lg object-cover"
          />
        </div> */}
      </div>
    </section>
  );
};

export default FAQ;
