import { motion } from "framer-motion";
import { FaCircleXmark } from "react-icons/fa6";

interface ErrorModalProps {
  onClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ onClose, message }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        className="w-full max-w-md bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center gap-6 text-center relative"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="w-full border-b border-dashed border-white/20 pb-4">
          <h2 className="text-xl font-semibold text-white">Error</h2>
          <p className="text-xs text-white/50 mt-1">An Error Occured</p>
        </div>

        {/* error Icon */}
        <FaCircleXmark size={60} className="text-red-400 p-2 " />

        {/* Footer Text */}
        <div>
          <p className="text-2xl text-white/50 mt-1">{message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 w-full mt-4">
          <button
            className="flex-1 bg-white/10 hover:bg-white/20 py-2 rounded-md text-white text-sm transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorModal;
