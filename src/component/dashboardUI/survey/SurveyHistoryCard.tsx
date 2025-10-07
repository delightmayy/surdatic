import React from "react";
import { Link } from "react-router-dom";
import { FaVideo, FaCheck, FaUsers, FaStar } from "react-icons/fa";
import gift from "../../../img/surveyrewardicon.png";
import surdatoken from "../../../img/SurdaToken.png";
import {type Survey } from "../../../context/DataContext";


const SurveyHistoryCard: React.FC<{ survey: Survey }> = ({ survey }) => {
  return (
    <div className="bg-black/10 rounded-2xl shadow-inner shadow-white/10 p-2 flex flex-col">
      {/* Image Container */}
      <div className="relative rounded-2xl overflow-hidden mb-4">
        <img
          src={survey.image}
          alt="Survey"
          className="object-cover w-full h-52 rounded-2xl"
        />

        {/* Top-left Video Badge */}
         {survey.type === "Video" && (
          <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-4 py-1 rounded-full shadow-md flex items-center gap-2">
            <FaVideo size={30} className="p-2 rounded-full bg-white/20" /> 15
            mins
          </div>
        )} 

        {/* Bottom Completed Badge */}
        <div className="absolute bottom-2 left-5 bg-black/70 text-white text-xs px-4 py-2 rounded-md shadow-md flex items-center gap-2">
          <span>Completion Status:</span>
          <FaCheck
            size={30}
            className="p-2 rounded-md text-blue-500 border border-blue-500 bg-white/10"
          />
          <span className="text-blue-500 font-semibold">{survey.status.toLocaleLowerCase()}</span>
        </div>
      </div>

      {/* Text Content */}
      <div className="px-2 flex flex-col gap-2 text-white/90">
        <div className="text-xs max-w-fit text-white/90 p-2 mt-2 bg-white/10 rounded">
          Topic
        </div>
        <h3 className="text-sm font-semibold leading-snug line-clamp-3 mb-1">
          {survey.title}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-col gap-1 text-xs text-white/70 mt-2">
          <div className="bg-black/50 p-2 ps-6 flex items-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95 transition">
            <p className="text-xs text-white/90 font-semibold">Survey Type:</p>
            <FaUsers
              size={26}
              className="p-1 rounded-full text-blue-400 bg-white/10"
            />
            <p className="font-semibold text-blue-400">
              {survey.type === "Video" ? "Video Survey" : "Form Survey"}
            </p>
          </div>

          <div className="bg-black/50 p-2 ps-6 flex items-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95 transition">
            <p className="text-xs text-white/90 font-semibold">Status:</p>
            <FaStar
              size={26}
              className="p-1 rounded-full text-blue-400 bg-white/10"
            />
            <p className="font-semibold text-blue-400">{survey.status}</p>
          </div>

          <div className="bg-black/50 p-2 ps-6 flex items-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95 transition">
            <p className="text-xs text-white/90 font-semibold">Reward:</p>
            <p className="rounded-full bg-white/15 p-1">
              <img src={gift} alt="gift" className="w-5" />
            </p>
            <p className="font-semibold text-blue-500 flex items-center gap-1">
              <img src={surdatoken} alt="token" className="w-6" />{" "}
              {survey.cost} Tokens
            </p>
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/dashboard/analysis/${survey.id}`}
          state={{survey}}
          className="bg-blue-500 hover:bg-blue-400 mt-4 text-xs text-center w-full py-2 rounded-md transition"
        >
          Analyze
        </Link>
      </div>
    </div>
  );
};

export default SurveyHistoryCard;
