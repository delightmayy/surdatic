import { useState } from "react";
import { FaCheck,  FaStar, FaUsers, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";
import gift from "../../img/surveyrewardicon.png"
import surdatoken from "../../img/SurdaToken.png"

// Placeholder images with Unsplash
const placeholderImages = [
  "https://images.unsplash.com/photo-1551434678-e076c223a692",
  "https://images.unsplash.com/photo-1560264280-88b68371db39",
  "https://images.unsplash.com/photo-1552664730-d307ca884978",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1560264280-88b68371db39",
  "https://images.unsplash.com/photo-1552664730-d307ca884978",
];

const surveys = [
  {
    id: "s1",
    title:
      "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
    date: "2025-09-08",
    type: "Validated",
    reward: 100,
    status: "Validated",
    frontImg: placeholderImages[0],
  },
  {
    id: "s2",
    title:
      "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
    date: "2025-09-08",
    type: "Video",
    reward: 120,
    status: "Validated",
    frontImg: placeholderImages[1],
  },
  {
    id: "s3",
    title:
      "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
    date: "2025-09-08",
    type: "Validated",
    reward: 80,
    status: "Validated",
    frontImg: placeholderImages[2],
  },
  {
    id: "s4",
    title:
      "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
    date: "2025-09-08",
    type: "Video",
    reward: 90,
    status: "Validated",
    frontImg: placeholderImages[3],
  },
  {
    id: "s5",
    title:
      "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
    date: "2025-09-08",
    type: "Validated",
    reward: 95,
    status: "Validated",
    frontImg: placeholderImages[4],
  },
  {
    id: "s6",
    title:
      "Examining safety compliance rate among senior managers in corporate organisations in Nigeria",
    date: "2025-09-08",
    type: "Video",
    reward: 110,
    status: "Validated",
    frontImg: placeholderImages[5],
  },
];

const tabs = ["Most Popular", "Latest Survey", "Promoted Survey"];

const DashMarket = () => {
  const [activeTab, setActiveTab] = useState("Most Popular");

  return (
    <div className="text-white px-4 pt-4 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <h1 className="text-xl font-semibold mb-2">Marketplace</h1>
      <p className="text-sm text-white/60 mb-6">
        Explore the most active marketplaces
      </p>

      {/* Tabs */}
      <div className="flex gap-6 border-b border-white/10 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-sm pb-2 ${
              tab === activeTab
                ? "border-b-2 border-blue-500 text-white"
                : "text-white/50 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className="bg-black/10 rounded-2xl shadow-inner shadow-white/10 p-2 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative rounded-2xl overflow-hidden mb-4">
              <img
                src={survey.frontImg}
                alt="Survey"
                className="object-cover w-full h-52 rounded-2xl"
              />

              {/* Top-left Video Badge */}
              {survey.type === "Video" && (
                <div className="absolute top-2 left-2 bg-black/70 text-white text-[10px] px-4 py-1  rounded-full shadow-md flex items-center gap-2">
                  <FaVideo size={30} className="p-2 rounded-full bg-white/20" />{" "}
                  5 mins
                </div>
              )}

              {/* Bottom Completed Badge */}
              <div className="absolute bottom-2 left-5 bg-black/70 text-white text-xs px-4 py-2 rounded-md shadow-md flex items-center gap-2  ">
                <span className="">Completion Status:</span>
                <FaCheck
                  size={30}
                  className="p-2 rounded-md text-blue-500 border border-blue-500 bg-white/10"
                />
                <span className="text-blue-500 font-semibold"> Completed</span>
              </div>
            </div>

            {/* Text Content */}
            <div className="px-2  flex flex-col gap-2 text-white/90">
              <div className="text-xs max-w-fit  text-white/90  p-2 mt-2 bg-white/10 rounded">
                Topic
              </div>
              <h3 className="text-sm font-semibold leading-snug line-clamp-3 mb-1">
                {survey.title}
              </h3>

             

              {/* Meta Info - Column style */}
              <div className="flex flex-col gap-1 text-xs text-white/70 mt-2">
                <div className="bg-black/50 p-2 ps-6  flex items-center justify-start gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95">
                  <p className="text-xs text-white/90 font-semibold">
                    Survey Type:
                  </p>
                
                   <FaUsers
                  size={26}
                  className="p-1 rounded-full text-blue-400  bg-white/10"
                />
                  <p className=" font-semibold  text-wrap  text-blue-400  ">
                    {survey.type === "Video" ? "Video Survey" : "Form Survey"}
                  </p>
                </div>

                <div className="bg-black/50 p-2 ps-6  flex items-center justify-start gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95">
                  <p className="text-xs text-white/90 font-semibold">Status:</p>
                   <FaStar
                  size={26}
                  className="p-1 rounded-full text-blue-400  bg-white/10"
                />

                  <p className=" font-semibold  text-wrap  text-blue-400  ">
                    {survey.status}
                  </p>
                </div>

                <div className="bg-black/50 p-2 ps-6  flex items-center justify-start gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95">
                  <p className="text-xs text-white/90 font-semibold">Price:</p>
                  <p className="rounded-full bg-white/15 p-1 ">
                    <img src={gift} alt=".." className="w-5 " />
                  </p>

                  <p className=" font-semibold  text-wrap  text-blue-500 flex items-center gap-1  ">
                   <img src={surdatoken} alt=".." className="w-6 " /> {survey.reward} Tokens
                  </p>
                </div>
              </div>

              {/* Button */}
              <Link
                to={`/dashboard/surveys/${survey.id}`}
                className="bg-blue-600 hover:bg-blue-500 mt-4 text-xs text-center w-full py-2 rounded-md transition"
              >
                Buy Now
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashMarket;
