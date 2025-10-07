import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import SurveySuccessModal from "../../modal/SuccessModal";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../api/useAuth";


interface Option {
  id: number;
  text: string;
  image?: string | null;
  file?: string | null;
}

interface Question {
  id: number;
  title: string;
  type: "radio" | "checkbox" | "select" | "text";
  required: boolean;
  option: Option[];
}

const SurveyQuestionPage = () => {
  const { id } = useParams(); 
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responses, setResponses] = useState<{ [key: number]: string | string[] }>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const { surveyDetailID } = useAuth();

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      if (id) {
        try {
          const res = await surveyDetailID(id);
          setQuestions(res.data.questions || []);
        } catch (error) {
          console.error("❌ Error fetching survey questions:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, [id]);

  const currentQuestion = questions[currentIndex];
  const allAnswered =
    questions.length > 0 && questions.every((q) => responses[q.id] && responses[q.id].length !== 0);

  // --- Handlers ---
  const handleOptionSelect = (option: string) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: option,
    }));
  };

  const handleCheckboxSelect = (option: string) => {
    setResponses((prev) => {
      const current = Array.isArray(prev[currentQuestion.id]) ? (prev[currentQuestion.id] as string[]) : [];
      const exists = current.includes(option);
      const updated = exists ? current.filter((o) => o !== option) : [...current, option];
      return { ...prev, [currentQuestion.id]: updated };
    });
  };

  const handleTextInput = (value: string) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setResponses((prev) => ({
      ...prev,
      [currentQuestion.id]: value,
    }));
  };

  const handleSubmitSurvey = async () => {
    try {
      const payload = Object.entries(responses).map(([question_id, answer]) => ({
        question_id: Number(question_id),
        answer: Array.isArray(answer) ? answer.join(", ") : answer,
      }));
/* 
      await axios.post(
        `https://api.surdatics.com/survey/${id}/submit`,
        { responses: payload },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ); */

      console.log(payload);
      

      setShowSuccessModal(true);
    } catch (error) {
      console.error("❌ Failed to submit survey:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0c0c] text-white flex items-center justify-center">
        <p>Loading survey...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0c0c] text-white flex flex-col lg:flex-row">
      <main className="flex-1 p-4 flex flex-col lg:flex-row gap-6">
        {/* Main Survey Section */}
        <section className="w-full lg:w-2/3 bg-black/30 p-4 rounded-xl shadow-md">
          {currentQuestion ? (
            <div>
              {/* Header */}
              <div className="py-4">
                <p className="text-xs text-white/90 font-semibold">Survey Body</p>
                <p className="text-xs font-normal text-white/50">Your response, your reward</p>
              </div>

              {/* Progress Bar */}
              <div className="text-xs max-w-fit mb-4 text-white/90 p-2 mt-2 bg-white/10 rounded">
                Progress
              </div>
              <div className="bg-white/20 h-2 rounded mb-6">
                <div
                  className="bg-blue-500 h-full rounded transition-all"
                  style={{
                    width: `${(Object.keys(responses).length / questions.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Section */}
              <div className="text-xs max-w-fit mb-4 flex items-center gap-2 text-white/90 p-2 mt-2 bg-white/10 rounded">
                Question ({currentIndex + 1}/{questions.length})
              </div>

              <div className="bg-black/60 p-4 rounded-lg mb-6">
                <h3 className="text-white text-sm mb-2 font-bold">
                  {currentQuestion.title}
                </h3>

                {/* RADIO TYPE */}
                {currentQuestion.type === "radio" && (
                  <ul className="space-y-2">
                    {currentQuestion.option.map((opt) => (
                      <li
                        key={opt.id}
                        className={`flex items-center p-3 rounded-lg cursor-pointer border hover:bg-white/10 transition ${
                          responses[currentQuestion.id] === opt.text
                            ? "border-blue-500/50 text-white font-semibold"
                            : "border-white/10"
                        }`}
                        onClick={() => handleOptionSelect(opt.text)}
                      >
                        <span className="mr-2">
                          {responses[currentQuestion.id] === opt.text ? (
                            <FaCheckCircle className="text-white" />
                          ) : (
                            <div className="w-4 h-4 border border-white rounded-full" />
                          )}
                        </span>
                        {opt.text}
                      </li>
                    ))}
                  </ul>
                )}

                {/* CHECKBOX TYPE */}
                {currentQuestion.type === "checkbox" && (
                  <ul className="space-y-2">
                    {currentQuestion.option.map((opt) => {
                      const selected =
                        Array.isArray(responses[currentQuestion.id]) &&
                        (responses[currentQuestion.id] as string[]).includes(opt.text);
                      return (
                        <li
                          key={opt.id}
                          className={`flex items-center p-3 rounded-lg cursor-pointer border hover:bg-white/10 transition ${
                            selected
                              ? "border-blue-500/50 text-white font-semibold"
                              : "border-white/10"
                          }`}
                          onClick={() => handleCheckboxSelect(opt.text)}
                        >
                          <span className="mr-2">
                            {selected ? (
                              <FaCheckCircle className="text-white" />
                            ) : (
                              <div className="w-4 h-4 border border-white rounded-md" />
                            )}
                          </span>
                          {opt.text}
                        </li>
                      );
                    })}
                  </ul>
                )}

                {/* SELECT TYPE */}
                {currentQuestion.type === "select" && (
                  <select
                    value={(responses[currentQuestion.id] as string) || ""}
                    onChange={(e) => handleSelectChange(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 text-white p-3 rounded-lg focus:outline-none focus:border-blue-500 mt-2"
                  >
                    <option value="" disabled>
                      Select an option
                    </option>
                    {currentQuestion.option.map((opt) => (
                      <option key={opt.id} value={opt.text}>
                        {opt.text}
                      </option>
                    ))}
                  </select>
                )}

                {/* TEXT TYPE */}
                {currentQuestion.type === "text" && (
                  <textarea
                    rows={3}
                    value={(responses[currentQuestion.id] as string) || ""}
                    onChange={(e) => handleTextInput(e.target.value)}
                    className="w-full bg-black/30 text-white border border-white/10 rounded-lg p-3 mt-2 focus:outline-none focus:border-blue-500"
                    placeholder="Type your answer..."
                  />
                )}
              </div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentIndex === 0}
                  className="w-full bg-white/10 text-white py-2 px-4 rounded disabled:opacity-40"
                >
                  Previous
                </button>
                {currentIndex < questions.length - 1 ? (
                  <button
                    onClick={() =>
                      setCurrentIndex((prev) =>
                        Math.min(prev + 1, questions.length - 1)
                      )
                    }
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitSurvey}
                    disabled={!allAnswered}
                    className="w-full bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded transition cursor-pointer disabled:opacity-40"
                  >
                    Submit Survey
                  </button>
                )}
              </div>
            </div>
          ) : (
            <p>No questions found for this survey.</p>
          )}
        </section>

        {/* Question Monitor */}
        <aside className="w-full lg:w-1/3 bg-black/30 p-4 rounded-xl max-h-[80vh] overflow-y-auto">
          <h3 className="text-sm text-white/60 mt-3 mb-3">Question Monitor</h3>
          <ul className="space-y-2">
            {questions.map((q, i) => (
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
                {responses[q.id] && <FaCheckCircle className="text-blue-500 text-xs" />}
              </li>
            ))}
          </ul>
        </aside>

        {/* Success Modal */}
        {showSuccessModal && (
          <SurveySuccessModal
            onClose={() => {
              setShowSuccessModal(false);
              navigate("/dashboard/surveys");
            }}
            title="Survey Completed"
            subtitle="Your rewards have been automatically added to your wallet"
            rewardAmount={50}
            titleB="Survey Completed"
            subtitleB="Your reward will be automatically added to your wallet balance once approved."
            buttonA="More Surveys"
          />
        )}
      </main>
    </div>
  );
};

export default SurveyQuestionPage;
