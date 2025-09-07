"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import visa from "../../img/visa.png";
import stripe from "../../img/stripe.png";
import mastercard from "../../img/mastercard.png";
import paypal from "../../img/paypal.png";
import google from "../../img/googlepay.png";
import surdatoken from "../../img/SurdaToken.png";

const BuyWithCardModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number>(0);

  const handleBuyNow = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful purchase
    setStep(2);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      {/* Step 1 – Card Form */}
      {step === 1 && (
        <motion.form
          onSubmit={handleBuyNow}
          className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-8 max-h-[85vh] overflow-y-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="flex justify-between border-b-2 border-dashed border-b-white/20 pb-3 ">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Buy Token with Card
              </h2>
              <p className="text-sm text-white/50 mt-2">
                Buy Surda tokens directly with your credit/debit card
              </p>
            </div>
            <AiOutlineClose
              size={22}
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={onClose}
            />
          </div>

          {/* Token */}
          <div className="flex flex-col text-sm">
            <label className="text-white/70 mb-1">Token</label>
            <div className="flex items-center gap-2">
              <img
                src={surdatoken}
                alt="Surda"
                className="w-20 h-auto rounded-full"
              />
              <span className="font-medium">Surda Token</span>
            </div>
            <div className="flex items-center justify-between px-4 py-3 rounded-md bg-black/50 border border-white/10 text-white">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="bg-transparent  outline-none "
                placeholder="0.00"
                required
              />
              <p className="text-white/60 flex items-center gap-1 ml-1">  <img
                src={surdatoken}
                alt="Surda"
                className="w-6 h-6 rounded-full"
              />Surda</p>
            </div>
          </div>

          {/* Card Details */}
          <div className="flex flex-col gap-4 text-sm">
            <label className="text-white/70 mb-1">Card Type</label>
            <div className="flex gap-3">
              <img src={visa} alt="Visa" className="h-8" />
              <img src={stripe} alt="Stripe" className="h-8" />{" "}
              <img src={mastercard} alt="MasterCard" className="h-8" />
              <img src={paypal} alt="MasterCard" className="h-8" />
              <img src={google} alt="Apple Pay" className="h-8" />
            </div>

            <input
              type="text"
              placeholder="Name on your card"
              required
              className="bg-[#1a1a1a] px-4 py-3 rounded-md text-white"
            />
            <input
              type="text"
              placeholder="Card number"
              required
              className="bg-[#1a1a1a] px-4 py-3 rounded-md text-white"
            />

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="MM/YY"
                required
                className="flex-1 bg-[#1a1a1a] px-4 py-3 rounded-md text-white"
              />
              <input
                type="text"
                placeholder="CVC"
                required
                className="flex-1 bg-[#1a1a1a] px-4 py-3 rounded-md text-white"
              />
            </div>

            <p className="text-xs text-white/50">
              Please note that the above amount will also be deducted from the
              account selected in this card.
            </p>
          </div>

          <button
            type="submit"
            className="bg-sky-500/70 hover:bg-sky-600 text-white text-sm font-medium py-3 rounded-md"
          >
            Buy Now
          </button>
        </motion.form>
      )}

      {/* Step 2 – Success Confirmation */}
      {step === 2 && (
        <motion.div
          className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl  py-8 flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >

              {/* Header */}
          <div className="flex w-full px-3 justify-between border-b-2 border-dashed border-b-white/20 pb-3  ">
            <div className="text-start">
              <h2 className="text-xl font-semibold text-white">
                Buy Token with Card
              </h2>
              <p className="text-sm text-white/50 mt-2">
                Buy Surda tokens directly with your credit/debit card
              </p>
            </div>
            <AiOutlineClose
              size={22}
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={onClose}
            />
          </div>

          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500/80">
            <svg
              className="w-10 h-10 text-green-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-white">
            {amount.toLocaleString()} Surda
          </h2>
          <p className="text-sm text-green-400 font-medium">
            Transaction Successful
          </p>
          <p className="text-sm text-gray-400">
            Proceed to wallet or check transaction history for more information
          </p>

          <div className="flex gap-4 w-full max-w-sm">
            <button className="flex-1 bg-sky-500/70 hover:bg-sky-600 px-6 py-3 rounded-md text-white text-sm">
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

export default BuyWithCardModal;
