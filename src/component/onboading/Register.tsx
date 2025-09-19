"use client";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img from "../../img/onboardingimg.png";
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import OtpModal from "../modal/OTPModal";

const Register = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const registerInfo = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        // add country here if backend expects it
      };
      const response = await axios.post(
        "https://api.surdatics.com/auth/register", // confirm correct URL
        registerInfo
      );

      setLoading(false);
      // Success — redirect to login page
       response.status && setOpenModal(true);
    } catch (err: any) {
      setLoading(false);
      setOpenModal(true)
      setError(
        err.response?.data ||
          err.message ||
          "Failed to register. Please try again."
      );
      console.log(err);
    }
  };

  return (
    <section className="bg-black min-h-screen flex flex-col md:flex-row text-white relative">
      {/* Background Blurs */}
      <div className="absolute top-10 left-10 bg-cyan-300/70 p-20 blur-[100px]"></div>
      <div className="absolute bottom-10 right-10 bg-cyan-300/50 p-20 blur-[100px]"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:justify-between lg:gap-10 w-full px-6">
        {/* Left Side */}
        <div className="lg:w-2/5 flex flex-col justify-center items-center text-center py-16 relative z-10">
          <motion.img
            src={img}
            alt="Surdatics Onboarding"
            className="w-40 lg:w-48 mb-4 mt-12 lg:mt-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          />
          <h2 className="text-xl lg:mt-14 mt-8 font-medium">
            Get Started In Minutes
          </h2>
          <p className="text-gray-400 mt-2">
            Join, verify, and start earning through surveys.
          </p>
        </div>

        {/* Right Side */}
        <div className="lg:w-3/5 flex items-center justify-center py-10 relative z-10">
          <motion.form
            className="w-full max-w-xl bg-white/5 border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleRegister}
          >
            <h2 className="text-2xl font-semibold text-center">
              Create your account!
            </h2>

            {/* Name Fields */}
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex-1 flex flex-col">
                <label className="text-sm mb-1">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter your first name"
                  className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none transition-all focus:ring-1 focus:ring-sky-500/30"
                  required
                  value={formData.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex-1 flex flex-col">
                <label className="text-sm mb-1">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Enter your last name"
                  className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none transition-all focus:ring-1 focus:ring-sky-500/30"
                  required
                  value={formData.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none transition-all focus:ring-1 focus:ring-sky-500/30"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none transition-all focus:ring-1 focus:ring-sky-500/30"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div className="flex flex-col">
              <label className="text-sm mb-1">Country</label>
              <select
                name="country"
                className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none transition-all focus:ring-1 focus:ring-sky-500/30"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Choose your country</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                {/* Add more countries as needed */}
              </select>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-1 accent-sky-500"
                onChange={(e) => e.target.checked && setCheck(true)}
                required
              />
              <label>
                I have read and agree to the{" "}
                <span className="text-sky-400 underline cursor-pointer">
                  Terms
                </span>{" "}
                and{" "}
                <span className="text-sky-400 underline cursor-pointer">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* Show error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={!check || loading}
              className="bg-sky-500/60 hover:bg-sky-600 items-center justify-center flex gap-1 transition-all text-white text-sm font-medium py-3 rounded-md disabled:opacity-20"
            >
              {loading ? "Registering" : "Done"} {loading && <FaSpinner className="animate-spin" />}
            </button>

            {/* Footer Link */}
            <p className="mt-4 text-sm text-center text-gray-400">
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="text-sky-400 underline cursor-pointer"
              >
                Sign In
              </span>
            </p>
          </motion.form>
        </div>
        {openModal && (
          <OtpModal
            email={formData.email}
            onClose={() => setOpenModal(false)}
          />
        )}
      </div>
    </section>
  );
};

export default Register;
