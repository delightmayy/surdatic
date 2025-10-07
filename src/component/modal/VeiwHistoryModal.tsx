import React from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

interface Transaction {
  id: string;
  address: string;
  amount: string;
  created_at: string;
  updated_at?: string;     // optional
  purpose: string;
  status: string;
  fee?: string | null;     // optional
  user: string;
}
interface TransactionViewModalProps {
  transaction: Transaction | null;
  onClose: () => void;
}

const VeiwHistoryModal: React.FC<TransactionViewModalProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex px-4 items-center justify-center bg-black/60"
    >
      <div
        className="w-full max-w-lg bg-[#111] max-h-[85vh] overflow-y-auto border border-white/10 rounded-2xl shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-dashed border-b-white/20 pb-3">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Transaction Details
            </h2>
            <p className="text-sm text-white/50">
              View full transaction record and status.
            </p>
          </div>
          <AiOutlineClose
            size={22}
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={onClose}
          />
        </div>


        {/* Transaction Info */}
      
        <div className="mt-6 flex flex-col gap-6 text-sm">
          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/90">Transaction ID</span>
            <span className="text-white/65">{transaction.id}</span>
          </div>

          <div className="flex flex-col border-b border-white/10 pb-2">
            <span className="text-white/90">Address</span>
            <span className="text-white/65">{transaction.address}</span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/90">Amount</span>
            <span className={`${
                transaction.status === "CREDIT"
                  ? "text-green-400"
                  : "text-red-400"
              }`}> {transaction.status === "CREDIT"? "+": "-"}{transaction.amount}</span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/90">Purpose</span>
            <span className="text-white/65">{transaction.purpose}</span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/90">Status</span>
            <span
              className={`${
                transaction.status === "CREDIT"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {transaction.status}
            </span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/90">Fee</span>
            <span className="text-white/65">{transaction.fee ?? "N/A"}</span>
          </div>

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/90">User</span>
            <span className="text-white/65">{transaction.user}</span>
          </div>

         

          <div className="flex justify-between border-b border-white/10 pb-2">
            <span className="text-white/90">Updated At</span>
            <span className="text-white/65">{transaction.updated_at}</span>
          </div>
         
        </div>
      </div>
    </motion.div>
  );
};

export default VeiwHistoryModal;



