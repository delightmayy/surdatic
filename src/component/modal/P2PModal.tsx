import { useState } from "react";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

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
  offer,
}) => {
  const [step, setStep] = useState(1);

  const [reference, setReference] = useState("");

  if (!isOpen) return null;

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => Math.max(1, s - 1));


  const [verificationCode, setVerificationCode] = useState<string[]>(["", "", "", "", "", ""]);

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
      <div className="bg-gray-900 w-full max-w-md rounded-xl shadow-lg text-white relative p-6">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-white/60 hover:text-white"
          onClick={onClose}
        >
          <FaTimes />
        </button>

        {/* Step 1: Order Summary */}
        {step === 1 && (
          <div className="text-center px-4 py-6">
            <h2 className="text-xl font-semibold mb-1">
              {type === "buy" ? "Buy" : "Sell"}{" "}
              <span className="text-blue-400">Order</span>
            </h2>
            <p className="text-sm text-white/70 mb-6">
              Do you want to proceed with this order?
            </p>

            <p className="text-xs text-white/50 mb-6 max-w-md mx-auto">
              The amount specified for this order will be deducted and locked
              from your wallet balance until the transaction is fulfilled
              successfully
            </p>

            {/* Transaction Preview Box */}
            <div className="bg-black/30 border border-white/10 rounded-xl px-6 py-5 mb-6 max-w-md mx-auto">
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
            <div className="flex justify-center gap-4 mb-4 max-w-md mx-auto">
              <button
                onClick={onClose}
                className="w-1/2 bg-white/10 py-2 rounded text-white hover:bg-white/20 transition"
              >
                Cancel
              </button>
              <button
                onClick={nextStep}
                className="w-1/2 bg-gradient-to-r from-blue-500 to-blue-600 py-2 rounded text-black font-semibold hover:opacity-90 transition"
              >
                {type === "buy" ? "Buy Now" : "Sell Now"}
              </button>
            </div>

            {/* Info text */}
            <p className="text-[10px] text-yellow-400">
              ⚠️ Your account will be credited 10–15 minutes after the order is
              triggered and fulfilled
            </p>
          </div>
        )}

        {/* Step 2: Payment Pending */}
        {step === 2 && (
          <div className="text-center px-4 py-6">
            <h2 className="text-xl font-semibold mb-1">
              Payment <span className="text-blue-400">Pending</span>
            </h2>
            <p className="text-sm text-white/70 mb-6">
              You have successfully triggered a {type} order.
            </p>

            <p className="text-xs text-white/50 mb-6 max-w-md mx-auto">
              You will be prompted to release the fund allocated for this
              transaction once the buyer facilitates the transaction
            </p>

            {/* Transaction Preview Box */}
            <div className="bg-black/30 border border-white/10 rounded-xl px-6 py-5 mb-6 max-w-md mx-auto">
              <h3 className="text-sm font-semibold text-white/50 mb-4">
                Transaction Preview
              </h3>

              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-white/70">Amount to {type} </p>
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
            <div className="bg-white/5 border border-yellow-500/40 text-left text-xs text-white/80 p-4 rounded mb-4 max-w-md mx-auto space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">⚠️</span>
                <div>
                  <p className="font-medium">
                    Payment is to be completed in approximately 15:00 minutes.
                  </p>
                  <p className="mt-1">
                    This order is pending and Surdatics Escrow has locked the
                    assets. You'll be notified to release funds once the buyer
                    facilitates the transaction.
                  </p>
                  <p className="mt-1 text-white/60 italic">
                    This order will be cancelled and your asset will be unlocked
                    and credited back to your wallet once transaction time
                    elapses.
                  </p>
                </div>
              </div>
            </div>

            {/* Timer (static for now) */}
            <p className="text-sm text-white/60 mb-4">
              Pending Payment:{" "}
              <span className="text-white">15 min : 00 sec</span>
            </p>

            {/* Release Funds (disabled initially) */}
            <button
              className="w-full max-w-md mx-auto bg-white/10 py-2 rounded text-white cursor-not-allowed"
              disabled
            >
              Release Funds
            </button>

            {/* Footer link */}
            <p className="text-xs text-white/50 mt-4" onClick={nextStep}>
              Facing a problem?{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Contact Us
              </a>
            </p>
          </div>
        )}

        {/* Step 3: Payment Facilitated*/}
        {step === 3 && (
          <div className="text-center px-4 py-6">
            <h2 className="text-xl font-semibold mb-1">
              Payment <span className="text-blue-400">Facilitated</span>
            </h2>
            <p className="text-sm text-white/70 mb-6">
              You have successfully triggered a {type} order.
            </p>

            <p className="text-xs text-white/50 mb-6 max-w-md mx-auto">
              You will be prompted to release the fund allocated for this
              transaction once the buyer facilitates the transaction
            </p>

            {/* Transaction Preview Box */}
            <div className="bg-black/30 border border-white/10 rounded-xl px-6 py-5 mb-6 max-w-md mx-auto">
              <h3 className="text-sm font-semibold text-white/50 mb-4">
                Transaction Preview
              </h3>

              <div className="flex justify-between items-center mb-2">
                <p className="text-sm text-white/70">Amount to {type} </p>
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
            <div className="bg-white/5 border border-yellow-500/40 text-left text-xs text-white/80 p-4 rounded mb-4 max-w-md mx-auto space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-yellow-400 mt-0.5">⚠️</span>
                <div>
                  <p className="font-medium">Payment Facilitated</p>
                  <p className="mt-1 text-yellow-400">
                    This order will be cancelled and your asset will be unlocked
                    and credited back to your wallet once transaction time
                    elapse
                  </p>
                </div>
              </div>
            </div>

            {/* Release Funds (disabled initially) */}
            <button
              className="w-full max-w-md mx-auto bg-blue-500 py-2 rounded text-white "
              onClick={nextStep}
            >
              Release Funds
            </button>

            {/* Footer link */}
            <p className="text-xs text-white/50 mt-4" onClick={nextStep}>
              Facing a problem?{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Contact Us
              </a>
            </p>
          </div>
        )}

        {/* Step 4: Transaction Reference */}
        {step === 4 && (
          <div className="text-center px-4 py-6">
            <h2 className="text-xl font-semibold mb-2">
              <span className="text-blue-400">Email</span> Verification
            </h2>

            <p className="text-sm text-white/70 mb-6">
              A 6-digit verification code has just been sent to your email
              address
              <br />
              <span className="text-blue-400 font-medium">
                joh*****@gmail.com
              </span>
            </p>

            {/* 6-Digit Input Boxes */}
            <div className="flex justify-center gap-3 mb-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  className="w-12 h-12 text-center text-lg font-semibold border border-white/10 rounded bg-black/30 text-white focus:outline-none focus:border-blue-500"
                  value={verificationCode[index] || ""}
                  onChange={(e) => handleCodeInput(e, index)}
                  onKeyDown={(e) => handleBackspace(e, index)}
                  data-index={index}
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 py-2 rounded-lg font-semibold"
            >
              Verify
            </button>
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="flex flex-col items-center justify-center py-10">
            <FaCheckCircle className="text-green-500 text-4xl mb-3" />
            <h2 className="text-lg font-semibold">Order Successful!</h2>
            <p className="text-sm text-white/60 mb-4">
              Your {type === "buy" ? "purchase" : "sale"} has been completed.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-500 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default P2POrderModal;
