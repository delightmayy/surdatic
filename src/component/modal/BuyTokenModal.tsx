import React from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import { FaWallet, FaCreditCard, FaExchangeAlt } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";

interface BuyTokenModalProps {
    onBuywithCard:()=> void
  onClose: () => void;
}

const BuyTokenModal: React.FC<BuyTokenModalProps> = ({ onClose , onBuywithCard}) => {
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
            <h2 className="text-xl font-semibold text-white">Buy Token</h2>
            <p className="text-sm text-white/50">
              Buy any token using the most convenient methods for you.
            </p>
          </div>
          <AiOutlineClose
            size={22}
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Token Selection */}
        <div className="mt-6 flex flex-col text-sm">
          <label className="text-white/70 mb-1">Token to Buy</label>
          <div className="flex items-center justify-between px-4 py-3 rounded-md bg-black/50 border border-white/10 text-white cursor-pointer">
            <div className="flex items-center gap-2">
              <img src="/icons/surda.png" alt="Surda" className="w-6 h-6 rounded-full" />
              <span className="font-medium">Surda</span>
              <span className="text-xs text-white/50">Surda Token</span>
            </div>
            <FiChevronDown className="text-gray-400" />
          </div>
        </div>

        {/* Purchase Method */}
        <div className="mt-6 flex flex-col gap-3">
          <label className="text-white/70 mb-2">Purchase Method</label>

          <button className="flex items-center gap-3 px-4 py-3 bg-black/60 border border-sky-500/70 rounded-md text-white hover:bg-black/80">
            <FaWallet className="text-sky-400" size={18} />
            <span>Lisk Mainnet</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 bg-black/50 border border-white/10 rounded-md text-white hover:bg-black/70">
            <HiUsers className="text-green-400" size={18} />
            <span>P2P Marketplace</span>
          </button>

          <button
          onClick={onBuywithCard} className="flex items-center gap-3 px-4 py-3 bg-black/50 border border-white/10 rounded-md text-white hover:bg-black/70">
            <FaCreditCard className="text-purple-400" size={18} />
            <span>Buy with Card</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 bg-black/50 border border-white/10 rounded-md text-white hover:bg-black/70">
            <FaExchangeAlt className="text-yellow-400" size={18} />
            <span>Other Platforms</span>
          </button>
        </div>

        {/* Checkbox Option */}
        <div className="mt-6 flex items-center justify-center gap-2">
         <FaWallet size={18}/>
          <label htmlFor="externalWallet" className="text-sm text-white/80">
            Receive from External Wallet
          </label>
        </div>
      </div>
    </motion.div>
  );
};

export default BuyTokenModal;
