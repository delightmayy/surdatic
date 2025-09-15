import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import type { Offer } from "../../../pages/dashboard/PTPMarket";
import P2POrderModal from "../../modal/P2PModal";

const P2POrderPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as { offer: Offer; type: "buy" | "sell" };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");

  if (!state?.offer) {
    navigate("/dashboard/p2p-market"); // fallback
    return null;
  }

  const { offer, type } = state;

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h2 className="text-xl font-semibold mb-4">
        {type === "buy" ? "Buy Order" : "Sell Order"}
      </h2>

      {/* Order Overview */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Section (Form) */}
        <div className="bg-white/5 rounded-lg p-6 flex-1">
          <h3 className="text-md font-bold mb-2">Order Overview</h3>
          <p className="text-sm mb-2">
            Sell: <strong>Surda</strong>
          </p>

          <div className="bg-black/30 p-4 rounded-lg mb-4">
            <label className="text-xs">I will sell</label>
            <input
              type="number"
              className="w-full bg-black border border-white/10 px-3 py-2 rounded mt-1 mb-2"
              placeholder="0.00"
            />
            <small className="text-white/50">Available: 500,546 SURDA</small>
          </div>

          <div className="bg-black/30 p-4 rounded-lg mb-4">
            <label className="text-xs">I will receive</label>
            <input
              type="number"
              className="w-full bg-black border border-white/10 px-3 py-2 rounded mt-1"
              placeholder="0.00"
            />
          </div>

          <p className="text-xs mb-2">Payment Method</p>
          <button className="bg-blue-900 text-xs px-3 py-1 rounded mb-4">
            Surdatix Escrow Function
          </button>

          <div className="flex justify-between gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full bg-white/10 py-2 rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-blue-500 text-black py-2 rounded"
            >
              {type === "buy" ? "Buy Now" : "Sell Now"}
            </button>
          </div>

          <p className="text-[10px] text-yellow-400 mt-2">
            ⚠️ Your account will be credited 10–15 minutes after the order is
            triggered and fulfilled
          </p>
        </div>

        {/* Right Section (Merchant Info) */}
        <div className="bg-white/5 rounded-lg p-6 w-full md:w-80">
          <h3 className="text-md font-bold mb-2">Merchant Details</h3>
          <div className="flex items-center gap-3 mb-3">
            <img
              src={`https://i.pravatar.cc/40?u=${offer.id}`}
              className="w-10 h-10 rounded-full"
              alt="avatar"
            />
            <div>
              <p className="font-semibold text-sm">{offer.username}</p>
              <p className="text-xs text-white/50">
                {offer.completionRate || 0}% Completion
              </p>
            </div>
          </div>

          <div className="text-xs text-white/70 space-y-1">
            <p>
              <span className="text-white/40">Available:</span> {offer.amount}{" "}
              Surda
            </p>
            <p>
              <span className="text-white/40">Limit:</span> {offer.limit}
            </p>
            <p>
              <span className="text-white/40">Payment Time:</span> 5–15 mins
            </p>
            <p>
              <span className="text-white/40">Payment Method:</span>{" "}
              {offer.payment.join(", ")}
            </p>
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
