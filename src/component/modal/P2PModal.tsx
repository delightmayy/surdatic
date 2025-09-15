import { motion } from "framer-motion";
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import success from "../../img/succesimg.png";

interface Offer {
  id: string;
  username: string;
  amount: number;
  payment: string[];
  limit: string;
}

interface P2POrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "buy" | "sell";
  offer: Offer;
}

const P2POrderModal: React.FC<P2POrderModalProps> = ({
  isOpen,
  onClose,
  type,
}) => {
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const nextStep = () => setStep((s) => s + 1);

  const [verificationCode, setVerificationCode] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleCodeInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return; // Only digits allowed

    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Move to next input
    if (value && index < 5) {
      const nextInput = document.querySelector<HTMLInputElement>(
        `input[data-index="${index + 1}"]`
      );
      nextInput?.focus();
    }
  };

  const handleBackspace = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      const prevInput = document.querySelector<HTMLInputElement>(
        `input[data-index="${index - 1}"]`
      );
      prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const code = verificationCode.join("");
    if (code.length === 6) {
      // ✅ Proceed to next step
      nextStep();
    } else {
      alert("Please enter the full 6-digit code.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Step 1: Order Summary */}
      {step === 1 && (
        <motion.div
          className="bg-[#111] text-white w-full max-w-md rounded-2xl p-6 border border-white/20 shadow-xl overflow-y-auto max-h-[85vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex justify-between border-b-2 border-dashed border-b-white/30 mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                {type === "buy" ? "Buy" : "Sell"}{" "}
                <span className="text-blue-400">Order</span>
              </h2>
              <p className="text-sm text-white/50">
                Do you want to proceed with this order?
              </p>
            </div>
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          {/* Info text */}
          <p className="text-xs text-white/50 mb-6 max-w-md mx-auto">
            The amount specified for this order will be deducted and locked from
            your wallet balance until the transaction is fulfilled successfully.
          </p>

          {/* Transaction Preview Box */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg mb-6">
            <h3 className="text-sm font-semibold text-white/50 mb-4">
              Transaction Preview
            </h3>

            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-white/70">
                Amount to {type === "buy" ? "Buy" : "Sell"}
              </p>
              <p className="font-bold text-white">
                100 000 <span className="text-blue-400">Surda</span>
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-white/70">
                Amount to {type === "buy" ? "Pay" : "Receive"}
              </p>
              <p className="font-bold text-white">
                100 <span className="text-cyan-400">USDT</span>
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 w-full">
            <button
              onClick={onClose}
              className="flex-1 bg-black/30 border border-white/10 py-3 rounded-md hover:bg-white/10 transition"
            >
              Cancel
            </button>
            <button
              onClick={nextStep}
              className="flex-1 bg-blue-500 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
            >
              {type === "buy" ? "Buy Now" : "Sell Now"}
            </button>
          </div>

          {/* Warning text */}
          <p className="text-[10px] text-yellow-400 mt-4 text-center">
            ⚠️ Your account will be credited 10–15 minutes after the order is
            triggered and fulfilled
          </p>
        </motion.div>
      )}

      {/* Step 2: Payment Pending */}
      {step === 2 && (
        <motion.div
          className="bg-[#111] text-white w-full max-w-md rounded-2xl p-6 border border-white/20 shadow-xl overflow-y-auto max-h-[85vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex justify-between border-b-2 border-dashed border-b-white/30 mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Payment <span className="text-blue-400">Pending</span>
              </h2>
              <p className="text-sm text-white/50">
                You have successfully triggered a {type} order.
              </p>
            </div>
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          {/* Info text */}
          <p className="text-xs text-white/50 mb-6 max-w-md mx-auto">
            You will be prompted to release the fund allocated for this
            transaction once the buyer facilitates the transaction.
          </p>

          {/* Transaction Preview Box */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg mb-6">
            <h3 className="text-sm font-semibold text-white/50 mb-4">
              Transaction Preview
            </h3>

            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-white/70">Amount to {type}</p>
              <p className="font-bold text-white">
                100 000 <span className="text-blue-400">Surda</span>
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-white/70">Amount to Receive</p>
              <p className="font-bold text-white">
                100 <span className="text-cyan-400">USDT</span>
              </p>
            </div>
          </div>

          {/* Info Warning Box */}
          <div className="bg-white/5 border border-yellow-500/40 p-4 rounded-lg mb-6 text-xs text-white/80 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">⚠️</span>
              <div className="">
                <p className="font-medium">
                  Payment is to be completed in approximately 15:00 minutes.
                </p>
                <p className="mt-1 text-yellow-400">
                  This order is pending and Surdatics Escrow has locked the
                  assets. You'll be notified to release funds once the buyer
                  facilitates the transaction.
                </p>
                <p className="mt-1 text-yellow-400  italic">
                  This order will be cancelled and your asset will be unlocked
                  and credited back to your wallet once transaction time
                  elapses.
                </p>
              </div>
            </div>
          </div>

          {/* Timer */}
          <p className="text-sm text-white/60 mb-4 text-center">
            Pending Payment: <span className="text-white">15 min : 00 sec</span>
          </p>

          {/* Release Funds Button */}
          <button
            className="w-full bg-black/30 border border-white/10 py-3 rounded-md text-white cursor-not-allowed"
            disabled
          >
            Release Funds
          </button>

          {/* Footer link */}
          <p
            className="text-xs text-white/50 mt-4 text-center"
            onClick={nextStep}
          >
            Facing a problem?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Contact Us
            </a>
          </p>
        </motion.div>
      )}

      {/* Step 3: Payment Facilitated*/}
      {step === 3 && (
        <motion.div
          className="bg-[#111] text-white w-full max-w-md rounded-2xl p-6 border border-white/20 shadow-xl overflow-y-auto max-h-[85vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex justify-between border-b-2 border-dashed border-b-white/30 mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Payment <span className="text-blue-400">Facilitated</span>
              </h2>
              <p className="text-sm text-white/50">
                You have successfully triggered a {type} order.
              </p>
            </div>
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          {/* Info Text */}
          <p className="text-xs text-white/50 mb-6 max-w-md mx-auto">
            You will be prompted to release the fund allocated for this
            transaction once the buyer facilitates the transaction.
          </p>

          {/* Transaction Preview Box */}
          <div className="bg-white/5 border border-white/10 p-6 rounded-lg mb-6">
            <h3 className="text-sm font-semibold text-white/50 mb-4">
              Transaction Preview
            </h3>

            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-white/70">Amount to {type}</p>
              <p className="font-bold text-white">
                100 000 <span className="text-blue-400">Surda</span>
              </p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-white/70">Amount to Receive</p>
              <p className="font-bold text-white">
                100 <span className="text-cyan-400">USDT</span>
              </p>
            </div>
          </div>

          {/* Info Warning Box */}
          <div className="bg-white/5 border border-yellow-500/40 p-4 rounded-lg mb-6 text-xs text-white/80 space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 mt-0.5">⚠️</span>
              <div>
                <p className="font-medium">Payment Facilitated</p>
                <p className="mt-1 text-yellow-400">
                  This order will be cancelled and your asset will be unlocked
                  and credited back to your wallet once transaction time
                  elapses.
                </p>
              </div>
            </div>
          </div>

          {/* Release Funds Button */}
          <button
            className="w-full bg-blue-500 py-3 rounded-md text-white font-semibold hover:bg-blue-600 transition"
            onClick={nextStep}
          >
            Release Funds
          </button>

          {/* Footer Link */}
          <p
            className="text-xs text-white/50 mt-4 text-center"
            onClick={nextStep}
          >
            Facing a problem?{" "}
            <a href="#" className="text-blue-400 hover:underline">
              Contact Us
            </a>
          </p>
        </motion.div>
      )}

      {/* Step 4: Transaction Reference */}
      {step === 4 && (
        <motion.div
          className="bg-[#111] text-white w-full max-w-md rounded-2xl p-6 border border-white/20 shadow-xl overflow-y-auto max-h-[85vh]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex justify-between border-b-2 border-dashed border-b-white/30 mb-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                <span className="text-blue-400">Email</span> Verification
              </h2>
              <p className="text-sm text-white/50">
                A 6-digit verification code has just been sent to your email
                address
              </p>
              <p className="text-sm mt-1 text-blue-400 font-medium">
                joh*****@gmail.com
              </p>
            </div>
            <AiOutlineClose
              size={24}
              className="cursor-pointer"
              onClick={onClose}
            />
          </div>

          {/* 6-Digit Input Boxes */}
          <div className="flex justify-center gap-3 mt-10 mb-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                className="w-12 h-12 text-center text-lg font-semibold border border-white/10 rounded-lg bg-black/30 text-white focus:outline-none focus:border-blue-500"
                value={verificationCode[index] || ""}
                onChange={(e) => handleCodeInput(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                data-index={index}
              />
            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 py-3 rounded-lg font-semibold transition"
          >
            Verify
          </button>
        </motion.div>
      )}

      {/* Step 5: Success */}
      {step === 5 && (
        <motion.div
          className="bg-[#111] text-white w-full max-w-md rounded-2xl p-6 border border-white/20 shadow-xl overflow-y-auto max-h-[85vh] text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className=" flex justify-between border-b-2 text-start border-dashed border-b-white/30">
            <div className="mb-4 w-full">
              <h2 className="text-xl font-semibold text-white  text-start">
               Order Successful
              </h2>
              
            </div>

            <AiOutlineClose size={24} className="" onClick={onClose} />
          </div>
          {/* Success Image */}
          <img
            src={success} // <-- replace with your actual image path
            alt="Order Successful"
            className="w-24 h-24 mx-auto mb-4  mt-12 object-contain"
          />

          {/* Title */}
          <h2 className="text-xl font-semibold mb-2">Order Successful!</h2>

          {/* Description */}
          <p className="text-sm text-white/60 mb-6">
            Your {type === "buy" ? "purchase" : "sale"} has been completed
            successfully.
          </p>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-blue-500 hover:bg-blue-600  py-3 rounded-lg font-semibold transition"
          >
            Close
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default P2POrderModal;
