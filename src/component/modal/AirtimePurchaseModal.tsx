// components/modals/AirtimePurchaseModal.tsx
import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import successIcon from "../../img/succesimg.png";
import mtnicon from "../../img/mtn.png";
import gloicon from "../../img/glo.png";
import Airtelicon from "../../img/airtel.png";
import Nmobileicon from "../../img/9mobile.png";
import token from "../../img/SurdaToken.png";

const AirtimePurchaseModal = ({
  onClose,
  phone,
  amount,
  network,
  option,
  dataAmount,
  surdaAmount
}: {
  onClose: () => void;
  phone: string;
  amount: number;
  network: string;
  option: string;
  dataAmount: string;
  surdaAmount: string;
}) => {
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState(["", "", "", ""]);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const transactionId = "cxucxwievm[rep]ewe";
  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handleVerify = () => {
    setStep(3);
  };

  const handlePinChange = (value: string, index: number) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 ">
      {/* Step 1: Confirm Details */}
      {/* {step === 1 && (
        <motion.form
          onSubmit={handleConfirm}
          className="bg-[#111] text-white w-full max-w-md rounded-2xl p-6 border border-white/20 shadow-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold capitalize">{option} Purchase</h2>
            <AiOutlineClose onClick={onClose} className="cursor-pointer" />
          </div>

          <p className="text-sm text-white/60 mb-2">
            You're about to purchase:
          </p>
          <div className="bg-black/20 p-4 rounded-md mb-4 space-y-1">
            <p className="text-white text-lg font-bold">{option==="Data"?dataAmount: "₦" + amount} </p>
            <p className="text-white/70 text-sm">Phone: {phone}</p>
            <p className="text-white/70 text-sm">Network: {network}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600"
          >
            Proceed
          </button>
        </motion.form>
      )} */}

      {step === 1 && <motion.form
        onSubmit={handleConfirm}
        className="bg-[#111] text-white w-full max-w-md rounded-2xl p-6 border border-white/20 shadow-xl overflow-y-auto max-h-[85vh]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold capitalize">Airtime & Data</h2>
          <AiOutlineClose
            onClick={onClose}
            className="cursor-pointer text-white/60 hover:text-white"
          />
        </div>

        {/* Subheading */}
        <p className="text-sm text-white/60 mb-6">
          Use your SURDA tokens to instantly buy airtime and data across major
          networks
        </p>

        {/* Purchase Info Box */}
        <div className="bg-white/5 p-6 rounded-xl text-center mb-6 border border-white/10 space-y-2">
          <p className="text-white/80 text-sm">{option}</p>
          <p className="text-3xl font-bold text-blue-400">
            {option === "Data" ? dataAmount : `₦${amount}`}
          </p>
          <p className="text-white/60 text-sm flex items-center gap-1 justify-center">
            Price: <span className="text-white font-medium flex items-center gap-2"> <img src={token} alt="surda" className="w-5 h-5" />{surdaAmount}</span> Surda
          </p>
          <p className="text-white font-medium pt-2">Purchase {option}?</p>
        </div>

        {/* Transaction Details */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-white/60">Transaction Option:</span>
            <span className="text-white/80">{option}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Amount:</span>
            <span className="text-white/80">
              {option === "Data" ? dataAmount : "₦" + amount}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white/60">Network:</span>
            <span className="text-white/80 flex items-center gap-1 capitalize">
              {/* Replace this src with actual logo logic if needed */}
              <img
                src={
                  network === "Mtn"
                    ? mtnicon
                    : network === "Glo"
                    ? gloicon
                    : network === "Airtel"
                    ? Airtelicon
                    : Nmobileicon
                }
                alt={network}
                className="w-5 h-5"
              />
              {network}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Phone Number:</span>
            <span className="text-white/80">{phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Transaction ID:</span>
            <span className="text-white/80">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Date and Time:</span>
            <span className="text-white/80">{currentDate}</span>
          </div>

          {/* Save as Beneficiary */}
          <div className="flex justify-between items-center pt-3 border-t border-white/10">
            <span className="text-white/60">Save as Beneficiary:</span>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="relative w-10 h-5 bg-white/10 peer-focus:outline-none peer-checked:bg-blue-500 rounded-full transition-all"></div>
            </label>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition"
        >
          Proceed
        </button>
      </motion.form>}
      {/* Step 2: PIN Entry */}
      {step === 2 && (
        <motion.div
          className="bg-[#111] text-white w-full max-w-md rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col gap-6 overflow-y-auto max-h-[85vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Transaction Pin</h2>
            <AiOutlineClose onClick={onClose} className="cursor-pointer" />
          </div>
          <p className="text-sm text-white/60 text-center">
            Enter your 4-digit transaction pin to continue.
          </p>

          <div className="flex justify-center gap-4">
            {pin.map((val, idx) => (
              <input
                key={idx}
                type="password"
                maxLength={1}
                value={val}
                onChange={(e) => handlePinChange(e.target.value, idx)}
                className="w-12 h-12 bg-black/30 border border-white/20 text-white text-center text-lg rounded focus:outline-none focus:ring-1 ring-blue-400"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600"
          >
            Verify
          </button>
        </motion.div>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <motion.div
          className="bg-[#111] text-white w-full max-w-md rounded-2xl p-6 border border-white/20 shadow-xl flex flex-col items-center text-center gap-6 overflow-y-auto max-h-[85vh]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <AiOutlineClose
            onClick={onClose}
            className="self-end cursor-pointer"
          />
          <img src={successIcon} alt="Success" className="w-16" />
          <h2 className="text-xl font-semibold">Purchase Successful</h2>
          <p className="text-sm text-white/60">
            You've successfully purchased{" "}
            {option === "Airtime "
              ? "₦" + amount + "airtime "
              : dataAmount + " data"}{" "}
            for {phone}.
          </p>
          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 bg-blue-500 py-3 rounded-md hover:bg-blue-600"
            >
              Wallet
            </button>
            <button className="flex-1 bg-black/30 border border-white/10 py-3 rounded-md hover:bg-white/10">
              More Services
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default AirtimePurchaseModal;
