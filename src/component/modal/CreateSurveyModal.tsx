import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import surveyhelp from "../../img/surveyhelpicon.png";
import surveychat from "../../img/Chat.png";
import surveyrew from "../../img/surveyrewardicon.png";
import surveyexp from "../../img/surveyexpire.png";
import surdatoken from "../../img/SurdaToken.png";
import CreateVideoModal from "./CreatevideoModal";

const CreateSurveyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [openVideo, setOpenVideo] = useState(false);

  // Form states (can later be lifted or saved in context)
  const [surveyType, setSurveyType] = useState("form");
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const optionTypes = ["Text", "Multiple Choices", "Check boxes", "Drop downs"];

  const [validFromDate, setValidFromDate] = useState("");
  const [validFromTime, setValidFromTime] = useState("");
  const [validToDate, setValidToDate] = useState("");
  const [validToTime, setValidToTime] = useState("");

  const [budget, setBudget] = useState("");
  const [requiredResponses, setRequiredResponses] = useState("");
  const [requiredValidations, setRequiredValidations] = useState("");

  const [showValidity, setShowValidity] = useState(true);
  const [showAudience, setShowAudience] = useState(true);

  const [requiredAmount, setRequiredAmount] = useState("");
  const [, /* totalQuestions */ setTotalQuestions] = useState(" ");

  const [keyDataPoints, setKeyDataPoints] = useState<
    {
      value: string;
      collapsed: boolean;
      questions: { text: string; type: string; answers: string[] }[];
    }[]
  >([
    {
      value: "",
      collapsed: false,
      questions: [{ text: "", type: "Text", answers: [""] }],
    },
  ]);

  // Add new answer to a question
  const handleAddAnswer = (dpIndex: number, qIndex: number) => {
    const updated = [...keyDataPoints];
    updated[dpIndex].questions[qIndex].answers.push("");
    setKeyDataPoints(updated);
  };

  // Update answer text
  const handleAnswerChange = (
    dpIndex: number,
    qIndex: number,
    aIndex: number,
    value: string
  ) => {
    const updated = [...keyDataPoints];
    updated[dpIndex].questions[qIndex].answers[aIndex] = value;
    setKeyDataPoints(updated);
  };

  // Add new question to a key data point
  const handleAddQuestion = (dpIndex: number) => {
    const updated = [...keyDataPoints];
    updated[dpIndex].questions.push({ text: "", type: "Text", answers: [""] });
    setKeyDataPoints(updated);
  };

  // Add new key data point
  const handleAddKeyDataPoint = () => {
    setKeyDataPoints([
      ...keyDataPoints,
      {
        value: "",
        collapsed: false,
        questions: [{ text: "", type: "Text", answers: [""] }],
      },
    ]);
  };

  const allQuestions = keyDataPoints.flatMap((kdp) => kdp.questions);
  /*  console.log(allQuestions); */

  const totalResponseCost = Number(requiredResponses || 0) * 10;
  const totalValidationCost = Number(requiredValidations || 0) * 100;
  const totalQuestionCost = Number(allQuestions.length) * 20;

  const nextStep = () => setStep((s) => Math.min(s + 1, 6));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = () => {
    // flatten all questions from keyDataPoints
    // const allQuestions = keyDataPoints.flatMap((kdp) => kdp.questions);

    console.log("Survey submitted ✅", {
      surveyType,
      topic,
      body,
      coverImageFile,
      /*   questions, */
      keyDataPoints,
      budget,
      requiredResponses,
      requiredValidations,
    });
    onClose();
  };

  return (
    <>
      {" "}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex px-4 items-center justify-center bg-black/60"
      >
        <div
          className="w-full max-w-xl bg-[#111] max-h-[85vh] overflow-y-auto border border-white/10 rounded-2xl shadow-lg p-6 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b-2 border-dashed border-b-white/20 pb-3 my-3">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Create Survey
              </h2>
              <p className="text-sm text-white/50">
                Design, customize, and publish surveys to gather meaningful
                insights effortlessly.
              </p>
            </div>
            <AiOutlineClose
              size={22}
              className="text-gray-400 hover:text-white cursor-pointer"
              onClick={onClose}
            />
          </div>

          {/* Progress */}
          <div className="mt-6 text-sm text-white/70 my-2">
            <div className="mb-2  flex items-center justify-between">
              <span className="font-medium bg-white/15 rounded p-1 px-2 ">
                {step === 1 && "Survey Type"}
                {step === 2 && "Survey Details"}
                {step === 3 && "Questions & Key Data Points"}
                {step === 4 && "Survey Configuration"}
                {step === 5 && "Responses, Validation & Rewards"}
                {step === 6 && "Preview"}
              </span>
              <span className="text-xs text-white/40">(Step {step}/6)</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-500 rounded-full"
                style={{ width: `${(step / 6) * 100}%` }}
              />
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-6 space-y-8"
              >
                <p className="text-white/70 text-sm">
                  Choose your survey type:
                </p>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => setSurveyType("form")}
                    className={`flex-1 py-3 rounded-md border cursor-pointer ${
                      surveyType === "form"
                        ? "bg-black/50  text-blue-400 border-sky-500/50"
                        : " bg-white/3 text-white/70 border-white/10"
                    }`}
                  >
                    Form Survey
                  </button>
                  <button
                    onClick={() => setOpenVideo(true)}
                    className={`flex-1 py-3 rounded-md border cursor-pointer  ${
                      surveyType === "video"
                        ? "bg-black/50 text-blue-400 border-sky-500/50"
                        : "bg-white/3 text-white/70 border-white/10"
                    }`}
                  >
                    Video Survey
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" className="mt-6 space-y-6">
                <input
                  type="text"
                  placeholder="Survey Topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full bg-white/3 border border-white/10 rounded-md text-white px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
                <textarea
                  placeholder="Survey Body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  className="w-full bg-white/3  border border-white/10 rounded-md text-white px-4 py-3 text-sm h-28 focus:outline-none focus:ring-1 focus:ring-sky-500"
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-white">
                    Cover Image
                  </label>

                  <div className="flex items-center space-x-4">
                    {/* Upload Box */}
                    <label className="flex flex-col items-center justify-center w-32 h-28 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-sky-500 transition">
                      <span className="text-sm text-white/60">Upload file</span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            setCoverImageFile(file);
                            setCoverImage(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>

                    {/* Upload button */}
                    <button
                      type="button"
                      className="px-4 py-2 text-sm bg-white/10 border border-white/20 rounded-md text-white hover:bg-sky-500/20 transition"
                      onClick={() =>
                        document
                          .querySelector<HTMLInputElement>("input[type=file]")
                          ?.click()
                      }
                    >
                      Upload from file
                    </button>
                  </div>

                  {/* File requirements */}
                  <p className="text-xs text-gray-400 mt-2">
                    <span className="mr-4">
                      File Size: <span className="text-white">10KB - 2MB</span>
                    </span>
                    <span>
                      File Format:{" "}
                      <span className="text-sky-400">(JPEG/PNG)</span>
                    </span>
                  </p>

                  {/* Preview */}
                  {coverImage && (
                    <img
                      src={coverImage}
                      alt="Preview"
                      className="mt-3 w-32 h-32 object-cover rounded-md border border-white/10"
                    />
                  )}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" className="mt-6 space-y-6">
                <button className="w-full py-2 font-semibold rounded-md bg-sky-500/80 text-white/70 border-white/10 text-sm">
                  Generate Questions with Surdatic AI
                </button>

                {keyDataPoints.map((point, dpIndex) => (
                  <div
                    key={dpIndex}
                    className="bg-black/40 p-4 rounded-lg space-y-3 border border-white/10"
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-white text-sm font-medium">
                        Key data point {dpIndex + 1}
                      </p>
                      <button
                        onClick={() => {
                          const updated = [...keyDataPoints];
                          updated[dpIndex].collapsed =
                            !updated[dpIndex].collapsed;
                          setKeyDataPoints(updated);
                        }}
                        className="text-sky-500 text-xs"
                      >
                        {point.collapsed ? "Expand" : "Minimize"}
                      </button>
                    </div>

                    {!point.collapsed && (
                      <>
                        {/* Data Point Input */}
                        <input
                          type="text"
                          value={point.value}
                          onChange={(e) => {
                            const updated = [...keyDataPoints];
                            updated[dpIndex].value = e.target.value;
                            setKeyDataPoints(updated);
                          }}
                          placeholder="Demographics |"
                          className="w-full rounded-md bg-black/20 border border-white/20 px-3 py-2 text-white text-sm placeholder-white/30"
                        />

                        {/* Questions */}
                        {point.questions.map((q, qIndex) => (
                          <div
                            key={qIndex}
                            className="mt-4 bg-black/30 rounded-lg p-4 space-y-3 border border-white/10"
                          >
                            <p className="text-white/70 text-sm">
                              Question {qIndex + 1}
                            </p>
                            <textarea
                              value={q.text}
                              onChange={(e) => {
                                const updated = [...keyDataPoints];
                                updated[dpIndex].questions[qIndex].text =
                                  e.target.value;
                                setKeyDataPoints(updated);
                              }}
                              placeholder="Enter your question"
                              className="w-full rounded-md bg-black/20 border border-white/20 px-3 py-2 text-white text-sm placeholder-white/30"
                              rows={2}
                            />

                            {/* Dynamic Answer Inputs */}
                            <div className="space-y-2">
                              {q.answers.map((ans, aIndex) => (
                                <input
                                  key={aIndex}
                                  type="text"
                                  value={ans}
                                  onChange={(e) =>
                                    handleAnswerChange(
                                      dpIndex,
                                      qIndex,
                                      aIndex,
                                      e.target.value
                                    )
                                  }
                                  placeholder="Answer Preview"
                                  className="w-full rounded-md bg-black/20 border border-white/20 px-3 py-2 text-white text-sm placeholder-white/30"
                                />
                              ))}
                            </div>

                            {/* Option Type Selector */}
                            <div className="flex items-center gap-2">
                              <span className="text-white/60 text-sm">
                                Select Option Type
                              </span>
                              <select
                                value={q.type}
                                onChange={(e) => {
                                  const updated = [...keyDataPoints];
                                  updated[dpIndex].questions[qIndex].type =
                                    e.target.value;
                                  setKeyDataPoints(updated);
                                }}
                                className="bg-black text-white text-sm rounded-md border border-white/20 px-2 py-1"
                              >
                                {optionTypes.map((opt) => (
                                  <option
                                    className="bg-white/10!"
                                    key={opt}
                                    value={opt}
                                  >
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            </div>

                            {/* Add Answer Option */}
                            <button
                              onClick={() => handleAddAnswer(dpIndex, qIndex)}
                              className="text-sky-500 text-sm mt-2"
                            >
                              + Add Answer Option
                            </button>
                          </div>
                        ))}

                        {/* Add New Question */}
                        <button
                          onClick={() => handleAddQuestion(dpIndex)}
                          className="w-full py-2 rounded-md bg-black/50  text-blue-400 border border-sky-500/50 text-sm mt-3"
                        >
                          + Add New Question
                        </button>
                      </>
                    )}
                  </div>
                ))}

                {/* Add New Key Data Point */}
                <button
                  onClick={handleAddKeyDataPoint}
                  className="w-full py-2 rounded-md bg-white/10 text-white/70 border-white/10 text-sm"
                >
                  + Add New Key Data Point
                </button>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="step4" className="mt-6 space-y-6">
                {/* Survey Validity */}
                <div className="bg-black/30 rounded-lg border border-white/10">
                  <button
                    onClick={() => setShowValidity(!showValidity)}
                    className="w-full flex justify-between items-center px-4 py-3 text-white/70 text-sm"
                  >
                    <span>Survey Validity</span>
                    <span className="text-xs">{showValidity ? "▲" : "▼"}</span>
                  </button>
                  {showValidity && (
                    <div className="px-4 pb-4 space-y-4">
                      {/* Valid From */}
                      <div>
                        <label className="block text-xs text-white/50 mb-1">
                          Valid From
                        </label>
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="date"
                            value={validFromDate}
                            onChange={(e) => setValidFromDate(e.target.value)}
                            className="flex-1 bg-white/10 border border-white/10 rounded-md text-white px-3 py-2 text-sm"
                          />
                          <input
                            type="time"
                            value={validFromTime}
                            onChange={(e) => setValidFromTime(e.target.value)}
                            className="w-32 bg-white/10 border border-white/10 rounded-md text-white px-3 py-2 text-sm"
                          />
                          <button className="scale-90 border border-blue-400/20 text-blue-400 text-xs px-3 py-2 rounded-md">
                            Create Schedule
                          </button>
                        </div>
                      </div>
                      {/* Valid To */}
                      <div>
                        <label className="block text-xs text-white/50 mb-1">
                          Valid To
                        </label>
                        <div className="flex flex-wrap items-center gap-2">
                          <input
                            type="date"
                            value={validToDate}
                            onChange={(e) => setValidToDate(e.target.value)}
                            className="flex-1 bg-white/10 border border-white/10 rounded-md text-white px-3 py-2 text-sm"
                          />
                          <input
                            type="time"
                            value={validToTime}
                            onChange={(e) => setValidToTime(e.target.value)}
                            className="w-32 bg-white/10 border border-white/10 rounded-md text-white px-3 py-2 text-sm"
                          />
                          <button className="scale-90 border border-blue-400/20 text-blue-400 text-xs px-3 py-2 rounded-md">
                            Create Schedule
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Target Audience */}
                <div className="bg-black/30 rounded-lg border border-white/10">
                  <button
                    onClick={() => setShowAudience(!showAudience)}
                    className="w-full flex justify-between items-center px-4 py-3 text-white/70 text-sm"
                  >
                    <span>Target Audience</span>
                    <span className="text-xs">{showAudience ? "▲" : "▼"}</span>
                  </button>
                  {showAudience && (
                    <div className="px-4 pb-4 space-y-4">
                      {/* Info Note */}
                      <div className="bg-amber-500/5 border border-amber-500/30 text-amber-500 text-xs rounded-md px-3 py-2">
                        Specify the demographic or criteria that best represent
                        the group you want to survey. This information helps
                        tailor your questions and analysis
                      </div>

                      {/* Audience Select */}
                      <div>
                        <label className="block text-xs text-white/50 mb-1">
                          Select Target Audience
                        </label>
                        <div className="flex gap-2">
                          <button className="flex-1 bg-white/10  cursor-pointer text-blue-500 py-2 text-sm rounded-md">
                            Public (Access to anyone)
                          </button>
                          <button className="flex-1 bg-white/10 cursor-pointer border border-white/10 text-blue-500 py-2 text-sm rounded-md">
                            Limited Access
                          </button>
                        </div>
                      </div>

                      {/* Age Restriction */}
                      <div>
                        <label className="block text-xs text-white/50 mb-1">
                          Age Restriction
                        </label>
                        <input
                          type="range"
                          min="12"
                          max="64"
                          className="w-full"
                        />
                        <div className="flex justify-between text-xs text-white/50">
                          <span>12</span>
                          <span>64</span>
                        </div>
                      </div>

                      {/* Gender */}
                      <div>
                        <label className="block text-xs text-white/50 mb-1">
                          Gender
                        </label>
                        <select className="w-full bg-black/80 text-blue-400 border border-white/10 rounded-md  px-3 py-2 text-sm">
                          <option>Male</option>
                          <option>Female</option>
                          <option>Other</option>
                        </select>
                      </div>

                      {/* Profession */}
                      <div>
                        <label className="block text-xs text-white/50 mb-1">
                          Profession
                        </label>
                        <select className="w-full bg-black/80 border border-white/10 rounded-md text-blue-400 px-3 py-2 text-sm">
                          <option>All</option>
                          <option>Student</option>
                          <option>Engineer</option>
                          <option>Doctor</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div key="step5" className="mt-6 space-y-6">
                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Survey Budget
                  </label>
                  <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-md text-white px-4 py-3 text-sm"
                  />
                  <p className="text-xs text-white/40">
                    ({Number(budget || 0).toLocaleString()} Sundos)
                  </p>
                </div>

                {/* Rewards Range */}
                <div>
                  <label className="block text-xs text-white/50 mb-1">
                    Survey Rewards
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50000"
                    value={requiredAmount}
                    onChange={(e) => setRequiredAmount(e.target.value)}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-white/50">
                    <span>1 $</span>
                    <span className="text-blue-500">{requiredAmount} $</span>
                    <span>100 $</span>
                  </div>
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={requiredAmount}
                    onChange={(e) => setRequiredAmount(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-md text-white px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Required Responses
                  </label>
                  <input
                    type="number"
                    value={requiredResponses}
                    onChange={(e) => setRequiredResponses(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-md text-white px-4 py-3 text-sm"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Response Cost ( Surda)
                  </label>
                  <input
                    type="text"
                    value={totalResponseCost.toLocaleString()}
                    disabled
                    onChange={(e) => setRequiredResponses(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-md text-white px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Required Validators
                  </label>
                  <input
                    type="number"
                    value={requiredValidations}
                    onChange={(e) => setRequiredValidations(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-md text-white px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Validation Cost (SURDA)
                  </label>
                  <input
                    type="text"
                    value={totalValidationCost.toLocaleString()}
                    onChange={(e) => setRequiredValidations(e.target.value)}
                    disabled
                    className="w-full bg-black/50 border border-white/10 rounded-md text-white px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Total Number of Questions
                  </label>
                  <input
                    type="number"
                    value={allQuestions.length}
                    onChange={(e) => setTotalQuestions(e.target.value)}
                    disabled
                    className="w-full bg-black/30 border border-white/10 rounded-md text-white/70 px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Total Cost (Surda)
                  </label>
                  <input
                    type="text"
                    value={totalQuestionCost.toLocaleString()}
                    disabled
                    onChange={(e) => setTotalQuestions(e.target.value)}
                    className="w-full bg-black/30 border border-white/10 rounded-md text-white/70 px-4 py-3 text-sm"
                  />
                </div>
              </motion.div>
            )}

            {step === 6 && (
              <motion.div key="step6" className="mt-6 space-y-6">
                <img
                  src={
                    coverImage ||
                    "https://via.placeholder.com/500x250.png?text=Cover+Image"
                  }
                  alt="Survey Cover"
                  className="w-full h-48 object-cover rounded-lg border border-white/10"
                />
                <div>
                  <h3 className="font-medium text-xs bg-white/15 rounded p-1 px-3 w-fit ">
                    Date
                  </h3>
                  <p className="text-white/60 text-xs font-semibold leading-tight mt-1">
                    From:{" "}
                    <span className="">
                      {validFromDate} {validFromTime}
                    </span>
                  </p>
                  <p className="text-white/60 text-xs font-semibold leading-tight mt-1">
                    To:{" "}
                    <span className="">
                      {validToDate} {validToTime}
                    </span>
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-xs bg-white/15 rounded p-1 px-3 w-fit ">
                    Topic
                  </h3>
                  <p className="text-white text-lg font-semibold leading-tight">
                    {topic}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-xs bg-white/15 rounded p-1 px-3 w-fit ">
                    Body
                  </h3>
                  <p className="text-sm text-white/60">{body}</p>{" "}
                </div>

                <div>
                  <h3 className="font-medium text-xs bg-white/15 rounded p-1 px-3 w-fit ">
                    Key Data Points to Collect
                  </h3>
                  <ul className="list-disc list-inside text-white/50 space-y-1">
                    {keyDataPoints.map((d, i) => (
                      <li key={i}>{d.value}</li>
                    ))}
                  </ul>
                </div>

                <h3 className="font-medium text-xs bg-white/15 rounded p-1 px-3 w-fit ">
                  More Details
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mt-4">
                  <div className="bg-black/50 p-2  flex items-center justify-center gap-3 rounded shadow-inner shadow-white/30 hover:scale-95  ">
                    <p className="rounded-full bg-white/15 p-1.5 hidden sm:block">
                      <img src={surveyhelp} alt=".." className="w-6 " />
                    </p>

                    <p className="text-xs font-semibold text-white/90">
                      Survey Questions
                    </p>
                    <p className="text-xs  font-normal  text-white/30">
                      (0 / {allQuestions.length})
                    </p>
                  </div>

                  <div className="bg-black/50 p-2  flex items-center justify-center gap-3 rounded shadow-inner shadow-white/30 hover:scale-95">
                    <p className="rounded-full bg-white/15 p-1.5 hidden sm:block ">
                      <img src={surveychat} alt=".." className="w-6 " />
                    </p>

                    <p className="text-xs text-white/90 font-semibold">
                      Required Responses
                    </p>
                    <p className="text-xs font-normal text-wrap text-white/30  ">
                      (0/{requiredResponses})
                    </p>
                  </div>
                </div>

                {/* Stats (Responses & Expiry) */}
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 -mt-4">
                  <div className="bg-black/50 p-2  flex items-center justify-center gap-3 rounded shadow-inner shadow-white/30 hover:scale-95">
                    <p className="rounded-full bg-white/15 p-1.5 hidden sm:block">
                      <img src={surveyrew} alt=".." className="w-6 " />
                    </p>

                    <p className="text-xs font-semibold  text-white/90">
                      Reward
                    </p>
                    <p className="text-xs font-normal text-white/30 flex items-center gap-1">
                      <img
                        src={surdatoken}
                        alt=""
                        className=" hidden sm:block w-6"
                      />
                      {requiredAmount}
                    </p>
                  </div>
                  <div className="bg-black/50 p-2  flex items-center justify-center gap-3 rounded shadow-inner shadow-white/30 hover:scale-95">
                    <p className="rounded-full bg-white/15 p-1.5 hidden sm:block">
                      <img src={surveyexp} alt=".." className="w-6 " />
                    </p>
                    <p className="text-xs text-white/90 font-semibold">
                      Expiry
                    </p>
                    <p className="text-xs font-normal text-white/30 ">
                      {validToDate}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-8 flex justify-between gap-4">
            {step > 1 ? (
              <button
                className="w-1/2 py-3 rounded-md bg-black/70 border border-white/10 text-white hover:bg-black/90"
                onClick={prevStep}
              >
                Back
              </button>
            ) : (
              <span />
            )}
            {step < 6 ? (
              <button
                className="w-1/2 py-3 rounded-md bg-gradient-to-r from-sky-600 to-blue-500 text-white hover:opacity-90"
                onClick={nextStep}
                disabled={step === 1 && !surveyType}
              >
                Proceed
              </button>
            ) : (
              <button
                className="w-1/2 py-3 rounded-md bg-gradient-to-r from-sky-600 to-blue-500 text-white hover:opacity-90"
                onClick={handleSubmit}
              >
                Create Survey
              </button>
            )}
          </div>
        </div>
      </motion.div>
      {openVideo && <CreateVideoModal onClose={() => setOpenVideo(false)} />}
    </>
  );
};

export default CreateSurveyModal;
