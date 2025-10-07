import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import DataContext from "../../../context/DataContext";
import type { Marketplace } from "../../../context/DataContext";
import surveyhelp from "../../../img/surveyhelpicon.png";
import surveychat from "../../../img/Chat.png";
import surveyrew from "../../../img/surveyrewardicon.png";
import surdatoken from "../../../img/SurdaToken.png";
import { FaArrowLeft, FaStar, FaUsers } from "react-icons/fa";
import MarketplaceBuyModal from "../../modal/MarketplaceBuyModal";
import { FaArrowRightLong } from "react-icons/fa6";

const MarketPlaceDetails = () => {
  const { id } = useParams();
  const { marketPlaceData } = useContext(DataContext)!;
  const navigate = useNavigate();

  const [survey, setSurveyData] = useState<Marketplace | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const found = marketPlaceData.find((s) => s.id === id);
    setSurveyData(found ?? null);
  }, [id, marketPlaceData]);

  if (!survey) return <div className="text-white p-4">Loading...</div>;

  return (
    <div className="text-white   pt-2 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col  gap-8">
        <div className="p-4  flex items-center gap-2">
          <p
            onClick={() => navigate(-1)}
            className="text-xs cursor-pointer text-white/40  flex gap-1 items-center font-semibold"
          >
            <FaArrowLeft
              size={28}
              className="p-2 rounded-full shadow-inner shadow-white/40"
            />{" "}
            Market Place
          </p>
          <p className="text-xs font-semibold text-white/90 flex gap-1 items-center ">
            <FaArrowRightLong size={20} className="h-4 text-white/60" /> Survey
            Overview
          </p>
        </div>
        {/* LEFT: Survey Details */}
        <div className="w-full bg-black/5 ">
          {/* Meta Info */}
          <div className="text-xs max-w-fit text-white/90 mb-1 ms-4 p-2 px-4 mt-2 bg-white/10 rounded">
            Card
          </div>
          <div className=" p-4 rounded-xl space-y-6 shadow-md">
            {/* Survey Image */}
            <img
              src={survey.image}
              alt={survey.title}
              className="w-full max-w-2xl h-60 sm:h-72 md:h-80 object-cover rounded-2xl mb-4  shadow-md shadow-white/24"
            />

            {/* Meta Info */}
            <div className="text-xs max-w-fit text-white/90 mb-1 p-2 mt-4  md:mt-8 bg-white/10 rounded">
              Date Created
            </div>
            <p className="text-sm mb-4">{survey.created_at}</p>

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
               {/*  {survey.keyPoints.map((point: string, i: number) => (
                  <li key={i}>{point}</li>
                ))} */}

                <span className="text-red-400 italic"> no data</span>
              </ul>
            </div>

            {/* Stats (Questions & Reward) */}
            <div className="text-xs max-w-fit text-white/90  p-2 mt-4 sm:mt-8 bg-white/10 rounded">
              More Details
            </div>
            <div className=" flex flex-col  sm:flex-row items-center sm:justify-center gap-3 mt-4">
              <div className="bg-black/50 p-2 w-full  flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95  ">
                <p className="rounded-full bg-white/15 p-1.5 hidden sm:block">
                  <img src={surveyhelp} alt=".." className="w-6 " />
                </p>

                <p className="text-xs font-semibold text-white/90">
                  Survey Questions
                </p>
                <p className="text-lg  font-normal  text-white/30">
                 {/*  {survey.questions} */} <span className="text-red-400">X</span>
                </p>
              </div>

              <div className="bg-black/50 sm:p-2 py-3 w-full  flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95">
                <p className="rounded-full bg-white/15 p-1.5 hidden sm:block ">
                  <img src={surveychat} alt=".." className="w-6 " />
                </p>

                <p className="text-xs text-white/90 font-semibold">Responses</p>
                <p className="text-xs font-normal text-wrap text-white/30  ">
                  {/* (10000) */} <span className="text-red-400">X</span>
                </p>
              </div>
              <div className="bg-black/50 sm:p-2 w-full py-3 flex items-center justify-center gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95">
                <p className="rounded-full bg-white/15 p-1.5 hidden sm:block ">
                  <img src={surveychat} alt=".." className="w-6 " />
                </p>

                <p className="text-xs text-white/90 font-semibold">
                  Completion Status
                </p>
                <p className="text-xs font-normal text-wrap text-white/30  ">
                  {survey.status}
                </p>
              </div>
            </div>

            {/* Status */}
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
                  {survey.price} Surda
                </p>
              </div>
            </div>

            {/* Action Button */}

            <button
              onClick={() => setModalOpen(true)}
              className="bg-blue-500 hover:bg-blue-400 mt-4 text-xs text-center w-full py-2 sm:py-4 rounded-md transition cursor-pointer"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <MarketplaceBuyModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        img={survey.image}
        title={survey.title}
        price={Number(survey.price)}
      />
    </div>
  );
};

export default MarketPlaceDetails;
