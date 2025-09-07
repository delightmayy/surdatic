
import { motion } from "framer-motion";
import cardimg1 from "../../img/card1img.png";
import { FaClock} from "react-icons/fa";
import { FiPlusSquare, FiRepeat } from "react-icons/fi";
import { FaCheck, FaXmark } from "react-icons/fa6";
import surdacoin from "../../img/tokenicon.png";



const surveys = Array(6).fill({
  frontImg: cardimg1,
  title:
    "Examining Safety Compliance rate among senior managers in corporate organisations in Nigeria",
  date: "58D 17H 03M",
  reward: 75,
});

const DashSurvey = () => {
  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24">
        {/* Top bar with title and button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Surveys</h1>
          <button className="flex gap-1 items-center mt-4 sm:mt-0 px-4 py-2 rounded bg-sky-600 hover:bg-sky-700 text-sm text-white">
            <FiPlusSquare size={18} />
            Create Survey
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 border-b border-white/10 mb-6">
          <button className="pb-2 border-b-2 border-sky-500 text-white font-semibold">
            Survey Overview
          </button>
          <button className="pb-2 text-white/50 hover:text-white transition">
            Survey Performance
          </button>
        </div>

        {/* Survey Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex justify-between items-center">
              <p className="text-white/70 text-sm">Pending Survey</p>
              <span className="p-1 rounded bg-amber-400">
                <FiRepeat size={16} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold">06</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex justify-between items-center">
              <p className="text-white/70 text-sm">Completed Survey</p>
              <span className="p-1 rounded bg-emerald-500">
                <FaCheck size={16} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold">18</p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex justify-between items-center">
              <p className="text-white/70 text-sm">Rejected Survey</p>
              <span className="p-1 rounded bg-rose-600">
                <FaXmark size={16} />
              </span>
            </div>
            <p className="mt-4 text-3xl font-semibold">02</p>
          </div>
        </div>

        {/* Available Surveys Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Available Surveys</h3>
          <p className="text-sm text-white/55 mt-2 max-w-xl">
            Discover available surveys, share your insights, and earn SURDA tokens for every validated response.
          </p>
        </div>

        {/* Survey Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {surveys.map((survey, idx) => (
            <div
              key={idx}
              className="bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col"
            >
              <img
                src={survey.frontImg}
                alt="card"
                className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
              />
              <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                <h3 className="text-xs mb-1 flex gap-2 items-center">
                  <FaClock size={14} /> {survey.date}
                </h3>
                <p className="font-semibold text-sm mb-4">{survey.title}</p>
                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center gap-1 font-semibold">
                    <p className="font-light">Rewards:</p>
                    <img src={surdacoin} alt="reward" className="w-5" />
                    <span className="text-white/90">{survey.reward}</span>
                  </div>
                  <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 cursor-pointer">
                    Buy Survey
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.main>
  );
}
export default DashSurvey