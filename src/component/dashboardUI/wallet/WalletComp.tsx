import { useContext, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  FiSend,
  FiDownload,
  FiPlusSquare,
  FiFilter,
  FiChevronDown,
} from "react-icons/fi";
import WalletTable from "./WalletTable";
import earnbg from "../../../img/daskearnbg.png";
import SendTokenModal from "../../modal/SendTokenModal";
import ReceiveTokenModal from "../../modal/ReceiveTokenModal";
import ConvertTokenModal from "../../modal/ConvertTokenModal";
import BuyTokenModal from "../../modal/BuyTokenModal";
import BuyWithCardModal from "../../modal/BuyWithCardModal";
import { useAuth } from "../../../api/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DataContext from "../../../context/DataContext";

interface UserWallet {
  address: string;
  user: string;
  balance: number;
}

interface UserICPAsset {
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

interface EvmAsset {
  id: string;
  name: string;
  symbol: string;
  balance: number;
  decimals: number;
  chain_id: string;
  contract_address: string;
  rpc_url: string;
  image: string;
  explorer_url: string | null;
  explorer_api_url: string | null;
  created_at: string; // formatted or ISO date string
  updated_at: string; // formatted or ISO date string
}

export type CommonAsset = {
  id: string;
  balance: number;
  name: string;
  symbol: string;
  image: string;
  decimals: number;
  created_at: string;
  updated_at: string;
};

type NFT = {
  id: string;
  name: string;
  image: string;
  price: number;
};

const DUMMY_NFTS: NFT[] = [
  {
    id: "nft1",
    name: "Crypto Punk #123",
    image: "https://picsum.photos/seed/nft1/80/80",
    price: 2.5,
  },
  {
    id: "nft2",
    name: "Bored Ape #45",
    image: "https://picsum.photos/seed/nft2/80/80",
    price: 5.0,
  },
  {
    id: "nft3",
    name: "ArtBlock Piece",
    image: "https://picsum.photos/seed/nft3/80/80",
    price: 1.2,
  },
];

const containerFade = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const WalletComponent = () => {
  const { userWallet, userIcpAsset, getEvmAsset, userTransaction } = useAuth();
  const { togleshow, SetTogleShow } = useContext(DataContext)!;
  const [UserWallet, setUserWallet] = useState<UserWallet | null>();
  const [UserICPAsset, setUserICPAsset] = useState<UserICPAsset[] | null>();
  const [UserEvmAsset, setUserEvmAsset] = useState<EvmAsset[] | null>();
  const [UserHistory, setUserHistory] = useState<EvmAsset[] | null>();
  const userAddress = UserWallet?.address;

  const [nfts] = useState<NFT[]>(DUMMY_NFTS);
  const [query] = useState("");
  const [sendModalState, setSendModalState] = useState(false);
  const [receiveModalState, setReceiveModalState] = useState(false);
  const [convertModalState, setConvertModalState] = useState(false);
  const [buyModalState, setBuyModalState] = useState(false);
  const [buywithCardState, setBuyWithCardState] = useState(false);

  const [sort, setSort] = useState<
    "name-asc" | "recent" | "low-high" | "high-low"
  >("name-asc");

  const [showSort, setShowSort] = useState(false);
  const [activeTab, setActiveTab] = useState<"tokens" | "nfts" | "history">(
    "tokens"
  );

  const Assets: CommonAsset[] = [
    ...(UserICPAsset?.map((a) => ({
      id: a.id,
      balance: a.balance,
      name: a.name,
      symbol: a.symbol,
      image: a.image,
      decimals: a.decimals,
      created_at: a.created_at,
      updated_at: a.updated_at,
    })) ?? []),

    ...(UserEvmAsset?.map((b) => ({
      id: b.id,
      balance: b.balance,
      name: b.name,
      symbol: b.symbol,
      image: b.image,
      decimals: b.decimals,
      created_at: b.created_at,
      updated_at: b.updated_at,
    })) ?? []),
  ];

  // Derived tokens based on search + sort
  const visibleAssets = useMemo(() => {
    let list = Assets.filter(
      (t) =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.symbol.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } /*  else if (sort === "low-high") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      list = [...list].sort((a, b) => b.price - a.price);
    } */

    return list;
  }, [Assets, query, sort]);

  const quickActions = [
    {
      icon: <FiSend size={20} />,
      label: "Send",
      click: () => setSendModalState(true),
    },
    {
      icon: <FiDownload size={20} />,
      label: "Receive",
      click: () => setReceiveModalState(true),
    },
    {
      icon: <FiPlusSquare size={20} />,
      label: "Buy",
      click: () => setBuyModalState(true),
    },
    {
      icon: <FiFilter size={20} />,
      label: "Convert",
      click: () => setConvertModalState(true),
    },
  ];

  useEffect(() => {
    const handleUserWallet = async () => {
      try {
        const res = await userWallet();
        if (res.data) {
          setUserWallet(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleUserIcpAsset = async () => {
      try {
        const res = await userIcpAsset();
        if (res.data) {
          setUserICPAsset(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleGetEvmAsset = async () => {
      try {
        const res = await getEvmAsset();
        if (res.data) {
          setUserEvmAsset(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    const handleUserTransaction = async () => {
      try {
        const res = await userTransaction();
        if (res.data) {
          setUserHistory(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    handleUserWallet();
    handleUserIcpAsset();
    handleGetEvmAsset();
    handleUserTransaction();
  }, []);

  const totalEarnings = 20546; // dummy

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
              className="flex-1 lg:min-w-52 w-full rounded-2xl border border-white/10 bg-gradient-to-r from-violet-700/40 via-indigo-600/30 to-sky-600/30 p-6 lg:px-0  flex flex-col items-center lg:justify-between text-center"
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
                    {UserWallet?.balance ? (
                      Number(UserWallet.balance).toFixed(2)
                    ) : (
                      <span className=" text-base italic font-light  tracking-wider text-yellow-400 ">
                        {"loading..."}
                      </span>
                    )}
                  </p>
                ) : (
                  <p className="text-3xl md:text-4xl  font-extrabold">*****</p>
                )}
                <p className="text-xs text-end text-white/60 mt-1 pe-2">
                  {Number(UserWallet?.balance).toFixed(3)} SURDA
                </p>
              </div>
            </div>

            {/* Total Earnings Card */}
            <div className="flex-1 lg:min-w-52 w-full rounded-2xl border border-white/10 bg-white/8 p-6  lg:px-0 flex flex-col items-center justify-between text-center">
              <h3 className="text-sm font-semibold text-white/80 mb-2">
                Total Earnings
              </h3>
              <p className="text-3xl md:text-4xl font-extrabold bg-black/40 w-full py-3">
                {totalEarnings.toLocaleString()}
              </p>
            </div>

            {/* Quick Actions Card */}
            <div className="flex-1 w-full rounded-2xl border border-white/10 bg-black/50 p-6 flex flex-col items-center text-center">
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
          <div className="rounded-2xl min-h-[55vh] mt-3 border border-white/6 bg-white/3 p-4">
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-black/80 border-t border-t-white/20">
              {/* Left: Tabs */}
              <div className="flex items-center gap-2 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("tokens")}
                  className={`px-4 py-1.5 rounded-md cursor-pointer text-xs ${
                    activeTab === "tokens"
                      ? "text-blue-600 border-t-2 border-t-blue-600"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  Tokens
                </button>
                <button
                  onClick={() => setActiveTab("nfts")}
                  className={`px-4 py-1.5 rounded-md cursor-pointer text-xs ${
                    activeTab === "nfts"
                      ? "text-blue-600 border-t-2 border-t-blue-600"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  NFTs
                </button>
              </div>

              {/* Right: Sort + History */}
              <div className="flex items-center gap-3">
                {/* Sort */}
                {activeTab === "tokens" && (
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
                            setSort("recent");
                            setShowSort(false);
                          }}
                        >
                          Recently Added
                        </button>
                        <button
                          className="block w-full text-left px-2 py-1 hover:bg-white/10 rounded"
                          onClick={() => {
                            setSort("name-asc");
                            setShowSort(false);
                          }}
                        >
                          Name
                        </button>
                        <button
                          className="block w-full text-left px-2 py-1 hover:bg-white/10 rounded"
                          onClick={() => {
                            setSort("low-high");
                            setShowSort(false);
                          }}
                        >
                          Lowest to Highest
                        </button>
                        <button
                          className="block w-full text-left px-2 py-1 hover:bg-white/10 rounded"
                          onClick={() => {
                            setSort("high-low");
                            setShowSort(false);
                          }}
                        >
                          Highest to Lowest
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* History button */}
                <button
                  onClick={() => {setActiveTab("history"); console.log(UserHistory)}}
                  className={`px-4 py-1.5 rounded-md cursor-pointer text-xs ${
                    activeTab === "history"
                      ? "text-blue-600 border-t-2 border-t-blue-600"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  History
                </button>
              </div>
            </div>

            {/* Content */}
            {activeTab === "tokens" ? (
              <>
                <WalletTable tokens={visibleAssets} />
                <div className="mt-3  ps-4 italic text-xs text-white/50">
                  Showing {visibleAssets.length} tokens
                </div>
              </>
            ) : activeTab === "nfts" ? (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {nfts.map((nft) => (
                  <div
                    key={nft.id}
                    className="rounded-lg bg-black/40 p-3 flex flex-col items-center text-center hover:bg-black/60 transition"
                  >
                    <img
                      src={nft.image}
                      alt={nft.name}
                      className="w-20 h-20 rounded-md mb-2"
                    />
                    <div className="text-sm font-semibold">{nft.name}</div>
                    <div className="text-xs text-white/60">
                      Price: {nft.price} ETH
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className=" p-8 italic text-center">no data available </div>
            )}
          </div>
        </div>

        {sendModalState && (
          <SendTokenModal
            onClose={() => {
              setSendModalState(false);
            }}
          />
        )}
        {receiveModalState && (
          <ReceiveTokenModal
            onClose={() => {
              setReceiveModalState(false);
            }}
            address={userAddress ?? ""}
          />
        )}
        {convertModalState && (
          <ConvertTokenModal
            onClose={() => {
              setConvertModalState(false);
            }}
          />
        )}
        {buyModalState && (
          <BuyTokenModal
            onClose={() => {
              setBuyModalState(false);
            }}
            onBuywithCard={() => {
              setBuyWithCardState(true);
            }}
          />
        )}
        {buywithCardState && (
          <BuyWithCardModal
            onClose={() => {
              setBuyWithCardState(false);
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default WalletComponent;
