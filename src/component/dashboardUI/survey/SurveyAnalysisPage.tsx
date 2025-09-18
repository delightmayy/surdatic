import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import type { MarketPlaceData } from "../../../context/DataContext";
import surveyhelp from "../../../img/surveyhelpicon.png";
import surveychat from "../../../img/Chat.png";
import surveyrew from "../../../img/surveyrewardicon.png";
import surdatoken from "../../../img/SurdaToken.png";
import { FaArrowLeft, FaStar, FaUser, FaUsers } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiPlusSquare } from "react-icons/fi";
import surveyexp from "../../../img/surveyexpire.png";
import ApproveRespondentModal from "../../modal/ApproveRespondentModal";

interface SurveyQuestionData {
  title: string;
  sections: {
    title: string;
    questions: {
      id: string;
      text: string;
      type: string;
      options: { value: string; responses: number }[];
      totalResponses: number;
    }[];
  }[];
}

type Respondent = {
  id: number;
  date: string;
  email: string;
  avatarUrl: string;
  responseNumber: number;
  validation: "Validated" | "Pending";
  approvalStatus: "Pending" | "Approved" | "Rejected";
};

const mockRespondentData: Respondent[] = [
  {
    id: 1,
    date: "12/03/25",
    email: "jitu@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    responseNumber: 1000,
    validation: "Validated",
    approvalStatus: "Pending",
  },
  {
    id: 2,
    date: "12/03/25",
    email: "jitu@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=2",
    responseNumber: 1000,
    validation: "Validated",
    approvalStatus: "Pending",
  },
  {
    id: 3,
    date: "12/03/25",
    email: "jitu@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    responseNumber: 1000,
    validation: "Validated",
    approvalStatus: "Rejected",
  },
  {
    id: 4,
    date: "12/03/25",
    email: "jitu@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=4",
    responseNumber: 1000,
    validation: "Validated",
    approvalStatus: "Approved",
  },
  {
    id: 5,
    date: "12/03/25",
    email: "jitu@example.com",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    responseNumber: 1000,
    validation: "Pending",
    approvalStatus: "Pending",
  },
];

const mockQuestionDAta = {
  surveyId: "abc123",
  title: "Demographics Survey",
  sections: [
    {
      title: "Section 1 - Demographics",
      questions: [
        {
          id: "q1",
          text: "What is your age group?",
          type: "single-choice",
          options: [
            { value: "25-34", responses: 40 },
            { value: "35-44", responses: 30 },
            { value: "45-54", responses: 20 },
            { value: "55+", responses: 10 },
          ],
          totalResponses: 100,
        },
        {
          id: "q2",
          text: "What is your gender?",
          type: "single-choice",
          options: [
            { value: "Male", responses: 60 },
            { value: "Female", responses: 40 },
          ],
          totalResponses: 100,
        },
      ],
    },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "Validated":
    case "Approved":
      return "text-green-400";
    case "Pending":
      return "text-yellow-400";
    case "Rejected":
      return "text-red-500";
    default:
      return "text-white";
  }
};

const SurveyAnalysisPage = () => {
  const { id } = useParams();
  const { marketPlaceData } = useContext(DataContext)!;
  const navigate = useNavigate();

  const [survey, setSurveyData] = useState<MarketPlaceData | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [overveiwTab, setOverveiwTab] = useState<
    "details" | "questions" | "respondents"
  >("details");

  const [QuestionData, setQuestionData] = useState<SurveyQuestionData | null>(
    null
  );
  const [respondentData, setRespondentData] = useState<Respondent[] | null>(
    null
  );

  const handleApproveAllRespondent = () => {
    // Implement API call to approve all
    console.log("Approving all respondents...");
  };

  const handleViewRespondent = (id: number) => {
    // Navigate or show modal
    console.log("Viewing response for:", id);
    setModalOpen(true)
  };

  useEffect(() => {
    const found = marketPlaceData.find((s) => s.id === id);
    setSurveyData(found ?? null);
  }, [id, marketPlaceData]);

  // setting question data
  useEffect(() => {
    setQuestionData(mockQuestionDAta);
    setRespondentData(mockRespondentData);
    /*   fetch("/api/surveys/abc123/results")
      .then((res) => res.json())
      .then((data) => setSurvey(data))
      .catch((err) => console.error(err)); */
  }, []);

  if (!survey) return <div className="text-white p-4">Loading...</div>;
  if (!QuestionData) return <div className="text-white">Loading...</div>;

  return (
    <div className="text-white   pt-2 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col  gap-4">
        {/* heading */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="">
            <h1 className="text-2xl font-semibold">Surveys</h1>
            <p className="text-xs mt-1">
              Track your completed surveys, survey status, and monitor your
              progress
            </p>
          </div>
          <div className="flex items-center border-2 rounded-tl-xl  rounded-bl-xl border-white/20 mt-6 mt:pt-0  ">
            <button
              /*  onClick={() => setShowKyc(true)} */
              className="flex gap-1 items-center  sm:mt-0 px-4  py-2 rounded hover:bg-white/10 text-sm text-white"
            >
              Become a Validator
            </button>
            <button className="flex gap-1 items-center sm:mt-0 px-4 py-2  bg-sky-700 hover:bg-sky-600 text-sm text-white">
              <FiPlusSquare size={18} />
              Create Survey
            </button>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <p
            onClick={() => navigate(-1)}
            className="text-xs cursor-pointer text-white/40 flex gap-1 items-center font-semibold"
          >
            <FaArrowLeft
              size={28}
              className="p-2 rounded-full shadow-inner shadow-white/40"
            />
            Created Survey
          </p>
          <p className="text-xs font-semibold text-white/90 flex gap-1 items-center">
            <FaArrowRightLong size={20} className="h-4 text-white/60" />
            Completed Survey
          </p>
          <p className="text-xs font-semibold text-white/90 flex gap-1 items-center">
            <FaArrowRightLong size={20} className="h-4 text-white/60" />
            Completed Survey
          </p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-6 text-xs  border-t border-white/10 mb-6">
          <button
            onClick={() => setOverveiwTab("details")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              overveiwTab === "details"
                ? "border-sky-500 text-blue-400"
                : "border-black/70 text-white/55"
            }`}
          >
            Survey Details
          </button>
          <button
            onClick={() => setOverveiwTab("questions")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              overveiwTab === "questions"
                ? "border-sky-500 text-blue-400"
                : "border-black/70 text-white/55"
            }`}
          >
            Survey Questions
          </button>
          <button
            onClick={() => setOverveiwTab("respondents")}
            className={`pb-2 border-t-2   font-semibold py-1 ${
              overveiwTab === "respondents"
                ? "border-sky-500 text-blue-400"
                : "border-black/70 text-white/55"
            }`}
          >
            Respondents
          </button>
        </div>

        {/*  Survey Details */}
        {overveiwTab === "details" && (
          <div className="w-full bg-black/5 ">
            {/* Meta Info */}
            <div className="text-xs max-w-fit text-white/90 mb-1 ms-4 p-2 px-4 mt-2 bg-white/10 rounded">
              Card
            </div>
            <div className=" p-4 rounded-xl space-y-6 shadow-md">
              {/* Survey Image */}
              <img
                src={survey.frontImg}
                alt={survey.title}
                className="w-full max-w-2xl h-60 sm:h-72 md:h-80 object-cover rounded-2xl mb-4  shadow-md shadow-white/24"
              />

              {/* Meta Info */}
              <div className="text-xs max-w-fit text-white/90 mb-1 p-2 mt-4  md:mt-8 bg-white/10 rounded">
                Date Created
              </div>
              <p className="text-sm mb-4">{survey.date}</p>

              {/* Title */}
              <div className="text-xs max-w-fit text-white/90 mb-1  p-2 mt-2 bg-white/10 rounded">
                Topic
              </div>
              <h2 className="text-lg sm:text-xl font-bold mb-2">
                {survey.title}
              </h2>

              {/* Description */}

              <div className="text-xs max-w-fit text-white/90 mb-1  p-2 mt-4 sm:mt-8 bg-white/10 rounded">
                Body
              </div>
              <p className="text-white/70 text-sm mb-4">{survey.description}</p>

              {/* Key Points */}
              <div className="mb-4">
                <h3 className="text-xs max-w-fit text-white/90 mb-1  p-2 mt-4 sm:mt-8 bg-white/10 rounded">
                  Key Data Points to Collect
                </h3>
                <ul className="list-disc ml-6 text-white/70 text-sm space-y-1">
                  {survey.keyPoints.map((point: string, i: number) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Stats (Questions & Reward) */}
              <div className="text-xs max-w-fit text-white/90  p-2 mt-2 bg-white/10 rounded">
                More Details
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mt-4">
                <div className="bg-black/50 p-2  flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95  ">
                  <p className="rounded-full bg-white/15 p-1.5 hidden sm:block">
                    <img src={surveyhelp} alt=".." className="w-6 " />
                  </p>

                  <p className="text-xs font-semibold text-white/90">
                    Survey Questions
                  </p>
                  <p className="text-lg  font-normal  text-white/30">
                    {survey.questions}
                  </p>
                </div>
                <div className="bg-black/50 p-2  flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95">
                  <p className="rounded-full bg-white/15 p-1.5 hidden sm:block">
                    <img src={surveyrew} alt=".." className="w-6 " />
                  </p>

                  <p className="text-xs font-semibold  text-white/90">Reward</p>
                  <p className="text-lg font-normal text-white/30 flex items-center gap-1">
                    <img
                      src={surdatoken}
                      alt=""
                      className=" hidden sm:block w-6"
                    />
                    {survey.reward}
                  </p>
                </div>
              </div>

              {/* Stats (Responses & Expiry) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 ">
                <div className="bg-black/50 p-2  flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95">
                  <p className="rounded-full bg-white/15 p-1.5 hidden sm:block ">
                    <img src={surveychat} alt=".." className="w-6 " />
                  </p>

                  <p className="text-xs text-white/90 font-semibold">
                    Required Responses
                  </p>
                  <p className="text-xs font-normal text-wrap text-white/30  ">
                    100/100
                  </p>
                </div>
                <div className="bg-black/50 p-2  flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95">
                  <p className="rounded-full bg-white/15 p-1.5 hidden sm:block">
                    <img src={surveyexp} alt=".." className="w-6 " />
                  </p>
                  <p className="text-xs text-white/90 font-semibold">Expiry</p>
                  <p className="text-xs font-normal text-white/30 ">
                    2025-10-01
                  </p>
                </div>
              </div>

              {/* Status */}
              <div className="text-xs max-w-fit text-white/90 mb-3  p-2 mt-2 bg-white/10 rounded">
                Survey Status
              </div>
              {/* Meta Info */}
              <div className="flex flex-col gap-1 text-xs text-white/70 mt-2">
                <div className="bg-black/50 p-2 ps-6 flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95 transition">
                  <p className="text-xs text-white/90 font-semibold">
                    Survey Type:
                  </p>
                  <FaUsers
                    size={26}
                    className="p-1 rounded-full text-blue-400 bg-white/10"
                  />
                  <p className="font-semibold text-blue-400">
                    {survey.type === "Video" ? "Video Survey" : "Form Survey"}
                  </p>
                </div>

                <div className="bg-black/50 p-2 ps-6 flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95 transition">
                  <p className="text-xs text-white/90 font-semibold">Status:</p>
                  <FaStar
                    size={26}
                    className="p-1 rounded-full text-blue-400 bg-white/10"
                  />
                  <p className="font-semibold text-blue-400">{survey.status}</p>
                </div>

                <div className="bg-black/50 p-2 ps-6 flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95 transition">
                  <p className="text-xs text-white/90 font-semibold">Price:</p>
                  <p className="rounded-full bg-white/15 p-1">
                    <img src={surveyrew} alt="gift" className="w-5" />
                  </p>
                  <p className="font-semibold text-blue-500 flex items-center gap-1">
                    <img src={surdatoken} alt="token" className="w-6" />{" "}
                    {survey.reward} Tokens
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row sm:w-max-w-lg gap-4">
                <button className="bg-white/15 hover:bg-white/25 w-full  px-4 py-3 rounded text-sm cursor-pointer ">
                  List on Marketplace
                </button>
                <button
                  /*  to={"/dashboard/questionaire"} */
                  className="bg-blue-600 hover:bg-blue-500 w-full  text-center px-4 py-3 rounded text-sm transition cursor-pointer"
                >
                  Analyse Survey
                </button>
              </div>
            </div>
          </div>
        )}
        {/*  Survey Question */}
        {overveiwTab === "questions" && (
          <div className="p-6 px-3 text-white overflow-y-auto max-h-[70vh]">
            {QuestionData.sections.map((section, si) => (
              <div key={si} className="mb-10">
                <p className="text-sm text-blue-400 mb-4">{section.title}</p>

                {section.questions.map((q, qi) => (
                  <div
                    key={qi}
                    className="mb-8 bg-black/25 rounded-xl p-4 shadow"
                  >
                    <h3 className="text-base font-semibold mb-4  bg-black/20 px-4 pt-4 pb-12 rounded-md shadow shadow-white/15 flex items-start gap-2">
                      <span className="text-blue-400">{qi + 1}.</span> {q.text}
                    </h3>

                    <div className="space-y-3">
                      {q.options.map((opt, oi) => (
                        <div
                          key={oi}
                          className="flex items-center justify-between p-3  bg-black/20   border border-white/10 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <input type="radio" disabled />
                            <span>{opt.value}</span>
                          </div>
                          <span className="text-gray-400">
                            {opt.responses} responses
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <p className=" font-semibold  mb-2 text-xs max-w-fit text-white/90  p-2 mt-2 bg-white/5 rounded">
                        Response Details
                      </p>
                      <div className="flex items-center gap-2 text-white/55 shadow-inner shadow-blue-400/30  px-4 py-3 mt-4 rounded-2xl font-normal text-xs border border-blue-400/10 ">
                        Response Number:
                        <p className="flex items-center gap-1 text-blue-400">
                          <FaUser />
                          <span className="font-semibold ">
                            {q.totalResponses}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {/*  Survey Question */}
        {overveiwTab === "respondents" && (
          <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">All Respondents</h3>
              <button
                onClick={handleApproveAllRespondent}
                className="text-sm bg-blue-400 text-black hover:bg-blue-500 px-4 py-2 rounded-md"
              >
                Approve All
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] text-xs text-left border border-white/5">
                <thead className="bg-white/5 text-white/50 text-xs">
                  <tr>
                    <th className="py-2 px-3 border-b border-white/5">#</th>
                    <th className="py-2 px-3 border-b border-white/5">Date</th>
                    <th className="py-2 px-3 border-b border-white/5">Email</th>
                    <th className="py-2 px-3 border-b border-white/5">
                      Response Number
                    </th>
                    <th className="py-2 px-3 border-b border-white/5">
                      Validation
                    </th>
                    <th className="py-2 px-3 border-b border-white/5">
                      Approval Status
                    </th>
                    <th className="py-2 px-3 border-b border-white/5">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {!respondentData || respondentData === null ? (
                    <tr className="border-b italic capitalize border-white/5 hover:bg-white/5">
                      no data available
                    </tr>
                  ) : (
                    respondentData.map((r, idx) => (
                      <tr
                        key={r.id}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="py-2 px-3">{idx + 1}</td>
                        <td className="py-2 px-3">{r.date}</td>
                        <td className="py-2 text-white/80 px-3 flex items-center gap-2">
                          <img
                            src={r.avatarUrl}
                            alt="avatar"
                            className="w-6 h-6 rounded-full"
                          />
                          {r.email}
                        </td>
                        <td className="py-2 px-3">{r.responseNumber}</td>
                        <td
                          className={`py-2 px-3 ${getStatusColor(
                            r.validation
                          )}`}
                        >
                          {r.validation}
                        </td>
                        <td
                          className={`py-2 px-3 ${getStatusColor(
                            r.approvalStatus
                          )}`}
                        >
                          {r.approvalStatus}
                        </td>
                        <td className="py-2 px-3">
                          <button
                            onClick={() => handleViewRespondent(r.id)}
                            className="text-xs px-3 py-1 border-4 text-nowrap border-white/15 bg-black/50 rounded-lg text-white/80 hover:text-blue-400"
                          >
                            View Response
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      <ApproveRespondentModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onApprove={() => console.log("checking approve")}
      />
    </div>
  );
};

export default SurveyAnalysisPage;
