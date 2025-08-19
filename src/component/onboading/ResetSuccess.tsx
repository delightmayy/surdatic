import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ResetSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <motion.div
        className="bg-[#111111] p-10 rounded-lg text-center w-full max-w-md"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <FaCheckCircle className="text-blue-500 text-5xl mb-4 mx-auto" />
        <h2 className="text-xl font-semibold mb-2 text-green-400">
          Congratulations.
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Your password has been reset. Please proceed to login.
        </p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-700 transition py-2 px-6 rounded font-semibold"
        >
          Proceed
        </button>
      </motion.div>
    </div>
  );
};
export default ResetSuccess;
