"use client";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import success from "../../img/succesimg.png"; // ✅ adjust path

type PinModalProps = {
  onClose: () => void;
  mode: "create" | "reset";
};

const PinModal: React.FC<PinModalProps> = ({ onClose, mode }) => {
  const [step, setStep] = useState(1);

  // 🔹 Step 1: PIN (4 digits)
  const [pin, setPin] = useState<string[]>(["", "", "", ""]);
  const pinRef = useRef<(HTMLInputElement | null)[]>([]);

  // 🔹 Step 2: OTP (6 digits)
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const otpRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    value: string,
    index: number,
    type: "pin" | "otp"
  ) => {
    if (/^[0-9]?$/.test(value)) {
      if (type === "pin") {
        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);
        if (value && index < pinRef.current.length - 1) {
          pinRef.current[index + 1]?.focus();
        }
      } else {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < otpRef.current.length - 1) {
          otpRef.current[index + 1]?.focus();
        }
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
    type: "pin" | "otp"
  ) => {
    if (e.key === "Backspace") {
      if (type === "pin" && !pin[index] && index > 0) {
        pinRef.current[index - 1]?.focus();
      }
      if (type === "otp" && !otp[index] && index > 0) {
        otpRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmitPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.every((p) => p !== "")) {
      setStep(2); // go to OTP stage
    }
  };

  const handleSubmitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every((o) => o !== "")) {
      setStep(3); // go to success stage
    }
  };

  const title = mode === "create" ? "Create " : "Reset";
  const subtitle =
    mode === "create"
      ? "This will be your secure transaction pin."
      : "This will reset your transaction pin to a new one preferred by you.";

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      {/* Step 1: Enter Pin */}
      {step === 1 && (
        <motion.form
          onSubmit={handleSubmitPin}
          className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between border-b-2 border-dashed border-b-white/30">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white capitalize">
                {" "}
                <span className="text-blue-400">{title}</span> Transaction Pin
              </h2>
              <p className="text-sm text-white/50">{subtitle}</p>
            </div>
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          <label className="text-sm text-center text-white/70">
            Enter Transaction Pin
          </label>
          <div className="flex justify-center gap-3">
            {pin.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  pinRef.current[idx] = el;
                }}
                onChange={(e) => handleChange(e.target.value, idx, "pin")}
                onKeyDown={(e) => handleKeyDown(e, idx, "pin")}
                className="w-12 h-12 text-center bg-[#1a1a1a] text-lg rounded-md focus:ring-1 focus:ring-sky-500/30 outline-none"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md"
          >
            {mode === "create" ? "Create" : "Reset"}
          </button>
        </motion.form>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <motion.form
          onSubmit={handleSubmitOtp}
          className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-8 flex flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex justify-between border-b-2 border-dashed border-b-white/30">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-white capitalize">
                Verify <span className="text-blue-400">Email</span>
              </h2>
              <p className="text-sm text-white/50">
                Enter the 6-digit OTP sent to your email.
              </p>
            </div>
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          <label className="text-sm text-center text-white/70">
            Enter OTP Code
          </label>
          <div className="flex justify-center gap-3">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  otpRef.current[idx] = el;
                }}
                onChange={(e) => handleChange(e.target.value, idx, "otp")}
                onKeyDown={(e) => handleKeyDown(e, idx, "otp")}
                className="w-12 h-12 text-center bg-[#1a1a1a] text-lg rounded-md focus:ring-1 focus:ring-sky-500/30 outline-none"
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md"
          >
            Verify
          </button>
        </motion.form>
      )}

      {/* Step 3: Success */}
      {step === 3 && (
        <motion.div
          className="w-full max-w-lg bg-[#111] border border-white/20 shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center gap-6 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-white tracking-wider">
            {title} <span className=" text-blue-400">Successful</span>
          </h2>
          <img src={success} alt="Success" className="w-20 mb-4 mx-auto" />
          <h3 className="text-lg font-semibold text-white">
            {mode === "create"
              ? "Pin Created Successfully"
              : "Pin Reset Successfully"}
          </h3>
          <p className="text-sm text-gray-400">
            {mode === "create"
              ? "Your transaction pin has been created."
              : "Your transaction pin has been reset successfully."}
          </p>
          <button
            onClick={onClose}
            className="bg-sky-500/70 w-full hover:bg-sky-600 px-6 py-3 rounded-md text-white text-sm"
          >
            Done
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default PinModal;
