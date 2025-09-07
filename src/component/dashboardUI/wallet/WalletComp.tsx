import { useMemo, useState } from "react";
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

type Token = {
  id: string;
  name: string;
  symbol: string;
  icon?: string;
  portfolioPct: number;
  price: number;
  balance: number;
};

type NFT = {
  id: string;
  name: string;
  image: string;
  price: number;
};

const DUMMY_TOKENS: Token[] = [
  {
    id: "surda",
    name: "Surda",
    symbol: "SURDA",
    icon: "https://picsum.photos/seed/surda/40/40",
    portfolioPct: 8.08,
    price: 0.001,
    balance: 20546,
  },
  {
    id: "ckusdt",
    name: "ckUSDT",
    symbol: "cKUSDT",
    icon: "https://picsum.photos/seed/usdt/40/40",
    portfolioPct: 12.3,
    price: 1.0,
    balance: 1000,
  },
  {
    id: "ckusdc",
    name: "ckUSDC",
    symbol: "cKUSDC",
    icon: "https://picsum.photos/seed/usdc/40/40",
    portfolioPct: 5.1,
    price: 1.0,
    balance: 500,
  },
  {
    id: "lisk",
    name: "LISK",
    symbol: "LISK",
    icon: "https://picsum.photos/seed/lisk/40/40",
    portfolioPct: 20,
    price: 2.5,
    balance: 200,
  },
];

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
  const [tokens] = useState<Token[]>(DUMMY_TOKENS);
  const [nfts] = useState<NFT[]>(DUMMY_NFTS);
  const [query /* setQuery */] = useState("");
  const [sendModalState, setSendModalState] = useState(false);
  const [receiveModalState, setReceiveModalState] = useState(false);
  const [convertModalState, setConvertModalState] = useState(false);
  const [buyModalState, setBuyModalState] = useState(false);
  const [buywithCardState, setBuyWithCardState] = useState(false);

  const [sort, setSort] = useState<
    "recent" | "name-asc" | "low-high" | "high-low"
  >("recent");

  const [showSort, setShowSort] = useState(false);
  const [activeTab, setActiveTab] = useState<"tokens" | "nfts">("tokens");

  const userAddress = "rnz5UXKNZN4yKaBqkuBnEQF4aTS8N1j6TL";

  // Derived tokens based on search + sort
  const visibleTokens = useMemo(() => {
    let list = tokens.filter(
      (t) =>
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.symbol.toLowerCase().includes(query.toLowerCase())
    );

    if (sort === "name-asc") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "low-high") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "high-low") {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [tokens, query, sort]);

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
                Available Balance
              </h3>
              <div className="bg-black/40 w-full  lg:px-6 pb-1 ">
                <p className="text-3xl md:text-4xl font-extrabold">500 546</p>
                <p className="text-xs text-end text-white/60 mt-1 pe-2">
                  ~500.546 USDT
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
          <div className="rounded-2xl border border-white/6 bg-white/3 p-4">
            {/* Header row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 bg-black/80 border-t border-t-white/20">
              {/* Left: Tabs */}
              <div className="flex items-center gap-2 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab("tokens")}
                  className={`px-4 py-1.5 rounded-md text-xs ${
                    activeTab === "tokens"
                      ? "text-blue-600 border-t-2 border-t-blue-600"
                      : "text-white/70 hover:bg-white/10"
                  }`}
                >
                  Tokens
                </button>
                <button
                  onClick={() => setActiveTab("nfts")}
                  className={`px-4 py-1.5 rounded-md text-xs ${
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
                        className="absolute -right-18 sm:right-0 mt-2 w-40 bg-black/90 border border-white/10 rounded-md p-2 py-4 text-sm z-20"
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
                <button className="px-4 py-1.5 rounded-md  text-xs">
                  History
                </button>
              </div>
            </div>

            {/* Content */}
            {activeTab === "tokens" ? (
              <>
                <WalletTable tokens={visibleTokens} />
                <div className="mt-3 text-xs text-white/50">
                  Showing {visibleTokens.length} tokens
                </div>
              </>
            ) : (
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

/* Quick Action */
/* function QuickAction({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="flex items-center gap-2 bg-black/40 hover:bg-white/10 px-3 py-2 rounded-md text-sm">
      <span className="w-7 h-7 grid place-items-center rounded bg-white/5">
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </button>
  );
} */

export default WalletComponent;
