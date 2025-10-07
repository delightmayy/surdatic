import React, { useState } from "react";
import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import ApproveRespondentModal from "./ApproveRespondentModal";

interface user {
  address: string;
}
interface Answer {
  id: number;
  question_title: string;
  question_type: string;
  text: string;
  options: any[];
  created_at: string;
  updated_at: string;
  file: string | null;
  image: string | null;
  question: number;
  response: string;
  user: string;
}

type Respondent = {
  answers: Answer[];
  created_at: string;
  id: number;
  user: user;
  avatarUrl: string;
  responseNumber: number;
  validation?: "Validated" | "Pending";
  status: "PENDING" | "APPROVED" | "REJECTED" | "COMPLETED";
};

interface RespondentViewModalProps {
  respondent: Respondent | undefined;
  onClose: () => void;
}

const ViewRespondentQuestion: React.FC<RespondentViewModalProps> = ({
  respondent,
  onClose,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  if (!respondent || respondent === undefined) return null;
  console.log(respondent);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 flex px-4 items-center justify-center bg-black/60"
    >
      <div
        className="w-full max-w-3xl bg-[#111] max-h-[85vh] overflow-y-auto border border-white/10 rounded-2xl shadow-lg p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start border-b-2 border-dashed border-b-white/20 pb-3">
          <div>
            <h2 className="text-xl font-semibold text-white">
              Respondent Details
            </h2>
            <p className="text-sm text-white/50">
              View full Respondent Questions and Answers.
            </p>
          </div>
          <AiOutlineClose
            size={22}
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Transaction Info */}

        <div className="p-6 px-3 text-white overflow-y-auto max-h-[70vh]">
          <div className="mb-10">
            <p className="text-sm text-center mb-4">Respondent Address</p>
            <p className="text-sm text-center text-blue-400 mb-4">
              {respondent.user.address}
            </p>

            {respondent.answers?.map((q, qi) => (
              <div key={qi} className="mb-8 bg-black/25 rounded-xl p-4 shadow">
                <h3 className="text-base font-semibold mb-4  bg-black/20 px-4 pt-4 pb-12 rounded-md shadow shadow-white/15 flex items-start gap-2">
                  <span className="text-blue-400">{qi + 1}.</span>
                  {q.question_title}
                </h3>

                <div className="space-y-3">
                  <p className=" font-semibold  mb-2 text-xs max-w-fit text-white/90  p-2 mt-2 bg-white/5 rounded">
                    {q.question_type}
                  </p>

                  <div className="flex items-center gap-2 text-white/55 shadow-inner shadow-blue-400/30  px-4 py-3 mt-4 rounded-2xl font-normal text-xs border border-blue-400/10 ">
                    Response:
                    <p className="flex items-center gap-1 text-blue-400">
                      <FaUser />
                      <span className="font-semibold ">{q.text}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row sm:w-max-w-lg gap-4">
              <button
                onClick={onClose}
                className="bg-white/15 hover:bg-white/25 w-full  px-4 py-3 rounded text-sm cursor-pointer "
              >
                Close
              </button>
              <button
                onClick={() => setModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-500 w-full  text-center px-4 py-3 rounded text-sm transition cursor-pointer"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      </div>

      <ApproveRespondentModal
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          onClose();
        }}
        onApprove={() => console.log("checking approve")}
      />
    </motion.div>
  );
};

export default ViewRespondentQuestion;
