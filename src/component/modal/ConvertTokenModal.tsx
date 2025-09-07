import React from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";

interface ConvertTokenModalProps {
  onClose: () => void;
}

const ConvertTokenModal: React.FC<ConvertTokenModalProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div
        className="w-full max-w-lg bg-[#111] max-h-[85vh] overflow-y-auto border border-white/10 rounded-2xl shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-dashed border-b-white/20 pb-3">
          <div>
            <h2 className="text-xl font-semibold text-white">Convert Token</h2>
            <p className="text-sm text-white/50">
              Swap your tokens conveniently and effortlessly.
            </p>
          </div>
          <AiOutlineClose
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Convert From */}
        <div className="mt-6">
          <h3 className="text-sm text-white/80 mb-2">Convert From</h3>
          <div className="flex items-center justify-between px-4 py-3 bg-black/50 border border-white/10 rounded-md cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                src="/icons/surda.png"
                alt="Surda"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-white font-medium">Surda</span>
              <span className="text-xs text-white/50">Surda Token</span>
            </div>
            <FiChevronDown className="text-gray-400" />
          </div>

          <div className="mt-3 flex items-center px-3 py-2 bg-black/40 border border-white/10 rounded-md">
            <input
              type="number"
              placeholder="0.00"
              className="flex-1 bg-transparent text-white text-lg outline-none"
            />
            <button className="ml-2 px-3 py-1 text-xs bg-sky-600 text-white rounded">
              Max
            </button>
            <span className="ml-2 text-white/70">Surda</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Available: 500 546 SURDA
          </p>
        </div>

        {/* Convert To */}
        <div className="mt-6">
          <h3 className="text-sm text-white/80 mb-2">Convert To</h3>
          <div className="flex items-center justify-between px-4 py-3 bg-black/50 border border-white/10 rounded-md cursor-pointer">
            <div className="flex items-center gap-2">
              <img
                src="/icons/usdt.png"
                alt="ckUSDT"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-white font-medium">ckUSDT</span>
              <span className="text-xs text-white/50">ckUSDT</span>
            </div>
            <FiChevronDown className="text-gray-400" />
          </div>

          <div className="mt-3 flex items-center px-3 py-2 bg-black/40 border border-white/10 rounded-md">
            <input
              type="number"
              placeholder="0.00"
              className="flex-1 bg-transparent text-white text-lg outline-none"
            />
            <span className="ml-2 text-white/70">ckUSDT</span>
          </div>
        </div>

        {/* Conversion Info */}
        <div className="mt-6 text-sm space-y-1">
          <p className="text-gray-400">
            Conversion Rate:{" "}
            <span className="text-white">
              1 Surda = 0.004 ckUSDT
            </span>
          </p>
          <p className="text-gray-400">
            Amount to Receive:{" "}
            <span className="text-sky-400 font-medium">0.00 ckUSDT</span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Rate conversion reloading in{" "}
            <span className="text-sky-400 font-semibold">00:58</span>
          </p>
        </div>

        {/* Footer */}
        <button className="mt-6 w-full py-3 bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-md">
          Convert
        </button>
      </div>
    </motion.div>
  );
};

export default ConvertTokenModal;
