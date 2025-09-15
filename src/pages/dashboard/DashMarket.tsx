import { useContext, useState } from "react";
import MarketplaceSurveyCard from "../../component/dashboardUI/marketplace/MarketplaceSurveyCard";
import DataContext from "../../context/DataContext";



const DashMarket = () => {

  const {marketPlaceData}= useContext(DataContext)!
  const [activeTab, setActiveTab] = useState("Most Popular");

  const tabs = ["Most Popular", "Latest Survey", "Promoted Survey"];

  // Sort by date (newest first)

  const LatestSurvey = marketPlaceData.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  // Sort by date (newest first)
  const MostPopular = marketPlaceData.sort((a, b) => b.reward - a.reward);

 /*  console.log(MostPopular);
  console.log(LatestSurvey);
 */
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
        {activeTab === "Most Popular" &&
          MostPopular.map((s) => (
            <MarketplaceSurveyCard survey={s} key={s.id} />
          ))}

        {activeTab === "Latest Survey" &&
          LatestSurvey.map((s) => (
            <MarketplaceSurveyCard survey={s} key={s.id} />
          ))}
        {activeTab === "Promoted Survey" &&
          marketPlaceData.map((s) => <MarketplaceSurveyCard survey={s} key={s.id} />)}
      </div>
    </div>
  );
};

export default DashMarket;
