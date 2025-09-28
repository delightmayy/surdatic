import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FiChevronDown } from "react-icons/fi";
import token from "../../img/tokenicon.png";
import { useAuth } from "../../api/useAuth";
import { type UserICPAsset } from "../dashboardUI/wallet/WalletComp";
import SurveySuccessModal from "./SuccessModal";

interface ConvertTokenModalProps {
  onClose: () => void;
  balance: string;
}

const ConvertTokenModal: React.FC<ConvertTokenModalProps> = ({
  onClose,
  balance,
}) => {
  /*  const tokens = [
    { name: "ckUSDT", symbol: "ckUSDT", icon: "/icons/usdt.png" },
    { name: "ckUSDC", symbol: "ckUSDC", icon: "/icons/usdc.png" },
    { name: "ckDAI", symbol: "ckDAI", icon: "/icons/dai.png" },
  ]; */

  const { transferFee, getSurdaRate, userIcpAsset, covertSurda } = useAuth();
  const [convertTO, setConvetTo] = useState("");
  const [fee, setFee] = useState("");
  const [rate, setRate] = useState("");
  const [convertAmount, setConvertAmount] = useState("0.00");
  const [showDropdown, setShowDropdown] = useState(false);
  const [tokens, setTokens] = useState<UserICPAsset[] | null>(null);
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validate token selected
    if (!id) {
      setError(" Please select a token to convert to.");

      setTimeout(() => {
        setError("");
      }, 1000);

      return;
    }

    // validate amount
    const amountNum = Number(convertAmount);
    if (isNaN(amountNum) || amountNum < 1000) {
      setError("Amount must be at least 1000.");

      setTimeout(() => {
        setError("");
      }, 1000);

      return;
    }

    try {
      const res = await covertSurda(amountNum, id);
      if (res.data) {
        setShow(true);
      }
    } catch (err: any) {
      setError("Transaction Failed");
      console.log(err);

      setTimeout(() => {
        setError("");
      }, 2000);
    }

    // success → log values
    console.log("✅ Submitting conversion:", {
      amount: amountNum,
      id,
    });
  };

  useEffect(() => {
    const handletransferFee = async () => {
      try {
        const res = await transferFee();
        if (res.data) {
          setFee(res.data.fee);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleUserIcpAsset = async () => {
      try {
        const res = await userIcpAsset();
        if (res.data) {
          setTokens(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handletransferFee();
    handleUserIcpAsset();
  }, []);

  useEffect(() => {
    const handlegetSurdaRate = async () => {
      try {
        const res = await getSurdaRate();
        if (res.data) {
          setRate(res.data.rate);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handlegetSurdaRate();

    // Refresh rate every 60s
    const refreshInterval = setInterval(() => {
      handlegetSurdaRate();
      setCountdown(60); // reset countdown on refresh
    }, 60000);

    // Countdown timer
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(countdownInterval);
    };
  }, []);

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
            <h2 className="text-xl font-semibold text-white">Convert Token</h2>
            <p className="text-sm text-white/50">
              Swap your tokens conveniently and effortlessly.
            </p>
          </div>
          <AiOutlineClose
            size={24}
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Convert From */}
        <div className="mt-6">
          <h3 className="text-sm text-white/80 mb-2">Convert From</h3>
          <div className="flex items-center  px-4 py-3 bg-black/50 border border-white/10 rounded-md cursor-pointer">
            <div className="flex items-center gap-2">
              <img src={token} alt="Surda" className="w-6 h-6 rounded-full" />

              <span className="text-xs text-white/50">Surda</span>
            </div>
            {/*  <FiChevronDown className="text-gray-400" /> */}
          </div>

          <div className="mt-3 flex items-center px-3 py-2 bg-black/40 border border-white/10 rounded-md">
            <input
              type="number"
              value={convertAmount}
              onChange={(e) => setConvertAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent  text-white  outline-none"
            />
            <button
              onClick={() => setConvertAmount(balance)}
              className="ml-2 px-3 py-1 text-xs bg-blue-500 text-white rounded"
            >
              Max
            </button>
            <span className="ml-2 text-white/70">Surda</span>
          </div>
          <p className="text-xs text-green-400 mt-2">Available: {balance}</p>
        </div>

        {/* Convert To */}
        <div className="mt-6 relative">
          <h3 className="text-sm text-white/80 mb-2">Convert To</h3>

          {/* Selected token */}
          <div
            className="flex items-center justify-between px-4 py-3 bg-black/50 border border-white/10 rounded-md cursor-pointer"
            onClick={() => setShowDropdown((prev) => !prev)}
          >
            {convertTO ? (
              <div className="flex items-center gap-2">
                <img
                  src={tokens?.find((t) => t.symbol === convertTO)?.image}
                  alt={convertTO}
                  className="w-6 h-6 rounded-full"
                />
                <span className="text-white font-medium">{convertTO}</span>
              </div>
            ) : (
              <span className="text-gray-400">Select Token</span>
            )}
            <FiChevronDown className="text-gray-400" />
          </div>

          {/* Dropdown list */}
          {showDropdown && (
            <div className="absolute mt-2 w-full bg-[#1a1a1a] border border-white/10 rounded-md shadow-lg z-10">
              {tokens?.map((t) => (
                <div
                  key={t.symbol}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-white/10 cursor-pointer"
                  onClick={() => {
                    setConvetTo(t.symbol);
                    setId(t.id);
                    setShowDropdown(false);
                  }}
                >
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-white">{t.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Conversion Info */}
        <div className="mt-6 text-sm space-y-1">
          <p className="text-xs capitalize font-semibold tracking-wider  mt-3">
            Amount to send:
            <span className="font-semibold"> {convertAmount} SURDA</span>
          </p>
          <p className="text-gray-400 text-sm ">
            Conversion Rate:
            <span className="text-green-400 tracking-wider">
              1 Surda = {rate} USD
            </span>
          </p>
          <p className="text-gray-400">
            Fee:
            <span className="text-green-400 font-medium tracking-wider">
              {" "}
              {fee}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Rate conversion reloading in{" "}
            <span className="text-sky-400 font-semibold">00:{countdown}</span>
          </p>
        </div>

        {error && (
          <p className="text-xs my-2 italic text-center text-red-400">
            {error}
          </p>
        )}

        {/* Footer */}
        <button
          onClick={handleSubmit}
          disabled={error != ""}
          className="bg-sky-500/70 my-3 w-full disabled:bg-sky-500/20 disabled:cursor-not-allowed hover:bg-sky-600 transition-all text-white text-sm font-medium py-3 rounded-md"
        >
          Convert
        </button>
      </div>

      {show && (
        <SurveySuccessModal
          buttonA="Close"
          titleB=""
          rewardAmount={Number(convertAmount)}
          subtitleB=""
          title="Successful"
          subtitle="Transaction Completed"
          onClose={() => setShow(false)}
        />
      )}
    </motion.div>
  );
};

export default ConvertTokenModal;
