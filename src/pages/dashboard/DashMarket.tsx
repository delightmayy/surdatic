import { useContext, useEffect, useState } from "react";
import MarketplaceSurveyCard from "../../component/dashboardUI/marketplace/MarketplaceSurveyCard";
import { useAuth } from "../../api/useAuth";
import { FaSpinner } from "react-icons/fa";
import DataContext from "../../context/DataContext";

const DashMarket = () => {
  const { /* getUsersCollection */ } = useAuth();

  const { marketPlaceData, loading } = useContext(DataContext)!;

  /*  const [userCollection, setUserCollection] = useState<Marketplace[]>([]); */

  const [activeTab, setActiveTab] = useState("Most Popular");

  const tabs = ["Most Popular", "Latest Survey", "Promoted Survey"];

  // Sort by date (newest first)

  const LatestSurvey = marketPlaceData.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Sort by date (newest first)
  const MostPopular = marketPlaceData.sort(
    (a, b) => Number(b.price) - Number(a.price)
  );

  useEffect(() => {
    /*  const handlegetUserCollection = async () => {
      setLoading(true);
      try {
        const res = await getUsersCollection ();
        if (res.data) {
          setUserCollection(res.data);
          console.log("user collection here", res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }; */
    //handlegetUserCollection()
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center  h-full">
        <FaSpinner size={50} className="animate-spin text-white/30 " />
      </div>
    );
  }

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
          MostPopular.slice(0, 6).map((s) => (
            <MarketplaceSurveyCard survey={s} key={s.id} />
          ))}

        {activeTab === "Latest Survey" &&
          LatestSurvey.map((s) => (
            <MarketplaceSurveyCard survey={s} key={s.id} />
          ))}
        {activeTab === "Promoted Survey" &&
          marketPlaceData.map((s) => (
            <MarketplaceSurveyCard survey={s} key={s.id} />
          ))}
      </div>
    </div>
  );
};

export default DashMarket;
