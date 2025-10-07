import React, { useEffect, useState } from "react";
import surdatoken from "../../img/SurdaToken.png";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from "../../api/useAuth";

interface MarketplaceBuyModalProps {
  isOpen: boolean;
  onClose: () => void;
  img: string;
  title: string;
  price: number;
}

const MarketplaceBuyModal: React.FC<MarketplaceBuyModalProps> = ({
  isOpen,
  onClose,
  img,
  title,
  price,
}) => {
  const { userWallet } = useAuth();
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const handleUserWallet = async () => {
      try {
        const res = await userWallet();
        if (res.data) {
          setBalance(res.data?.balance || 0);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handleUserWallet();
  }, []);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="bg-black/90 border border-white/10 rounded-2xl w-[95%] sm:w-[500px] max-h-[90vh] overflow-y-auto shadow-lg p-4 sm:p-6 relative">
        {/* Header */}
        <div className="flex justify-between border-b-2 border-dashed border-b-white/20 mb-6 ">
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">
              Buy Survey
            </h2>
            <p className="text-xs text-white/60 mb-4">
              Buy targeted surveys to gather quality insights from verified
              respondents in our network.
            </p>
          </div>
          <AiOutlineClose
            size={22}
            className="text-gray-400 hover:text-white cursor-pointer"
            onClick={onClose}
          />
        </div>

        {/* Image */}
        <img
          src={img}
          alt={title}
          className="w-full h-52 object-cover rounded-xl shadow-md mb-4"
        />

        {/* Topic */}
        <div className="bg-white/10 text-xs px-2 py-1 rounded max-w-fit mb-2">
          Topic
        </div>
        <p className="text-white text-sm mb-4">{title}</p>

        {/* Price */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-white text-sm">Price:</span>
          <img src={surdatoken} alt="token" className="w-5" />
          <span className="text-blue-400 font-semibold">{price} Surda</span>
        </div>

        {/* Token Selection */}
        <div className="mb-3">
          <label className="block text-xs text-white/60 mb-1">
            Token for purchase
          </label>
          <select className="w-full bg-black/40 text-white border border-white/10 rounded-md px-3 py-2 text-sm focus:outline-none">
            <option value="surda">Surda Token</option>
          </select>
        </div>

        {/* Wallet */}
        <div className="mb-3">
          <label className="block text-xs text-white/60 mb-1">Wallet</label>
          <div className="bg-black/40 border border-white/10 rounded-md px-3 py-2 text-sm text-white flex items-center justify-between">
            <span>Pay with Wallet</span>
          </div>
        </div>

        {/* Balance */}
        <p className="text-xs tracking-wider text-green-400 my-4">
          Available:{Number(balance).toFixed(2)} SURDA
        </p>

        {/* System charge */}
        {/* <p className="text-xs text-white/50 mb-4">System Charge = 2%</p> */}

        {/* CTA */}
        <button className="w-full bg-blue-500 hover:bg-blue-400 text-white rounded-md py-2 text-sm font-semibold">
          List on Marketplace
        </button>
      </div>
    </div>
  );
};

export default MarketplaceBuyModal;
