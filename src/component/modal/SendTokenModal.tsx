"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import success from "../../img/succesimg.png"

const SendTokenModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);

  // Dummy handler
  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerify = () => {
    setStep(3);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      {/* Step 1 - Send Token */}
      {step === 1 && (
        <motion.form
          onSubmit={handleSend}
          className="w-full max-w-lg bg-[#111] max-h-[80vh]  overflow-y-auto border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className=" flex justify-between border-b-2 border-dashed border-b-white/30">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white ">Send Token</h2>
              <p className="text-sm text-white/50">
                Send tokens from your assets to an external wallet address.
              </p>
            </div>

            <AiOutlineClose size={24} className="" onClick={onClose} />
          </div>

          {/* Token */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Token to Withdraw</label>
            <input
              type="text"
              placeholder="Surda (SURDA)"
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-sky-500/30"
              disabled
            />
          </div>

          {/* Receiver */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Receiver Address</label>
            <input
              type="text"
              placeholder="Enter wallet address"
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-sky-500/30"
              required
            />
          </div>

          {/* Network */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Network</label>
            <select className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-sky-500/30">
              <option>ICP (CRC-1)</option>
            </select>
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Amount</label>
            <input
              type="number"
              placeholder="0.00"
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md outline-none focus:ring-1 focus:ring-sky-500/30"
              required
            />
            <p className="text-xs text-gray-400 mt-1">
              Available: <span className="font-semibold">500 546 SURDA</span>
            </p>
          </div>

          <button
            type="submit"
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md"
          >
            Send
          </button>
        </motion.form>
      )}

      {/* Step 2 - Security Verification */}
      {step === 2 && (
        <motion.div
          className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className=" flex justify-between border-b-2 border-dashed border-b-white/30">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white ">
                Security Verification
              </h2>
              <p className="text-sm text-white/50">
                Please complete this step to validate your request.
              </p>
            </div>

            <AiOutlineClose size={24} className="" onClick={onClose} />
          </div>

          <p className="text-sm text-gray-400 text-center">
            A 6-digit verification code has been sent to your email:
          </p>
          <p className="text-sm text-sky-400 -mt-4 text-center ">j****@gmail.com </p>

          <div className="flex justify-center gap-3">
            {[...Array(6)].map((_, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                className="w-10 h-12 text-center bg-[#1a1a1a] text-lg rounded-md focus:ring-1 focus:ring-sky-500/30 outline-none"
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleVerify}
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md"
          >
            Verify
          </button>
        </motion.div>
      )}

      {/* Step 3 - Success */}
      {step === 3 && (
        <motion.div
          className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className=" flex justify-between border-b-2 border-dashed border-b-white/30">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white ">Send Token</h2>
              <p className="text-sm text-white/50">
                Send tokens from your assets to an external wallet address.
              </p>
            </div>

            <AiOutlineClose size={24} className="" onClick={onClose} />
          </div>

          <img src={success} alt="..." className="w-20 mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-white">
            Token Sent Successfully
          </h2>
          <p className="text-sm text-gray-400">
            Proceed to wallet or check transaction history for more details.
          </p>
          <div className="flex gap-4 w-full max-w-sm">
            <button className=" flex-1 bg-sky-500/70 hover:bg-sky-600 px-6 py-3 rounded-md text-white text-sm">
              Transaction History
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md text-white text-sm"
            >
              Wallet
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default SendTokenModal;
