import React from "react";
import { FaClock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

interface VideoSurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
  survey: {
    id: string;
    title: string;
    frontImg: string;
    duration: string;
  };
  onTakeSurvey: () => void;
}

const VideoSurveyModal: React.FC<VideoSurveyModalProps> = ({
  isOpen,
  onClose,
  survey,
  onTakeSurvey,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black/90 border border-white/10 rounded-2xl w-full max-w-md p-6 relative shadow-lg shadow-black/40">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white/50 hover:text-white"
        >
          <IoClose size={22} />
        </button>

        {/* Modal Title */}
        <h2 className="text-lg font-semibold text-white mb-4">Video Survey</h2>
        <p className="text-xs text-white/60 mb-6">
          Access your survey directly with your unique link
        </p>

        {/* Survey Card */}
        <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden shadow-md mb-6">
          <img
            src={survey.frontImg}
            alt={survey.title}
            className="w-full h-40 object-cover rounded-b-xl"
          />
          <div className="p-4">
            <p className="text-xs text-blue-400 mb-1 flex gap-1 items-center"><FaClock/> <span className="text-white/65">{survey.duration}</span> </p>
            <h3 className="text-sm font-semibold text-white/90">
              {survey.title}
            </h3>
          </div>
        </div>

        {/* Input */}
        <div className="mb-6">
          <label className="block text-xs text-white/70 mb-2">Video Link</label>
          <input
            type="text"
            placeholder="Enter your unique video link here"
            className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-sm text-white placeholder-white/30 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Info Text */}
        <p className="text-xs text-white/60 mb-4">
          This survey is slated to last for <b>{survey.duration}</b> at most
        </p>

        {/* CTA Button */}
        <button
          onClick={onTakeSurvey}
          className="w-full bg-blue-400  text-black hover:bg-blue-500 hover:to-blue-800 py-2 cursor-pointer rounded-lg text-sm font-semibold "
        >
          Take Survey
        </button>
      </div>
    </div>
  );
};

export default VideoSurveyModal;
