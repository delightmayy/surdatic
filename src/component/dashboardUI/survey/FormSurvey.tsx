import { useParams, Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import type { Survey } from "../../../context/DataContext";
import surveyhelp from "../../../img/surveyhelpicon.png";
import surveychat from "../../../img/Chat.png";
import surveyrew from "../../../img/surveyrewardicon.png";
import surveyexp from "../../../img/surveyexpire.png";
import surdatoken from "../../../img/SurdaToken.png";
import { FaClock } from "react-icons/fa";

const FormSurveyDetail = () => {
  const { id } = useParams();
  const { surveyCreated, surveyValidated, surveyParticipated, overveiwTab } =
    useContext(DataContext)!;
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [availablesurvey, setAvailableSurvey] =
    useState<Survey[]>(surveyCreated);

  /*  useEffect(() => {
    
    const found = surveyCreated.find((s) => s.id === id);
    setSurvey(found ?? null);
  }, [id, surveyCreated]);
 */
  useEffect(() => {
    let dataSource: Survey[] = [];

    if (overveiwTab === "created") {
      dataSource = surveyCreated;
      setAvailableSurvey(surveyCreated);
    } else if (overveiwTab === "validated") {
      dataSource = surveyValidated;
      setAvailableSurvey(surveyValidated);
    } else if (overveiwTab === "participated") {
      dataSource = surveyParticipated;
      setAvailableSurvey(surveyParticipated);
    }

    const found = dataSource.find((s) => s.id === id);
    setSurvey(found ?? null);
  }, [id, surveyCreated, surveyValidated, surveyParticipated, overveiwTab]);

  if (!survey) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="text-white px-4 pt-2 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT: Survey Details */}
        <div className="w-full  lg:flex-8/12">
          <div className="p-4">
            <p className="text-xs text-white/90 font-semibold">
              Survey Information
            </p>
            <p className="text-xs font-normal text-white/50 ">
              Your response, your reward
            </p>
          </div>
          <div className="bg-black/40 p-4 rounded-xl shadow-md">
            {/* Survey Image */}
            <img
              src={survey.frontImg}
              alt={survey.title}
              className="w-full h-60 sm:h-72 md:h-80 object-cover rounded-2xl mb-4  shadow-md shadow-white/24"
            />

            {/* Meta Info */}
            <div className="text-xs max-w-fit text-white/90 mb-1 p-2 mt-2 bg-white/10 rounded">
              Date Created
            </div>
            <p className="text-sm mb-4">{survey.date}</p>

            {/* Title */}
            <div className="text-xs max-w-fit text-white/90 mb-1  p-2 mt-2 bg-white/10 rounded">
              Topic
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              {survey.title}
            </h2>

            {/* Description */}

            <div className="text-xs max-w-fit text-white/90 mb-1  p-2 mt-2 bg-white/10 rounded">
              Body
            </div>
            <p className="text-white/70 text-sm mb-4">{survey.description}</p>

            {/* Key Points */}
            <div className="mb-4">
              <h3 className="text-xs max-w-fit text-white/90 mb-1  p-2 mt-2 bg-white/10 rounded">
                Key Data Points to Collect
              </h3>
              <ul className="list-disc ml-6 text-white/70 text-sm space-y-1">
                {survey.keyPoints.map((point, i) => (
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
                <p className="text-lg font-normal text-white/30 ">
                  {survey.reward}{" "}
                </p>
              </div>
            </div>

            {/* Stats (Responses & Expiry) */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 mt-4">
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
                <p className="text-xs font-normal text-white/30 ">2025-10-01</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row sm:w-max-w-lg gap-4">
              <button className="bg-white/15 hover:bg-white/25 w-full  px-4 py-2 rounded text-sm cursor-pointer ">
                Share
              </button>
              <button className="bg-blue-600 hover:bg-blue-500 w-full  px-4 py-2 rounded text-sm transition cursor-pointer">
                Proceed
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT: Available Survey Cards */}
        <div className="hidden lg:block lg:flex-4/12  ">
          <h3 className="text-white/70 text-sm mb-4 p-4">Available Survey</h3>
          <div className="flex flex-col gap-4 max-h-[800px] lg:overflow-y-auto pr-2">
            {availablesurvey.map((s) => (
              <Link
                to={`/dashboard/surveys/${s.id}`}
                key={s.id}
                className="cursor-pointer bg-white/5 shadow-inner shadow-white/30 rounded-xl  select-none
                         flex flex-col flex-shrink-0 mx-auto  sm:w-auto min-h-96 max-w-sm"
              >
                <img
                  src={s.frontImg}
                  alt="card"
                  className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                />

                <div className="p-4 flex flex-col justify-between  text-white/50 flex-grow">
                  <h3 className="  text-xs mb-1 flex gap-2 items-center">
                    <FaClock size={14} /> {s.date}{" "}
                  </h3>
                  <p className=" font-semibold text-sm md:text-sm mb-4">
                    {s.title}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1  font-semibold">
                      <p className="font-light">Rewards:</p>
                      <img src={surdatoken} alt="reward" className="w-5" />{" "}
                      <span className="text-white/90"></span>
                      {s.reward}
                    </div>
                    <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 cursor-pointer">
                      Buy Survey
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSurveyDetail;
