"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import success from "../../img/succesimg.png";

interface StakeFormModalProps {
  onClose: () => void;
  available: number;
  defaultPlan: "Flexible" | "Locked";
  defaultPeriod: string;
  onStake: (data: { plan: "Flexible" | "Locked"; period: string; amount: number }) => void | Promise<void>;
}

const StakeFormModal: React.FC<StakeFormModalProps> = ({
  onClose,
  available,
  defaultPlan = "Flexible",
  defaultPeriod = "7 Days",
  onStake,
}) => {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState(defaultPlan);
  const [period, setPeriod] = useState(defaultPeriod);
  const [loading, setLoading] = useState(false);

  const handleStake = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) return;

    try {
      setLoading(true);
      // 🔹 call parent-provided stake logic
      await onStake({
        plan,
        period,
        amount: Number(amount),
      });

      // move to success step
      setStep(2);
    } catch (err) {
      console.error("Stake failed:", err);
      alert("Staking failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      {/* Step 1 - Stake Form */}
      {step === 1 && (
        <motion.form
          onSubmit={handleStake}
          className="w-full max-w-lg bg-[#111] max-h-[80vh] overflow-y-auto border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-5"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between border-b-2 border-dashed border-b-white/30">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white">Stake</h2>
              <p className="text-sm text-white/50">
                Lock your SURDA tokens to earn rewards.
              </p>
            </div>
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          {/* Asset */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Asset</label>
            <input
              type="text"
              value="Surda (SURDA)"
              disabled
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md"
            />
          </div>

          {/* Staking Plan */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Staking Plan</label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value as "Flexible" | "Locked")}
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md"
            >
              <option value="Flexible">Flexible</option>
              <option value="Locked">Locked</option>
            </select>
          </div>

          {/* Staking Period */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Staking Period</label>
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md"
            >
              <option>7 Days</option>
              <option>14 Days</option>
              <option>30 Days</option>
              <option>60 Days</option>
            </select>
          </div>

          {/* Amount */}
          <div className="flex flex-col">
            <label className="text-sm mb-1">Staking Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="bg-[#1a1a1a] text-sm px-4 py-3 rounded-md"
              required
              max={available}
            />
            <p className="text-xs text-gray-400 mt-1">
              Available:{" "}
              <span className="font-semibold">{available} SURDA</span>
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md disabled:opacity-50"
          >
            {loading ? "Staking..." : "Stake Now"}
          </button>
        </motion.form>
      )}

      {/* Step 2 - Success */}
      {step === 2 && (
        <motion.div
          className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <AiOutlineClose
            size={24}
            className="self-end cursor-pointer"
            onClick={onClose}
          />

          <img src={success} alt="..." className="w-20 mb-4 mx-auto" />
          <h2 className="text-xl font-semibold text-white">Stake Successful</h2>
          <p className="text-sm text-gray-400">
            Your tokens are now staked successfully.
          </p>
          <div className="flex gap-4 w-full max-w-sm">
            <button className="flex-1 bg-sky-500/70 hover:bg-sky-600 px-6 py-3 rounded-md text-white text-sm">
              View Stakes
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-md text-white text-sm"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default StakeFormModal;
