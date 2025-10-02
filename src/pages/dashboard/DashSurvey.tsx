import { motion } from "framer-motion";
import { FaClock } from "react-icons/fa";
import { FiPlusSquare } from "react-icons/fi";

import surdacoin from "../../img/tokenicon.png";
import { useContext, useState } from "react";
import KYCModal from "../../component/modal/KYCModal";
import OverviewCards from "../../component/dashboardUI/survey/OverviewCards";
import { Link } from "react-router-dom";
import DataContext, { type Survey } from "../../context/DataContext";
import CreateSurveyModal from "../../component/modal/CreateSurveyModal";

const DashSurvey = () => {
  const [availableTab, setAvailableTab] = useState("form");
  const [showKyc, setShowKyc] = useState(false);
  const [openCreateModal, setopenCreateModal] = useState(false);
  const {
    userSurveyList,
    participatedStats,
    validatedStats,
    createdStats,
    approvedSurveyListState,
    answeredSurveyList,
    overveiwTab,
    setOverveiwTab,
    surveyVideoCreated,
    surveyVideoParticipated,
    surveyVideoValidated,
  } = useContext(DataContext)!;

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-2 pb-24">
        {/* heading */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
          <div className="">
            <h1 className="text-2xl font-semibold">Surveys</h1>
            <p className="text-xs mt-1">
              Track your completed surveys, survey status, and monitor your
              progress
            </p>
          </div>
          <div className="flex items-center border-2 rounded-tl-xl  rounded-bl-xl border-white/20 mt-6 mt:pt-0  ">
            <button
              onClick={() => setShowKyc(true)}
              className="flex gap-1 items-center  sm:mt-0 px-4  py-2 rounded hover:bg-white/10 text-sm text-white"
            >
              Become a Validator
            </button>
            <button
              onClick={() => setopenCreateModal(true)}
              className="flex gap-1 items-center sm:mt-0 px-4 py-2  bg-sky-700 hover:bg-sky-600 text-sm text-white"
            >
              <FiPlusSquare size={18} />
              Create Survey
            </button>
          </div>
        </div>

        {/* Tabs */}

        <p className="my-2 font-bold tracking-wider">Survey Overview</p>
        <div className="flex space-x-6 text-xs border-t border-white/10 mb-6">
          <button
            onClick={() => setOverveiwTab("created")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              overveiwTab === "created"
                ? "border-sky-500 text-sky-500"
                : "text-white border-black/70"
            }`}
          >
            Created survey
          </button>
          <button
            onClick={() => setOverveiwTab("participated")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              overveiwTab === "participated"
                ? "border-sky-500 text-sky-500"
                : "text-white border-black/70"
            }`}
          >
            Survey Participated
          </button>
          <button
            onClick={() => setOverveiwTab("validated")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              overveiwTab === "validated"
                ? "border-sky-500 text-sky-500"
                : "text-white border-black/70"
            }`}
          >
            Validated Survey
          </button>
        </div>

        {/* Survey Overview Cards */}

        <OverviewCards
          data={
            overveiwTab === "created"
              ? createdStats
              : overveiwTab === "validated"
              ? validatedStats
              : participatedStats
          }
        />

        {/* Available Surveys Section */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Available Surveys</h3>
          <p className="text-sm text-white/55 mt-2 max-w-xl">
            Discover available surveys, share your insights, and earn SURDA
            tokens for every validated response.
          </p>
        </div>

        {/* Tabs */}

        <div className="flex space-x-6 text-xs border-t border-white/10 mb-6">
          <button
            onClick={() => setAvailableTab("form")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              availableTab === "form"
                ? "border-sky-500 text-sky-500"
                : "text-white border-black/70"
            }`}
          >
            Form Survey
          </button>
          <button
            onClick={() => setAvailableTab("video")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              availableTab === "video"
                ? "border-sky-500 text-sky-500"
                : "text-white border-black/70"
            }`}
          >
            Video Survey
          </button>
        </div>

        {/* Survey Form Cards Grid */}
        {availableTab === "form" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*  overviewcard for created */}
            {overveiwTab === "created" &&
              (userSurveyList.length === 0 ? (
                <div className="bg-white/5 p-6 w-full capitalize italic shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col text-center col-span-full ">
                  no survey available
                </div>
              ) : (
                userSurveyList.map((survey) => (
                  <Link
                    to={`/dashboard/surveys/${survey.title}`}
                    state={{ survey }}
                    key={survey.id}
                    className="bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col"
                  >
                    <img
                      src={survey.image}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />
                    <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                      <h3 className="text-xs mb-1 flex gap-2 items-center">
                        <FaClock size={14} /> {survey.fromDate}
                      </h3>
                      <p className="font-semibold text-sm mb-4">
                        {survey.title}
                      </p>
                      <div className="flex flex-wrap justify-between items-center mt-auto">
                        <div className="flex items-center gap-1 font-semibold">
                          <p className="font-light">Rewards:</p>
                          <img src={surdacoin} alt="reward" className="w-5" />
                          <span className="text-white/90">{survey.cost}</span>
                        </div>
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 cursor-pointer">
                          Buy Survey
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              ))}

            {/*  overviewcard for Validated */}
            {overveiwTab === "validated" &&
              (approvedSurveyListState.length === 0 ? (
                <div className="bg-white/5 p-6 w-full capitalize italic shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col text-center col-span-full">
                  no survey available
                </div>
              ) : (
                approvedSurveyListState.map((survey) => (
                  <Link
                    to={`/dashboard/surveys/${survey.title}`}
                    state={{ survey }}
                    key={survey.id}
                    className="bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col"
                  >
                    <img
                      src={survey.image}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />
                    <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                      <h3 className="text-xs mb-1 flex gap-2 items-center">
                        <FaClock size={14} /> {survey.fromDate}
                      </h3>
                      <p className="font-semibold text-sm mb-4">
                        {survey.title}
                      </p>
                      <div className="flex flex-wrap justify-between items-center mt-auto">
                        <div className="flex items-center gap-1 font-semibold">
                          <p className="font-light">Rewards:</p>
                          <img src={surdacoin} alt="reward" className="w-5" />
                          <span className="text-white/90">{survey.cost}</span>
                        </div>
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 cursor-pointer">
                          Buy Survey
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              ))}

            {/*  overviewcard for Validated */}
            {overveiwTab === "participated" &&
              (answeredSurveyList.length === 0 ? (
                <div className="bg-white/5 p-6 w-full capitalize italic shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col text-center col-span-full">
                  no survey available
                </div>
              ) : (
                answeredSurveyList.map((survey) => (
                  <Link
                    to={`/dashboard/surveys/${survey.title}`}
                    state={{ survey }}
                    key={survey.id}
                    className="bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col"
                  >
                    <img
                      src={survey.image}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />
                    <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                      <h3 className="text-xs mb-1 flex gap-2 items-center">
                        <FaClock size={14} /> {survey.fromDate}
                      </h3>
                      <p className="font-semibold text-sm mb-4">
                        {survey.title}
                      </p>
                      <div className="flex flex-wrap justify-between items-center mt-auto">
                        <div className="flex items-center gap-1 font-semibold">
                          <p className="font-light">Rewards:</p>
                          <img src={surdacoin} alt="reward" className="w-5" />
                          <span className="text-white/90">{survey.cost}</span>
                        </div>
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 cursor-pointer">
                          Buy Survey
                        </button>
                      </div>
                    </div>
                  </Link>
                ))
              ))}
          </div>
        )}

        {/* Survey Video Cards Grid */}
        {availableTab === "video" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {overveiwTab === "created" &&
              surveyVideoCreated.map((survey, idx) => (
                <Link
                  to={`/dashboard/videos/${survey.id}`}
                  key={idx}
                  className="bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={survey.frontImg}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />
                    <div className="absolute top-2 left-2 bg-black/50 rounded px-2 text-xs flex items-center gap-1 text-white">
                      <FaClock size={12} />
                      <span>{survey.duration || "15 Mins"}</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                    <p className="text-xs mb-1 text-white/60">{survey.date}</p>
                    <p className="font-semibold text-sm mb-4">{survey.title}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-1 font-semibold">
                        <p className="font-light">Reward:</p>
                        <img src={surdacoin} alt="reward" className="w-5" />
                        <span className="text-white/90">{survey.reward}</span>
                      </div>
                      <button className="bg-sky-700 text-white text-xs px-3 py-1 rounded-md hover:bg-sky-600 transition hover:scale-95 cursor-pointer flex items-center gap-1">
                        <FiPlusSquare size={16} />
                        Video Survey
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            {overveiwTab === "validated" &&
              surveyVideoValidated.map((survey, idx) => (
                <Link
                  to={`/dashboard/videos/${survey.id}`}
                  key={idx}
                  className="bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={survey.frontImg}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />
                    <div className="absolute top-2 left-2 bg-black/50 rounded px-2 text-xs flex items-center gap-1 text-white">
                      <FaClock size={12} />
                      <span>{survey.duration || "15 Mins"}</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                    <p className="text-xs mb-1 text-white/60">{survey.date}</p>
                    <p className="font-semibold text-sm mb-4">{survey.title}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-1 font-semibold">
                        <p className="font-light">Reward:</p>
                        <img src={surdacoin} alt="reward" className="w-5" />
                        <span className="text-white/90">{survey.reward}</span>
                      </div>
                      <button className="bg-sky-700 text-white text-xs px-3 py-1 rounded-md hover:bg-sky-600 transition hover:scale-95 cursor-pointer flex items-center gap-1">
                        <FiPlusSquare size={16} />
                        Video Survey
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            {overveiwTab === "participated" &&
              surveyVideoParticipated.map((survey, idx) => (
                <Link
                  to={`/dashboard/videos/${survey.id}`}
                  key={idx}
                  className="bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col"
                >
                  <div className="relative">
                    <img
                      src={survey.frontImg}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />
                    <div className="absolute top-2 left-2 bg-black/50 rounded px-2 text-xs flex items-center gap-1 text-white">
                      <FaClock size={12} />
                      <span>{survey.duration || "15 Mins"}</span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                    <p className="text-xs mb-1 text-white/60">{survey.date}</p>
                    <p className="font-semibold text-sm mb-4">{survey.title}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="flex items-center gap-1 font-semibold">
                        <p className="font-light">Reward:</p>
                        <img src={surdacoin} alt="reward" className="w-5" />
                        <span className="text-white/90">{survey.reward}</span>
                      </div>
                      <button className="bg-sky-700 text-white text-xs px-3 py-1 rounded-md hover:bg-sky-600 transition hover:scale-95 cursor-pointer flex items-center gap-1">
                        <FiPlusSquare size={16} />
                        Video Survey
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
      </div>

      {showKyc && <KYCModal onClose={() => setShowKyc(false)} />}
      {openCreateModal && (
        <CreateSurveyModal onClose={() => setopenCreateModal(false)} />
      )}
    </motion.main>
  );
};
export default DashSurvey;
