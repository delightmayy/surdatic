import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Left */}
      <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-10">
        <img src="/dummy-logo.png" alt="Logo" className="w-16 mb-4" />
        <h1 className="text-2xl font-semibold">SURDATICS</h1>
        <p className="text-sm text-blue-400">Surdatics Onboarding</p>
        <h2 className="text-xl mt-8 font-medium">Get Started In Minutes</h2>
        <p className="text-gray-400 mt-2">
          Join, verify, and start earning through surveys.
        </p>
      </div>

      {/* Right */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <motion.form
          className="bg-[#111111] p-8 rounded-lg w-full max-w-md shadow-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-xl font-semibold mb-4">Set new password</h2>
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 mb-4 bg-[#1a1a1a] rounded text-sm"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2 mb-6 bg-[#1a1a1a] rounded text-sm"
          />
          <button
            type="submit"
            onClick={() => navigate("/reset-success")}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded font-semibold"
          >
            Proceed
          </button>
        </motion.form>
      </div>
    </div>
  );
};
export default ResetPassword;
