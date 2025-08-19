

import { motion } from "framer-motion";
import { FaUserPlus, FaIdCard, FaGift } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: <FaUserPlus className="text-3xl text-blue-500" />,
    title: "Sign-Up",
    description: "Create your free account on $SURDATICS.",
  },
  {
    id: 2,
    icon: <FaIdCard className="text-3xl text-blue-500" />,
    title: "Verify Identity",
    description: "Complete the KYC process to ensure security and eligibility.",
  },
  {
    id: 3,
    icon: <FaGift className="text-3xl text-blue-500" />,
    title: "Claim Tokens",
    description: "Follow the instructions to claim your free $SURDA tokens.",
  },
];

const SurdaClaim = () => {
  return (
    <section className="bg-black text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          How To Claim Your Free $SURDA Tokens
        </motion.h2>
        <p className="text-gray-400 mb-12">
          Respond to Surveys and Get Paid with $SURDA Tokens
        </p>

        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="bg-[#111111] rounded-xl p-6 flex-1 text-center shadow-lg hover:shadow-blue-500/30 transition"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 + index * 0.2 }}
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="mt-12 bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-md font-medium"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Claim Free $Surda
        </motion.button>
      </div>
    </section>
  );
}
export default SurdaClaim