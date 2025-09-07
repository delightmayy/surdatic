import React from "react";
import QRCode from "react-qr-code";
import { FiCopy } from "react-icons/fi";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

interface ReceiveTokenModalProps {
  address: string;
  onClose: () => void;
}

const ReceiveTokenModal: React.FC<ReceiveTokenModalProps> = ({
  address,
  onClose,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center  justify-center bg-black/60"
    >
      <div className="w-full max-w-lg bg-[#111]  max-h-[80vh] overflow-y-auto  border border-white/10 rounded-2xl shadow-lg p-6 relative">
        {/* Header */}
        <div className=" flex justify-between border-b-2 border-dashed border-b-white/30">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-white ">Receive Token</h2>
            <p className="text-sm text-white/50">
              Securely receive tokens into your wallet by sharing your unique
              wallet address or QR code
            </p>
          </div>

          <AiOutlineClose size={24} className="" onClick={onClose} />
        </div>

        {/* QR Code Section */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-sm text-white/80">Send Surda</h3>
          <div className="bg-white p-3 rounded-lg">
            <QRCode value={address || "loading..."} size={150} />
          </div>
        </div>

        {/* Token + Network */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col text-sm">
            <label className="text-white/70 mb-1">Token to Receive</label>
            <div className="px-4 py-3 rounded-md bg-black/50 border border-white/10 text-white/90">
              Surda Token
            </div>
          </div>

          <div className="flex flex-col text-sm">
            <label className="text-white/70 mb-1">Network</label>
            <div className="px-4 py-3 rounded-md bg-black/50 border border-white/10 text-white/90">
              ICP (CRC-1)
            </div>
          </div>

          {/* Deposit Address */}
          <div className="flex flex-col text-sm">
            <label className="text-white/70 mb-1">Deposit Address</label>
            <div className="flex items-center justify-between px-4 py-3 rounded-md bg-black/50 border border-white/10 text-white/90">
              <span className="truncate">{address}</span>
              <FiCopy
                className="cursor-pointer hover:text-sky-400"
                onClick={handleCopy}
              />
            </div>
          </div>

          {/* Warning */}
          <p className="text-[11px] text-amber-400">
            Send only (SURDA) to this address. Sending any other coins may
            result in permanent loss!
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="flex-1 py-3 bg-black/40 border border-white/10 text-white rounded-md hover:bg-black/60"
          >
            Back
          </button>
          <button className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-md">
            Share
          </button>
        </div>

        {/* Info */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Estimated token arrival time is 5–15 minutes
        </p>
      </div>
    </motion.div>
  );
};

export default ReceiveTokenModal;
