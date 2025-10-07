import { FaArrowLeft } from "react-icons/fa";
import { FaArrowDownShortWide, FaArrowRightLong } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import SurveyHistoryCard from "./SurveyHistoryCard";
import { useState, useMemo } from "react";
import { type Survey } from "../../../context/DataContext";

const SurveyOverviewHistory = () => {
  
  const { state } = useLocation();
  const navigate = useNavigate();
 /*  console.log("this is it", state); */

  const [activeFilter, setActivefilter] = useState<"All" | "7Days" | "30Days">(
    "All"
  );
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filtered surveys based on date
  const filteredSurveys = useMemo(() => {
    if (!state) return [];

    const today = new Date();

    if (activeFilter === "7Days") {
      return state.filter((survey: Survey) => {
        const surveyDate = new Date(survey.fromDate);
        const diffDays =
          (today.getTime() - surveyDate.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= 7;
      });
    }

    if (activeFilter === "30Days") {
      return state.filter((survey: Survey) => {
        const surveyDate = new Date(survey.fromDate);
        const diffDays =
          (today.getTime() - surveyDate.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays <= 30;
      });
    }

    // Default: show all
    return state;
  }, [state, activeFilter]);

  return (
    <div className="text-white px-4 pt-4 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-2">Survey History</h1>
      <p className="text-sm text-white/60">
        Track your completed surveys, survey status, and monitor your progress
      </p>

      {/* Navigation & Filter */}
      <div className="justify-between p-2 my-2 mb-6 border border-white/10 flex items-center shadow shadow-white/20 gap-2">
        <div className="flex items-center gap-1">
          <p
            onClick={() => navigate(-1)}
            className="text-xs cursor-pointer text-white/40 flex gap-1 items-center font-semibold"
          >
            <FaArrowLeft
              size={28}
              className="p-2 rounded-full shadow-inner shadow-white/40"
            />
            Created Survey
          </p>
          <p className="text-xs font-semibold text-white/90 flex gap-1 items-center">
            <FaArrowRightLong size={20} className="h-4 text-white/60" />
            History
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            className="text-xs px-3 py-1 rounded text-white/70 cursor-pointer hover:text-white/90 flex items-center gap-1"
            onClick={() => setShowFilterDropdown(!showFilterDropdown)}
          >
            <FaArrowDownShortWide />
            Sort
          </button>

          {showFilterDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-black border border-white/10 rounded shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-white/10"
                onClick={() => {
                  setActivefilter("7Days");
                  setShowFilterDropdown(false);
                }}
              >
                Last 7 Days
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-white/10"
                onClick={() => {
                  setActivefilter("30Days");
                  setShowFilterDropdown(false);
                }}
              >
                Last 30 Days
              </button>
              <button
                className="w-full text-left px-4 py-2 text-sm hover:bg-white/10"
                onClick={() => {
                  setActivefilter("All");
                  setShowFilterDropdown(false);
                }}
              >
                All Time
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurveys.length === 0 ? (
          <div className="bg-white/5 p-6 w-full capitalize italic shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col text-center col-span-full">
            no survey available
          </div>
        ) : (
          filteredSurveys.map((s: Survey) => (
            <SurveyHistoryCard survey={s} key={s.id} />
          ))
        )}
      </div>
    </div>
  );
};

export default SurveyOverviewHistory;
