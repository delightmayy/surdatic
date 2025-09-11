import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import SurveySuccessModal from "../../modal/SuccessModal";
import { useNavigate } from "react-router-dom";

interface Question {
  id: number;
  question: string;
  options: string[];
  answer?: string;
}

const mockQuestions: Question[] = [
  {
    id: 1,
    question: "What is your age group?",
    options: ["25-34", "35-44", "45-54", "55+"],
  },
  {
    id: 2,
    question: "What is your employment status?",
    options: ["Employed", "Unemployed", "Student", "Retired"],
  },
  {
    id: 3,
    question: "What is your highest level of education?",
    options: [
      "High School",
      "Bachelor's Degree",
      "Master's Degree",
      "PhD or higher",
    ],
  },
  {
    id: 4,
    question: "How often do you work remotely?",
    options: ["Never", "Occasionally", "Frequently", "Always"],
  },
  {
    id: 5,
    question: "How satisfied are you with your current job?",
    options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"],
  },
  {
    id: 6,
    question: "Which industry do you currently work in?",
    options: ["Technology", "Finance", "Healthcare", "Education"],
  },
  {
    id: 7,
    question: "How many hours do you work per week on average?",
    options: ["< 30", "30-40", "41-50", "50+"],
  },
  {
    id: 8,
    question:
      "Do you feel your workplace is safe and compliant with regulations?",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
  },
  {
    id: 9,
    question: "How often do you receive training on workplace safety?",
    options: ["Never", "Annually", "Biannually", "Quarterly"],
  },
  {
    id: 10,
    question: "Do you believe management takes safety concerns seriously?",
    options: ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"],
  },
  {
    id: 11,
    question: "Have you ever reported a safety concern at work?",
    options: ["Yes", "No"],
  },
  {
    id: 12,
    question: "Would you recommend your workplace to others?",
    options: ["Definitely", "Maybe", "Not Sure", "No"],
  },
  // Add more questions as needed
];

const SurveyQuestionPage = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<{ [key: number]: string }>({});
  const navigate = useNavigate();

  const currentQuestion = mockQuestions[currentIndex];
  const allAnswered = mockQuestions.every((q) => responses[q.id]);

  const handleOptionSelect = (option: string) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleNext = () => {
    if (currentIndex < mockQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white flex flex-col lg:flex-row">
      {/* Main Content */}
      <main className="flex-1 p-4 flex flex-col lg:flex-row gap-6">
        {/* Survey Question Body */}
        <section className="w-full lg:w-2/3 bg-black/30 p-4 rounded-xl shadow-md">
          <div>
            <div className="py-4">
              <p className="text-xs text-white/90 font-semibold">Survey Body</p>
              <p className="text-xs font-normal text-white/50 ">
                Your response, your reward
              </p>
            </div>

            <div className="text-xs max-w-fit mb-4  text-white/90  p-2 mt-2 bg-white/10 rounded">
              Progress Bar
            </div>
            <div className="bg-white/20 h-2 rounded mb-6">
              <div
                className="bg-blue-500 h-full rounded transition-all"
                style={{
                  width: `${
                    (Object.keys(responses).length / mockQuestions.length) * 100
                  }%`,
                }}
              />
            </div>

            {/* Question */}
            <div className="text-xs max-w-fit mb-4 flex items-center gap-2 text-white/90  p-2 mt-2 bg-white/10 rounded">
              Survey Question
              <span className="">
                ({currentIndex + 1}/{mockQuestions.length})
              </span>
            </div>
            <div className="bg-black/60 p-4 rounded-lg mb-6">
              <h3 className="text-white text-sm mb-2 font-bold">
                {currentQuestion.question}
              </h3>
              <ul className="space-y-2">
                {currentQuestion.options.map((opt, index) => (
                  <li
                    key={index}
                    className={`flex items-center p-3 rounded-lg cursor-pointer border  hover:bg-white/10 transition ${
                      responses[currentQuestion.id] === opt
                        ? "border-blue-500/50 text-white font-semibold"
                        : "border-white/10"
                    }`}
                    onClick={() => handleOptionSelect(opt)}
                  >
                    <span className="mr-2">
                      {responses[currentQuestion.id] === opt ? (
                        <FaCheckCircle className="text-white" />
                      ) : (
                        <div className="w-4 h-4 border border-white rounded-full" />
                      )}
                    </span>
                    {opt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Timer */}
            <div className="text-xs text-white/50 mb-4">
              Elapse Time: 5:43 (HH:MM)
            </div>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="w-full bg-white/10 text-white py-2 px-4 rounded disabled:opacity-40"
              >
                Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex === mockQuestions.length - 1}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
              >
                Next
              </button>
              {allAnswered && currentIndex === mockQuestions.length - 1 && (
                <button
                  onClick={() => {
                    console.log("Submitted Responses:", responses);
                    setShowSuccessModal(true);
                  }}
                  className=" w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded transition cursor-pointer"
                >
                  Submit Survey
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Question Monitor */}
        <aside className="w-full lg:w-1/3 bg-black/30 p-4 rounded-xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-sm text-white/60 mt-3 mb-3">Question Monitor</h3>
          <ul className="space-y-2">
            {mockQuestions.map((q, i) => (
              <li
                key={q.id}
                className={`flex items-center justify-between p-2 rounded cursor-pointer transition ${
                  i === currentIndex
                    ? "bg-blue-600 text-white font-semibold border border-blue-500"
                    : responses[q.id]
                    ? "border border-blue-400/50 text-white hover:bg-white/10"
                    : "border border-white/10 text-white hover:bg-white/10"
                }`}
                onClick={() => setCurrentIndex(i)}
              >
                <span>Question {String(i + 1).padStart(2, "0")}</span>
                {responses[q.id] && (
                  <FaCheckCircle className="text-blue-500 text-xs" />
                )}
              </li>
            ))}
          </ul>
        </aside>
        {showSuccessModal && (
          <SurveySuccessModal
            onClose={() => {
              setShowSuccessModal(false);
              navigate("/dashboard/surveys");
            }}
            title={"Survey Completed "}
            subtitle={"Your rewards automatically added to your wallet"}
            rewardAmount={50}
            titleB={"Survey Completed"}
            subtitleB={
              "Your reward will be automatically added to your wallet balance once your response is approved."
            }
            buttonA={"More Surveys"}
          />
        )}
      </main>
    </div>
  );
};

export default SurveyQuestionPage;
