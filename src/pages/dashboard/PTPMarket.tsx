import { useState } from "react";
import { FaArrowDownShortWide, FaClock } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import surdacoin from "../../img/SurdaToken.png";
import usdtcoin from "../../img/usdtToken.png";
import usdccoin from "../../img/usdcToken.png";
import ngncoin from "../../img/ngnToken.png";
import { FaComment, FaStar } from "react-icons/fa";

export interface Offer {
  id: string;
  username: string;
  verified: boolean;
  amount: number;
  payment: string[];
  limit: string;
  status: "buy" | "sell";
  completionRate?: number; // for best rating (optional)
}

const offers: Offer[] = [
  {
    id: "1",
    username: "jitu@example.com",
    verified: true,
    amount: 1002,
    payment: ["PayPal", "Bank Transfer"],
    limit: "30,000 – 30,100",
    status: "sell",
    completionRate: 97,
  },
  {
    id: "2",
    username: "jitu@example.com",
    verified: true,
    amount: 1000,
    payment: ["PayPal", "Bank Transfer"],
    limit: "30,000 – 30,100",
    status: "buy",
    completionRate: 95,
  },
  {
    id: "3",
    username: "jitu@example.com",
    verified: true,
    amount: 1004,
    payment: ["PayPal", "Bank Transfer"],
    limit: "30,000 – 30,100",
    status: "sell",
    completionRate: 99,
  },
  {
    id: "4",
    username: "jitu@example.com",
    verified: true,
    amount: 1002,
    payment: ["PayPal", "Bank Transfer"],
    limit: "30,000 – 30,100",
    status: "buy",
    completionRate: 97,
  },
  {
    id: "5",
    username: "jitu@example.com",
    verified: true,
    amount: 1000,
    payment: ["PayPal", "Bank Transfer"],
    limit: "30,000 – 30,100",
    status: "buy",
    completionRate: 95,
  },
  {
    id: "6",
    username: "jitu@example.com",
    verified: true,
    amount: 1004,
    payment: ["PayPal", "Bank Transfer"],
    limit: "30,000 – 30,100",
    status: "sell",
    completionRate: 99,
  },
  {
    id: "7",
    username: "jitu@example.com",
    verified: true,
    amount: 1002,
    payment: ["PayPal", "Bank Transfer"],
    limit: "30,000 – 30,100",
    status: "buy",
    completionRate: 97,
  },
  {
    id: "8",
    username: "jitu@example.com",
    verified: true,
    amount: 1000,
    payment: ["PayPal", "Bank Transfer"],
    limit: "30,000 – 30,100",
    status: "buy",
    completionRate: 95,
  },
  {
    id: "9",
    username: "jitu@example.com",
    verified: true,
    amount: 1004,
    payment: ["PayPal", "Bank Transfer"],
    limit: "30,000 – 30,100",
    status: "sell",
    completionRate: 99,
  },
];

type SortOption = "highest" | "lowest" | "bestRating";

const PTPMarket = () => {
  const [activeTab, setActiveTab] = useState<"buy" | "sell">("sell");
  const [activeCoin, setActiveCoin] = useState("Surda");
  const [sortOption, setSortOption] = useState<SortOption>("highest");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const navigate = useNavigate();

  const tokenList = [
    { name: "Surda", img: surdacoin },
    { name: "USDT", img: usdtcoin },
    { name: "USDC", img: usdccoin },
    { name: "cNGN", img: ngncoin },
  ];

  const filteredOffers = [...offers]
    .filter((o) => o.status === activeTab)
    .sort((a, b) => {
      switch (sortOption) {
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        case "bestRating":
          return (b.completionRate || 0) - (a.completionRate || 0);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen text-white pt-2 pb-10 space-y-6 relative">
      {/* Header */}
      <div className="px-3 border-b border-b-white/10">
        <h2 className="text-xl font-semibold mb-2 ">P2P Marketplace</h2>
        <p className="text-sm text-white/60 mb-6">
          Trade SURDA tokens directly with peers in a secure escrow system —
          fast, transparent, and hassle-free.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="border py-3 border-white/10">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-between gap-3  mt-2  rounded-xl mb-4 ">
          {/* Type Toggle */}
          <div className="flex items-center px-3  gap-2">
            <h2 className=" hidden sm:block w-fit px-4 sm:px-2 py-1 my-auto  text-white/60 bg-white/10 capitalize rounded sm:mb-0 text-sm">
              Type
            </h2>
            <button
              onClick={() => setActiveTab("buy")}
              className={`px-4 py-1 border-3 text-green-500 bg-black/10 text-sm rounded-md ${
                activeTab === "buy" ? " border-green-400 " : " border-white/20"
              }`}
            >
              Buy
            </button>
            <button
              onClick={() => setActiveTab("sell")}
              className={`px-4 py-1 border-3 text-red-500 bg-black/10 text-sm rounded-md ${
                activeTab === "sell" ? "border-red-400 " : "border-white/20"
              }`}
            >
              Sell
            </button>
          </div>

          <div className="flex items-center justify-center gap-y-2 px-3 flex-wrap">
            {/* Token Selection */}
            <h2 className=" hidden sm:block w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded text-sm">
              Tokens
            </h2>
            <div className="flex gap-2 sm:ml-4 pe-1">
              {tokenList.map((token) => (
                <p
                  key={token.name}
                  onClick={() => setActiveCoin(token.name)}
                  className={` hover:text-blue-400 text-white/60 text-xs px-2 pt-2 cursor-pointer flex gap-1 items-center  ${
                    activeCoin === token.name
                      ? "border-t-2 border-t-blue-500 "
                      : "border-t-2 border-t-transparent"
                  }`}
                >
                  <img
                    src={token.img}
                    alt={token.name}
                    className="w-5 sm:h-5 h-4.5 "
                  />{" "}
                  {token.name}
                </p>
              ))}
            </div>
          </div>

          {/* Action and Filter Buttons */}
          <div className=" flex  items-center justify-center px-3 gap-2 relative">
            <div className="sm:ml-auto flex gap-1">
              {" "}
              <button className="text-xs sm:bg-white/10 px-3 py-1 rounded hover:bg-white/20">
                Action
              </button>
              <div className="relative ">
                <button
                  className="text-xs bg-white/10 px-3 py-1 rounded hover:bg-white/20 flex items-center gap-1"
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                >
                  <FaArrowDownShortWide />
                  Filter
                </button>

                {showFilterDropdown && (
                  <div className="absolute right-0 mt-2 w-40 bg-black border border-white/10 rounded shadow-lg z-50">
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-white/10"
                      onClick={() => {
                        setSortOption("highest");
                        setShowFilterDropdown(false);
                      }}
                    >
                      Highest Price
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-white/10"
                      onClick={() => {
                        setSortOption("lowest");
                        setShowFilterDropdown(false);
                      }}
                    >
                      Lowest Price
                    </button>
                    <button
                      className="w-full text-left px-4 py-2 text-sm hover:bg-white/10"
                      onClick={() => {
                        setSortOption("bestRating");
                        setShowFilterDropdown(false);
                      }}
                    >
                      Best Rating
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Offers List */}
        <div className="overflow-x-auto  min-h-80 max-h-[80vh]">
          <table className="min-w-[750px] w-full text-sm text-left text-white px-4">
            <thead className="bg-white/3 sticky top-0 z-10 backdrop-blur-sm text-white/50 text-xs">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium">
                  Advertisers
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Price
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Available/Limits
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Payment Method
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Trade
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 max-h-[50vh]  overflow-y-auto">
              {filteredOffers.map((offer) => (
                <tr
                  key={offer.id}
                  className="bg-black/30 hover:bg-white/5 transition-all"
                >
                  {/* Advertiser */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/40?u=${offer.id}`}
                        alt="avatar"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-base sm:text-lg flex items-center gap-2 text-white/90 font-semibold">
                          {offer.username}
                          <p className="flex items-center gap-1 flex-nowrap">
                           <FaStar className={`${(Number(offer.id))%2?"text-blue-500":"text-white/20"}`}/> <FaComment className={`text-blue-500`}/>
                            
                          </p>
                        </div>
                        <div className="text-xs text-white/40 flex flex-col items-center gap-1 ">
                          <h4 className=" flex items-center gap-1 flex-wrap ">
                            <p>218 Orders</p>
                            <p>|</p>
                            <p>{offer.completionRate || 0}% Completion</p>
                          </h4>

                          <p className="flex gap-1 items-center w-full">
                            <FaClock size={13} />
                            30 min
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-4 py-3 text-white/65">
                    <p className="font-bold text-lg">{offer.amount}</p>
                    <span className="text-xs text-white/50">surda</span>
                  </td>

                  {/* Availability & Limits */}
                  <td className="px-4 py-3 text-white/65">
                    <p className="text-sm font-medium">30 000 surda</p>
                    <p className="text-sm flex items-center gap-1 text-nowrap flex-nowrap">
                      <img src={surdacoin} alt="coin" className="w-5 h-5" />
                      {offer.limit}
                    </p>
                  </td>

                  {/* Payment Methods */}
                  <td className="px-4 py-3">
                    <div className="flex   gap-2">
                      {offer.payment.map((method) => (
                        <span
                          key={method}
                          className="bg-white/10 font-semibold flex items-center text-xs px-4 py-1 rounded text-blue-500 text-nowrap"
                        >
                          {method}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Trade Button */}
                  <td className="px-4 py-3">
                    <button
                      onClick={() =>
                        navigate("/dashboard/p2p-order", {
                          state: {
                            offer,
                            type: activeTab,
                          },
                        })
                      }
                      className={`px-4 py-1 text-sm font-semibold rounded 
                ${
                  activeTab === "buy"
                    ? "bg-green-500 hover:bg-green-400 text-black"
                    : "bg-red-500 hover:bg-red-400 text-black"
                }
              `}
                    >
                      {activeTab === "buy" ? "Buy" : "Sell"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PTPMarket;
