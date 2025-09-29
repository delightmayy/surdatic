import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import token from "../../img/tokenicon.png";
import { useAuth } from "../../api/useAuth";
import SurveySuccessModal from "./SuccessModal";

interface ConvertTokenModalProps {
  onClose: () => void;
  balance: string;
}

const BuyWithLlSKModal: React.FC<ConvertTokenModalProps> = ({
  onClose,
  balance,
}) => {
  const { transferFee, getSurdaRate, } = useAuth();

  const [fee, setFee] = useState("");
  const [, /* rate */ setRate] = useState("");
  const [convertAmount, setConvertAmount] = useState("0.00");
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // validate token selected
    if (!convertAmount) {
      setError(" Please Enter Amount to Buy.");

      setTimeout(() => {
        setError("");
      }, 1000);

      return;
    }


    /* try {
      const res = await covertSurda(amountNum);
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
 */
    // success → log values
    console.log("✅ Submitting conversion:", {
      amount: convertAmount,
      
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
    handletransferFee();
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
            <h2 className="text-xl font-semibold text-white">
              Buy SURDA with Lisk.
            </h2>
            <p className="text-sm text-white/50">
              Buy SURDA on Lisk Blockchain
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
          <h3 className="text-sm text-white/80 mb-2">Token to Buy</h3>
          <div className="flex items-center  px-4 py-3 bg-black/50 border border-white/10 rounded-md cursor-pointer">
            <div className="flex items-center gap-2">
              <img src={token} alt="Surda" className="w-6 h-6 rounded-full" />

              <span className="text-xs text-white/50">Surda</span>
            </div>
          </div>
          <h3 className="text-sm text-white/80 mt-4 -mb-2">Amount to Buy</h3>
          <div className="mt-3 flex  items-center px-3 py-2 bg-black/40 border border-white/10 rounded-md">
            <input
              type="number"
              value={convertAmount}
              onChange={(e) => setConvertAmount(e.target.value)}
              placeholder="0.00"
              className="flex-1 bg-transparent  text-white  outline-none"
            />
            {/*  <button
              onClick={() => setConvertAmount(balance)}
              className="ml-2 px-3 py-1 text-xs bg-blue-500 text-white rounded"
            >
              Max
            </button> */}
            <span className="ml-2 text-white/70 ">Surda</span>
          </div>
          <p className="text-xs text-green-400 mt-2">Available: {balance}</p>
        </div>

        {/* Convert To */}
        <div className="mt-6 relative">
          <h3 className="text-sm text-white/80 mb-2">Network</h3>

          {/* Selected token */}
          <div className="flex items-center justify-between px-4 py-3 bg-black/50 border border-white/10 rounded-md cursor-pointer">
            <span className="text-gray-400">LSK (ERC-20)</span>
          </div>
        </div>

        {/* Conversion Info */}
        <div className="mt-6 text-sm space-y-1">
          <p className="text-xs capitalize font-semibold tracking-wider  mt-3">
            Amount to Buy:
            <span className="font-semibold"> {convertAmount} SURDA</span>
          </p>

          <p className="text-xs capitalize font-semibold tracking-wider  mt-3">
            Amount in Lsk:
            <span className="text-green-400"> -- LSK</span>
          </p>

          <p className="text-gray-400 text-xs mt-2">
            Fee:{" "}
            <span className="text-green-400 font-medium tracking-wider">
              {fee}
            </span>
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
          Buy Surda
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

export default BuyWithLlSKModal;
