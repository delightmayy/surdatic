// DashboardPage.tsx

import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaClock, FaEye, FaEyeSlash, FaSpinner, FaUsers } from "react-icons/fa";
import surdacoin from "../../img/tokenicon.png";
import earnbg from "../../img/daskearnbg.png";
import { FiPlusSquare } from "react-icons/fi";
import { useContext, useState } from "react";

import OverviewCards from "../../component/dashboardUI/survey/OverviewCards";
import DataContext from "../../context/DataContext";
import { Link } from "react-router-dom";
import CreateSurveyModal from "../../component/modal/CreateSurveyModal";
import { useAuth } from "../../api/useAuth";

const containerFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function DashboardHome() {
  const { becomeValidator } = useAuth();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const {
    surveyList,
    /* answeredSurveyList, */
    participatedStats,
    validatedStats,
    createdStats,
    overveiwTab,
    setOverveiwTab,
    totalEarnings,
    togleshow,
    SetTogleShow,
    loading,
  } = useContext(DataContext)!;

  const handleBecomeValidator = async () => {
    try {
      await becomeValidator();
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 pb-24 ">
        <div className="text-center sm:text-start px-2 pb-4">
          <p className="text-xl font-semibold">Dashboard Overview</p>
          <p className="text-sm text-white/55 mt-2">
            Track key metrics - A real-time snapshot of your survey’s activities
            and earnings.
          </p>
        </div>

        {/* Dashboard Overview Banner */}
        <motion.section
          variants={containerFade}
          initial="hidden"
          animate="visible"
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-r from-violet-700/40 via-indigo-600/30 to-sky-600/30 py-6 md:py-7"
          style={{
            backgroundImage: `url(${earnbg})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          <div className="flex flex-col gap-4 py-6 lg:py-0">
            <div className="flex flex-col lg:flex-row justify-between items-center  px-6 gap-2 sm:gap-0">
              <h3 className=" flex items-center gap-2 text-white/80 text-sm mb-3 lg:mb-0 font-semibold">
                Total Earnings
                <span
                  onClick={() => SetTogleShow((prev) => !prev)}
                  className=" cursor-pointer"
                >
                  {togleshow ? (
                    <FaEye size={20} className="text-blue-500" />
                  ) : (
                    <FaEyeSlash size={20} className="text-blue-500" />
                  )}
                </span>
              </h3>
              <div className="flex w-full sm:w-auto flex-col sm:flex-row items-center gap-3 bg-black/90 rounded-3xl p-6 sm:p-1 sm:rounded-sm">
                <button
                  onClick={() => handleBecomeValidator()}
                  className="px-4 py-2 rounded-sm bg-white/10 hover:bg-white/15 text-sm cursor-pointer min-w-34 sm:min-w-0 "
                >
                  Become a Verifier
                </button>
                <Link
                  to={"/dashboard/surveys"}
                  className="px-4 py-2 rounded-sm flex gap-1 items-center bg-white/90 hover:bg-white/70 text-sm cursor-pointer text-black min-w-34 sm:min-w-0"
                >
                  <FaUsers size={20} />
                  Take Survey
                </Link>
                <button
                  onClick={() => setOpenCreateModal(true)}
                  className="flex gap-1 px-4 py-2 items-center rounded-sm bg-sky-500/70 hover:bg-sky-600 text-sm cursor-pointer text-black min-w-34 sm:min-w-0"
                >
                  <FiPlusSquare size={20} />
                  Create Survey
                </button>
              </div>
            </div>
            <div className="bg-black/50 text-center lg:text-start  px-6">
              <p className="mt-1 pt-1 text-3xl md:text-4xl font-extrabold tracking-tight">
                {togleshow ? totalEarnings.toLocaleString() : "*****"}
              </p>
              <p className=" pb-6 text-white/60 text-xs  mt-2 max-w-lg mx-auto lg:mx-0">
                Keep up the great work! Your earnings represent your survey
                participation and task completions.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Tabs */}

        <p className="my-2 font-bold tracking-wider">Survey Overview</p>
        <div className="flex space-x-6 text-xs border-t border-white/10 mb-6">
          <button
            onClick={() => setOverveiwTab("created")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              overveiwTab === "created"
                ? "border-sky-500 text-sky-500"
                : "border-black/70 text-white"
            }`}
          >
            Created survey
          </button>
          <button
            onClick={() => setOverveiwTab("participated")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              overveiwTab === "participated"
                ? "border-sky-500 text-sky-500"
                : "border-black/70 text-white"
            }`}
          >
            Survey Participated
          </button>
          <button
            onClick={() => setOverveiwTab("validated")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              overveiwTab === "validated"
                ? "border-sky-500 text-sky-500"
                : "border-black/70 text-white"
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
        {/* Available surveys + Carousel */}
        <motion.section
          variants={containerFade}
          initial="hidden"
          animate="visible"
          className="mt-8 md:hidden"
        >
          <div className="p-2 text-center sm:text-start">
            <h3 className="text-lg font-semibold">Available surveys</h3>
            <p className="text-sm text-white/55 mt-2">
              Discover available surveys, share your insights, and earn SURDA
              tokens for every validated response
            </p>
          </div>

          <div className="mt-4">
            <Slider
              dots
              arrows={false}
              infinite
              autoplay
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1280, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } },
              ]}
            >
              {surveyList.map((survey, idx) => (
                <div key={idx} className="px-2">
                  <Link
                    to={`/dashboard/surveys/${survey.title}`}
                    state={{ survey }}
                    key={survey.id}
                    className="cursor-pointer bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none
                         flex flex-col flex-shrink-0 mx-auto  sm:w-auto min-h-96 max-w-sm"
                  >
                    <img
                      src={survey.image}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />

                    <div className="p-4 flex flex-col justify-between  text-white/50 flex-grow">
                      <h3 className="  text-xs mb-1 flex gap-2 items-center">
                        <FaClock size={14} /> {survey.fromDate}{" "}
                      </h3>
                      <p className=" font-semibold text-sm md:text-sm mb-4">
                        {survey.title}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap items-center gap-1  font-semibold">
                          <p className="font-light">Rewards:</p>
                          <img
                            src={surdacoin}
                            alt="reward"
                            className="w-5"
                          />{" "}
                          <span className="text-white/90"></span>
                          {survey.cost}
                        </div>
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 cursor-pointer">
                          Buy Survey
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </motion.section>

        {/* Available surveys + Carousel */}
        <motion.section
          variants={containerFade}
          initial="hidden"
          animate="visible"
          className="mt-8 hidden md:block"
        >
          <div className="p-2 text-center sm:text-start">
            <h3 className="text-lg font-semibold">Available surveys</h3>
            <p className="text-sm text-white/55 mt-2">
              Discover available surveys, share your insights, and earn SURDA
              tokens for every validated response
            </p>
          </div>

          <div className="mt-4">
            <Slider
              dots={true}
              arrows={false}
              infinite
              autoplay
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1280, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } },
              ]}
            >
              {surveyList.map((survey, idx) => (
                <div key={idx} className="px-2">
                  <Link
                    to={`/dashboard/surveys/${survey.title}`}
                    state={{ survey }}
                    key={survey.id}
                    className="cursor-pointer bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none
                         flex flex-col flex-shrink-0 mx-auto  sm:w-auto min-h-96 lg max-w-sm"
                  >
                    <img
                      src={survey.image}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />

                    <div className="p-4 flex flex-col justify-between  text-white/50 flex-grow">
                      <h3 className="  text-xs mb-1 flex gap-2 items-center">
                        <FaClock size={14} /> {survey.fromDate}
                      </h3>
                      <p className=" font-semibold text-sm md:text-sm mb-4">
                        {survey.title}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex flex-wrap items-center gap-1  font-semibold">
                          <p className="font-light">Rewards:</p>
                          <img
                            src={surdacoin}
                            alt="reward"
                            className="w-5"
                          />{" "}
                          <span className="text-white/90"></span>
                          {survey.cost}
                        </div>
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 cursor-pointer">
                          Buy Survey
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </motion.section>

        {loading && (
          <div className="flex items-center justify-center pt-8  h-full">
            <FaSpinner size={30} className="animate-spin text-white/30 " />
          </div>
        )}
      </div>
      {openCreateModal && (
        <CreateSurveyModal onClose={() => setOpenCreateModal(false)} />
      )}
    </motion.main>
  );
}
