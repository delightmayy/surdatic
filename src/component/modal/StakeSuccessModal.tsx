import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import success from "../../img/succesimg.png";
import { motion } from "framer-motion";

interface StakeProps {
  onClose: () => void;
  /* onStake: (data: {
    plan: "Flexible" | "Locked";
    period: string;
    amount: number;
  }) => void | Promise<void>; */
}

const StakeSuccessModal: React.FC<StakeProps> = ({ onClose /* onStake */ }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center gap-6 text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className=" flex  w-full justify-between border-b-2 border-dashed border-b-white/30">
          <div className="mb-4">
            <h2 className="text-xl tracking-wider font-semibold text-white ">Stake Successful</h2>
           
          </div>

          <AiOutlineClose size={24} className="" onClick={onClose} />
        </div>
        <img src={success} alt="..." className="w-20 mb-4 mx-auto" />
        <h2 className="text-xl font-semibold text-white">Stake Successful</h2>
        <p className="text-sm text-gray-400">
          Your tokens are now staked successfully.
        </p>
        <div className="flex gap-4 w-full max-w-sm">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md text-white text-sm"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StakeSuccessModal;
