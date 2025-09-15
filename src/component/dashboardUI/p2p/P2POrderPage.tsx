import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Offer } from "../../../pages/dashboard/PTPMarket";
import P2POrderModal from "../../modal/P2PModal";
import { FaArrowLeft, FaComment, FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import surdatoken from "../../../img/SurdaToken.png";
import usdttoken from "../../../img/usdtToken.png";

const P2POrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { offer: Offer; type: "buy" | "sell" };

  const [isModalOpen, setIsModalOpen] = useState(false);
  /*  const [amount, setAmount] = useState(""); */

  if (!state?.offer) {
    navigate("/dashboard/p2p-market"); // fallback
    return null;
  }

  const { offer, type } = state;

  return (
    <div className="min-h-screen text-white pb-20 ">
      <div className=" pb-2 mb-2">
        <h2 className="text-xl font-semibold mb-1 ">P2P Marketplace</h2>
        <p className="text-sm text-white/60 ">
          Trade SURDA tokens directly with peers in a secure escrow system —
          fast, transparent, and hassle-free.
        </p>
        <div className=" flex shadow shadow-white/14 p-2 items-center gap-2 mt-2">
          <p
            onClick={() => navigate(-1)}
            className="text-xs cursor-pointer text-white/40  flex gap-1 items-center font-semibold"
          >
            <FaArrowLeft
              size={28}
              className="p-2 rounded-full shadow-inner shadow-white/40"
            />{" "}
            Marketplace
          </p>
          <p className="text-xs font-semibold text-white/90 flex gap-1 items-center ">
            <FaArrowRightLong size={20} className="h-4 text-white/60" />
            {type === "buy" ? "Buy Order" : "Sell Order"}
          </p>
        </div>
      </div>

      {/* Order Overview */}
      <div className="flex flex-col md:flex-row gap-2">
        {/* Left Section (Form) */}
        <div className="bg-white/2 border border-white/5 pb-10 p-2 sm:ps-4  flex-1 md:flex-8/12">
          <h3 className=" w-fit px-4 sm:px-2 py-1  text-white/60 bg-white/10 capitalize rounded  text-sm font-bold mb-3 mt-2">
            Order Overview
          </h3>
          <p className="text-sm font-bold mb-2 flex items-center gap-1">
            Sell:{" "}
            <span className="flex items-center font-normal text-white/55 gap-1">
              <img src={surdatoken} alt="surda" className="w-5" />
              Surda
            </span>
          </p>
          <div className="bg-black/40 rounded-2xl p-3 shadow-inner shadow-white/30 py-6">
            <div className="  rounded-lg mb-4">
              <label className="text-xs text-white/50">I will sell</label>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  className="w-3/4 text-sm placeholder:text-blue-500 bg-black border text-blue-500 border-white/10 px-3 py-2 rounded mt-1 mb-2"
                  placeholder="0.00"
                />
                <span className="flex items-center font-normal text-xs text-white/55 gap-1">
                  <img src={surdatoken} alt="surda" className="w-5" />
                  Surda
                </span>
              </div>
              <small className="text-white/50">Available: 500,546 SURDA</small>
            </div>

            <div className="  rounded-lg mb-4">
              <label className="text-xs text-white/50">I will receive</label>
              <div className="flex items-center justify-between">
                <input
                  type="number"
                  className="w-3/4 text-sm placeholder:text-blue-500 bg-black border text-blue-500 border-white/10 px-3 py-2 rounded mt-1 mb-2"
                  placeholder="0.00"
                />
                <span className="flex items-center font-normal text-xs text-white/55 gap-1">
                  <img src={usdttoken} alt="usdt" className="w-5" />
                  USDT
                </span>
              </div>
            </div>

            <p className="text-xs mb-2">Payment Method</p>
            <button className="bg-white/10 text-xs p-2 rounded mb-4">
              Surdatix Escrow Function
            </button>

            <div className="flex justify-between items-center mx-auto gap-4 max-w-lg">
              <button
                onClick={() => navigate(-1)}
                className="w-full bg-white/10 py-1 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-blue-500 text-black py-1 rounded"
              >
                {type === "buy" ? "Buy Now" : "Sell Now"}
              </button>
            </div>

            <p className="text-[10px] text-yellow-400 text-center mt-2">
              ⚠️ Your account will be credited 10–15 minutes after the order is
              triggered and fulfilled
            </p>
          </div>
        </div>

        {/* Right Section (Merchant Info) */}
        <div className="bg-white/2 border border-white/5 p-4  w-full md:flex-4/12">
          <h3 className="w-fit px-4 sm:px-2 py-1  text-white/60 bg-white/10 capitalize rounded  text-sm font-bold mb-3 mt-2">Merchant Details</h3>
          <div className="bg-black/40 rounded-2xl p-3 space-y-6 shadow-inner shadow-white/30 py-6">
            <div className="flex items-center gap-3 flex-wrap">
              <img
                src={`https://i.pravatar.cc/40?u=${offer.id}`}
                alt="avatar"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-base sm:text-lg flex items-center gap-2 text-white/90 font-semibold flex-wrap">
                  {offer.username}
                  <p className="flex items-center gap-1 flex-wrap">
                    <FaStar
                      className={`${
                        Number(offer.id) % 2 ? "text-blue-500" : "text-white/20"
                      }`}
                    />{" "}
                    <FaComment className={`text-blue-500`} />
                  </p>
                </div>
                <div className="text-xs text-white/40 flex flex-col items-center gap-1 ">
                  <h4 className=" flex items-center gap-1 flex-wrap ">
                    <p>218 Orders</p>
                    <p>|</p>
                    <p>{offer.completionRate || 0}% Completion</p>
                  </h4>

                
                </div>
              </div>
            </div>

            <div className="text-xs text-white/70 space-y-1">
              <p className="flex items-center justify-between px-4">
                <span className="text-white/40">Available:</span> {offer.amount }
                {" Surda"}
              </p>
              <p className="flex items-center justify-between px-4">
                <span className="text-white/40">Limit:</span> {offer.limit}
              </p>
              <p className="flex items-center justify-between px-4">
                <span className="text-white/40">Payment Time:</span> 5–15 mins
              </p>
              <p className="flex items-center justify-between px-4">
                <span className="text-white/40">Payment Method:</span>{" "}
                {offer.payment.join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Modal on page (optional) */}
      {isModalOpen && (
        <P2POrderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          type={type}
          offer={offer}
          /* amountToSell={enteredAmount}
          amountToReceive={calculatedAmount} */
        />
      )}
    </div>
  );
};

export default P2POrderPage;
