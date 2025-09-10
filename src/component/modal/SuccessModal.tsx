import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import surdaToken from "../../img/SurdaToken.png"; // Adjust the path
import checkBadge from "../../img/succesimg.png"; // Replace with the actual success check badge image
import { Link } from "react-router-dom";

interface SurveySuccessModalProps {
  onClose: () => void;
  title: string;
  subtitle: string;
  rewardAmount: number;
  titleB: string;
  subtitleB: string;
}

const SurveySuccessModal:React.FC <SurveySuccessModalProps>  = ({
  onClose,
  title,
  subtitle,
  rewardAmount,
  titleB,
  subtitleB,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        className="w-full max-w-md bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center gap-6 text-center relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/70 hover:text-white"
        >
          <AiOutlineClose size={20} />
        </button>

        {/* Header */}
        <div className="w-full border-b border-dashed border-white/20 pb-4">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-xs text-white/50 mt-1">{subtitle}</p>
        </div>

        {/* Success Icon */}
        <img src={checkBadge} alt="Success" className="w-20 h-20" />

        {/* Reward */}
        {rewardAmount && (
          <div className="flex items-center gap-2 text-2xl font-semibold text-white">
            <img src={surdaToken} alt="Surda Token" className="w-8 h-8" />
            <span>{rewardAmount} Surda</span>
          </div>
        )}

        {/* Footer Text */}
        <div>
          <h3 className="text-sm font-medium text-white"> {titleB}</h3>
          <p className="text-xs text-white/50 mt-1">{subtitleB}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full mt-4">
          <button
            className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-md text-white text-sm transition"
            onClick={onClose}
          >
            More Surveys
          </button>
          <Link to={"/dashboard/wallet"} className="flex-1 bg-sky-600 hover:bg-sky-500 py-2 rounded-md text-white text-sm transition">
            Wallet
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default SurveySuccessModal;
