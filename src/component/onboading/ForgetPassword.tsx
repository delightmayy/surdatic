import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
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
          <h2 className="text-xl font-semibold mb-4">Forgot your password?</h2>
          <p className="text-sm text-gray-400 mb-4">
            Enter your registered email to receive a password reset link.
          </p>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 mb-6 bg-[#1a1a1a] rounded text-sm"
          />
          <button
            type="submit"
            onClick={() => navigate("/reset-password")}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded font-semibold"
          >
            Proceed
          </button>
          <p className="mt-4 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 underline cursor-pointer"
            >
              Sign In
            </span>
          </p>
        </motion.form>
      </div>
    </div>
  );
};
export default ForgotPassword;
