"use client";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useState, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

type OtpModalProps = {
  onClose: () => void;
  /* onSuccess: () => void; */
  email?: string;
};

const OtpModal: React.FC<OtpModalProps> = ({ onClose, email }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [Error, setError] = useState("");
  const otpRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otpRef.current.length - 1) {
        otpRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRef.current[index - 1]?.focus();
    }
  };

  // Handle form submit
  const handleVerify = async () => {
    try {
      const response = await axios.get(
        `https://api.surdatics.com/auth/confirm_email/${otp.join("")}` // confirm correct URL
      );
      // Success — redirect to login page
      response.data?.success === true
        ? navigate("/login")
        : setError("Invalid OTP Value");
      console.log("auth successful");
    } catch (err: any) {
      setError(err?.message);
      console.log(err?.message);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.every((o) => o !== "")) {
      handleVerify();
      /* console.log(otp.join("")); */
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
      <motion.form
        onSubmit={handleSubmit}
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
              Enter the 6-digit OTP sent
              {email ? ` to ${email}` : " to your email"}.
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
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 text-center bg-[#1a1a1a] text-lg rounded-md focus:ring-1 focus:ring-sky-500/30 outline-none"
              required
            />
          ))}
        </div>
        {Error != " " && (
          <p className="text-xs text-yellow-400 italic">{Error}</p>
        )}

        <button
          type="submit"
          className="bg-sky-500/70 hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md"
        >
          Verify
        </button>
      </motion.form>
    </div>
  );
};

export default OtpModal;
