"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import success from "../../img/succesimg.png";

const ResetSuccess = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-black min-h-screen flex items-center justify-center text-white relative px-6">
      {/* Background Blurs */}
      <div className="absolute top-10 left-10 bg-cyan-300/70 p-20 blur-[100px]"></div>
      <div className="absolute bottom-10 right-10 bg-cyan-300/50 p-20 blur-[100px]"></div>

      <motion.div
        className="w-full max-w-xl flex flex-col gap-4 px-6 py-10 text-center relative z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <img src={success} alt="..." className="w-20 mb-4 mx-auto" />
        <h2 className="text-2xl font-semibold mb-2 text-sky-600">
          Congratulations
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Your password has been reset successfully. Please proceed to login.
        </p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="bg-sky-500/60 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 px-8 rounded-md"
        >
          Proceed
        </button>
      </motion.div>
    </section>
  );
};

export default ResetSuccess;
