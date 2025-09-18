import React, { useState } from "react";
import successImg from "../../img/succesimg.png"; // <-- adjust path
import { AiOutlineClose } from "react-icons/ai";

interface ApproveRespondentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: () => void; // callback for when approved
}

const ApproveRespondentModal: React.FC<ApproveRespondentModalProps> = ({
  isOpen,
  onClose,
  onApprove,
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0D0F12] border border-white/10 rounded-xl shadow-lg w-full max-w-md p-6 text-white relative">
        {/* Step 1: Confirmation */}
        {step === 1 && (
          <div className="text-center space-y-6">
            <div className=" flex  w-full text-start justify-between border-b-2 border-dashed border-b-white/30 mb-6">
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-white ">
                  Approve Response
                </h2>
                <p className="text-xs text-white/50">
                  Please confirm either you are pleased with this response or
                  not
                </p>
              </div>

              <AiOutlineClose size={24} className="" onClick={onClose} />
            </div>
            <h2 className="text-2xl font-semibold tracking-wider">
              Approve Response?
            </h2>
            <p className="text-sm text-white/90">
              Please approve only if you are pleased with this response
              <br />
              <span className="text-white/50 font-light ">
                The respondent will be rewarded once this response is approved
              </span>
            </p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={onClose}
                className="w-1/2 py-2 rounded-lg border border-white/20 text-white/80 hover:bg-white/10 transition"
              >
                Reject
              </button>
              <button
                onClick={() => {
                  setStep(2);
                  onApprove();
                }}
                className="w-1/2 py-2 rounded-lg bg-blue-500  hover:bg-blue-600 font-semibold transition"
              >
                Approve
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Success */}
        {step === 2 && (
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className=" flex  w-full text-start justify-between border-b-2 border-dashed border-b-white/30 mb-6">
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-white ">
                  Send Token
                </h2>
                <p className="text-xs text-white/50">
                  Send tokens from your assets to an external wallet address.
                </p>
              </div>

              <AiOutlineClose size={24} className="" onClick={onClose} />
            </div>

            <img
              src={successImg}
              alt="Success"
              className="w-24 h-24 object-contain"
            />
            <h2 className="text-xl font-semibold">Response Approved</h2>
            <p className="text-sm text-white/60">
              The respondent will be rewarded once this response is approved
            </p>
            <button
              onClick={() => {
                setStep(1); // reset for next time
                onClose();
              }}
              className="w-full bg-blue-500  hover:bg-blue-600 py-2 rounded-lg font-semibold transition"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveRespondentModal;
