import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Left Side */}
      <div className="md:w-1/2 flex flex-col justify-center items-center text-center p-10">
        <motion.img
          src="/dummy-logo.png"
          alt="Surdatics Logo"
          className="w-16 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        />
        <h1 className="text-2xl font-semibold">SURDATICS</h1>
        <p className="text-sm text-blue-400 mt-1">Surdatics Onboarding</p>
        <h2 className="text-xl mt-8 font-medium">Get Started In Minutes</h2>
        <p className="text-gray-400 mt-2">
          Join, verify, and start earning through surveys.
        </p>
      </div>

      {/* Right Side */}
      <div className="md:w-1/2 flex items-center justify-center p-6">
        <motion.form
          className="bg-[#111111] p-8 rounded-lg w-full max-w-md shadow-lg"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold mb-4">Create your account!</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-1/2 p-2 bg-[#1a1a1a] rounded text-sm"
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-1/2 p-2 bg-[#1a1a1a] rounded text-sm"
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full p-2 mb-4 bg-[#1a1a1a] rounded text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-4 bg-[#1a1a1a] rounded text-sm"
          />
          <select className="w-full p-2 mb-4 bg-[#1a1a1a] rounded text-sm">
            <option>Choose your country</option>
          </select>
          <div className="flex items-center mb-4 text-sm">
            <input type="checkbox" className="mr-2" />
            <label>
              I have read and agree to the{" "}
              <span className="text-blue-500 underline">Terms</span> and{" "}
              <span className="text-blue-500 underline">Privacy Policy</span>
            </label>
          </div>
          <button
            type="submit"
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 hover:bg-blue-700 transition py-2 rounded font-semibold"
          >
            Done
          </button>
          <p className="mt-4 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <span 
             onClick={() => navigate("/login")}
            className="text-blue-500 underline cursor-pointer">
              Sign In
            </span>
          </p>
        </motion.form>
      </div>
    </div>
  );
};
export default Register;
