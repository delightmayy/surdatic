import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import img from "../../img/onboardingimg.png";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useAuth } from "../../api/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(formData.email, formData.password);

      setLoading(false);
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err: any) {
      setLoading(false);
      /* console.log(err);
       */
      setError(
        err.response?.data?.data ||
          err.message ||
          "Login failed. Please try again."
      );
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
            onSubmit={handleLogin}
          >
            <h2 className="text-2xl font-semibold text-center">
              Sign In To Your Account
            </h2>
            <p className="text-sm text-gray-400 text-center">
              Welcome, provide your login details below to sign in to your
              account.
            </p>

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
            <div className="flex flex-col relative">
              <label className="text-sm mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none transition-all focus:ring-1 focus:ring-sky-500/30"
                required
                value={formData.password}
                onChange={handleChange}
              />
              <span
                className="absolute right-3 top-10 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  /*   onChange={() => setAutoLogin(true)} */
                  className="accent-sky-500"
                />
                Remember me
              </label>
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-sky-400 underline cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>

            {/* Show error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-sky-500/60 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md flex items-center justify-center gap-2 disabled:opacity-30"
            >
              {loading ? "Signing In" : "Done"}{" "}
              {loading && <FaSpinner className="animate-spin" />}
            </button>

            {/* Footer Link */}
            <p className="mt-4 text-sm text-center text-gray-400">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-sky-400 underline cursor-pointer"
              >
                Sign Up
              </span>
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Login;
