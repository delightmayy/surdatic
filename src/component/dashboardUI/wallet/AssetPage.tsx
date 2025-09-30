import { useContext, useEffect, /* useMemo, */ useState } from "react";
import { motion } from "framer-motion";
import { FiSend, FiDownload, FiFilter, FiChevronDown } from "react-icons/fi";

import earnbg from "../../../img/daskearnbg.png";
import { useAuth } from "../../../api/useAuth";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import DataContext from "../../../context/DataContext";
import WalletHistory from "./WalletHistory";
import { useLocation, useParams } from "react-router-dom";
import { type CommonAsset } from "./WalletComp";
import SendAssetModal from "../../modal/SendAssetModal";
import ReceiveAssetModal from "../../modal/ReceiveAssetModal";
import SwapAssetModal from "../../modal/SwapAssetModal";

/* interface UserWallet {
  address: string;
  user: string;
  balance: number;
} */

export interface UserICPAsset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  decimals: number;
  canister_id: string;
  image: string;
  created_at: string; // ISO or formatted date string
  updated_at: string; // ISO or formatted date string
}

export interface History {
  id: string;
  user: string;
  address: string;
  amount: string;
  purpose: string;
  status: "DEBIT" | "CREDIT" | string;
  created_at: string; // ISO
}

const containerFade = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const AssetPage = () => {
  // navigation state
  const { symbol } = useParams<{ symbol: string }>();
  const { state } = useLocation();
  const { t: asset } = state as { t: CommonAsset };
  const { name, id, balance, image, /*  decimals, created_at, updated_at */ } = asset;

  const { userAssetTransactionID } = useAuth();
  const { togleshow, SetTogleShow } = useContext(DataContext)!;
  const [UserHistory, setUserHistory] = useState<History[] | null>();
  const [showSort, setShowSort] = useState(false);
  const [/* sort */, setSort] = useState<"7days" | "30days" | "alltime">("7days");
  const [activeTab, setActiveTab] = useState< "history">("history");
  const [loading, setLoading] = useState(true);
  const [showSend, setShowSend] = useState(false);
  const [showReceive, setShowReceive] = useState(false);
  const [showSwap, setShowSwap] = useState(false);
  const [address] = useState("");

  const quickActions = [
    {
      icon: <FiSend size={20} />,
      label: "Send",
      click: () => {
        setShowSend(true);
      },
    },
    {
      icon: <FiDownload size={20} />,
      label: "Receive",
      click: () => {
        setShowReceive(true);
      },
    },

    {
      icon: <FiFilter size={20} />,
      label: "Swap",
      click: () => {
        setShowSwap(true);
      },
    },
  ];

  useEffect(() => {
    const handleUserTransaction = async () => {
      try {
        const res = await userAssetTransactionID(id);
        if (res.data) {
          setUserHistory(res.data);
          console.log(res.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
   

    if (symbol) {
      handleUserTransaction();
    } else {
      setLoading(false); // prevents infinite spinner if no symbol
    }
  }, [symbol]);

  if (loading) {
    return (
      <div className="flex items-center justify-center  h-full">
        <FaSpinner size={50} className="animate-spin text-white/30 " />
      </div>
    );
  }

  /*  if (!token) return <div>Token not found</div>;
   */
  return (
    <div className="min-h-screen bg-[#0b0c10] text-white px-4 py-6 pb-20">
      <motion.div
        variants={containerFade}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 gap-6">
          {/* Overview header */}
          <div className="flex flex-col lg:flex-row gap-4 justify-center items-stretch w-full">
            {/* Balance Card */}
            <div
              className="flex-1 lg:min-w-52 w-full lg:flex-3/5 rounded-2xl border border-white/10 bg-gradient-to-r from-violet-700/40 via-indigo-600/30 to-sky-600/30 p-6 lg:px-0  flex flex-col items-center lg:justify-between text-center"
              style={{
                backgroundImage: `url(${earnbg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <h3 className="text-sm font-semibold text-white/80 mb-2 ">
                Available Balance{" "}
                <p
                  onClick={() => SetTogleShow((prev) => !prev)}
                  className=" cursor-pointer flex items-center justify-center text-center"
                >
                  {togleshow ? (
                    <FaEye size={24} className="text-blue-600" />
                  ) : (
                    <FaEyeSlash size={24} className="text-blue-600" />
                  )}
                </p>
              </h3>
              <div className="bg-black/40 w-full  lg:px-6 pb-1 ">
                {togleshow ? (
                  <p className="text-3xl md:text-4xl font-extrabold">
                    {loading ? (
                      <span className=" text-base italic font-light  tracking-wider text-yellow-400 ">
                        {"loading..."}
                      </span>
                    ) : (
                      Number(balance).toFixed(2)
                    )}
                  </p>
                ) : (
                  <p className="text-3xl md:text-4xl  font-extrabold">*****</p>
                )}
                <p className="text-xs text-end text-white/60 mt-1 pe-2">
                  {togleshow
                    ? `${Number(balance).toFixed(3)} ${symbol}`
                    : "hidden"}
                </p>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="flex-1 w-full lg:flex-2/5  rounded-2xl border border-white/10 bg-black/50 p-6 flex flex-col items-center text-center">
              <h3 className="text-sm font-semibold text-white/80 mb-4">
                Quick Actions
              </h3>
              <div className="flex justify-center gap-3 sm:gap-6 lg:gap-4 ">
                {quickActions.map((action, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-2 cursor-pointer"
                    onClick={action.click}
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-sky-500 hover:bg-sky-600 text-black">
                      {action.icon}
                    </div>
                    <span className="text-xs text-white/80">
                      {action.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Assets Table Card */}
          <div className="rounded-2xl min-h-[55vh] border border-white/6 bg-white/3  pb-4">
            {/* Header row */}
            <div className="flex rounded-t-2xl   pt-4 items-center justify-between gap-3 bg-black/80 border-t border-t-white/20 px-2">
              {/* Left: Tabs */}
              <div className="flex items-center gap-2 rounded-lg p-1">
                {/* History button */}
                <button
                  onClick={() => {
                    setActiveTab("history");
                  }}
                  className={`px-4 py-1.5 rounded-md cursor-pointer text-xs ${
                    activeTab === "history"
                      ? "text-blue-600 border-t-2 border-t-blue-600"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  History
                </button>
              </div>

              {/* Right: Sort + History */}
              <div className="flex items-center gap-3">
                {/* Sort */}
                {activeTab === "history" && (
                  <div className="relative">
                    <button
                      className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-md hover:bg-white/10"
                      onClick={() => setShowSort((s) => !s)}
                      aria-expanded={showSort}
                      aria-controls="sort-panel"
                    >
                      Sort <FiChevronDown />
                    </button>
                    {showSort && (
                      <div
                        id="sort-panel"
                        className="absolute -right-18 sm:right-0 mt-2 w-40 bg-black/90 border border-white/10 space-y-1 rounded-md p-2 py-4 text-sm z-20"
                      >
                        <button
                          className="block w-full text-left px-2 py-1 hover:bg-white/10 rounded"
                          onClick={() => {
                            setSort("7days");
                            setShowSort(false);
                          }}
                        >
                          7 Days
                        </button>
                        <button
                          className="block w-full text-left px-2 py-1 hover:bg-white/10 rounded"
                          onClick={() => {
                            setSort("30days");
                            setShowSort(false);
                          }}
                        >
                          30 Days
                        </button>
                        <button
                          className="block w-full text-left px-2 py-1 hover:bg-white/10 rounded"
                          onClick={() => {
                            setSort("alltime");
                            setShowSort(false);
                          }}
                        >
                          All Time
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}

            <WalletHistory tokens={UserHistory ?? null} />
          </div>
        </div>
      </motion.div>

      {showSend && (
        <SendAssetModal
          onClose={() => setShowSend(false)}
          balance={balance.toLocaleString()}
          symbol={symbol ? symbol : ""}
          name={name}
          image={image}
          id={id}
        />
      )}

      {showReceive && (
        <ReceiveAssetModal
          onClose={() => setShowReceive(false)}
          symbol={symbol ? symbol : ""}
          name={name}
          address={address}
          image={image}
        />
      )}

       {showSwap && (
        <SwapAssetModal
          onClose={() => setShowSwap(false)}
          balance={balance.toLocaleString()}
          symbol={symbol ? symbol : ""}
          name={name}
          image={image}
          id={id}
        />
      )}

    </div>
  );
};

export default AssetPage;
