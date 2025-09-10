import { useState } from "react";
import { FiCopy } from "react-icons/fi";

const networks = [
  { name: "MTN", icon: "🟡" },
  { name: "Glo", icon: "🟢" },
  { name: "Airtel", icon: "🔴" },
  { name: "9Mobile", icon: "🟠" },
];

const beneficiaries = [
  "09012345671",
  "09012345672",
  "09012345673",
  "09012345674",
  "09012345675",
  "09012345676",
  "09012345677",
  "09012345678",
  "09012345679",
  "09012345671",
  "09012345672",
  "09012345673",
  "09012345674",
  "09012345675",
  "09012345676",
  "09012345677",
  "09012345678",
  "09012345679",
];

const presetAmounts = [100, 200, 500, 1000];

const DashData = () => {
  const [activeNetwork, setActiveNetwork] = useState("MTN");
  const [purchaseOption, setPurchaseOption] = useState("Airtime");
  const [Phone, setPhone] = useState("");
  const [amount, setAmount] = useState<number | null>(null);

  return (
    <div className="text-white pb-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-4">
      {/* Left Section - Form */}
      <div className="w-full lg:w-2/3 space-y-6  ">
        <div className="px-4">
          <h1 className="text-base font-semibold">Airtime & Data</h1>
          <p className="text-xs text-white/60">
            Purchase Airtime or Data instantly from your wallet or using other
            methods.
          </p>
        </div>
        <div className="bg-white/2  py-6 px-4 space-y-6 border border-white/5">
          {/* Select Network */}
          <div>
            <p className="text-sm text-white/60 mb-2">Select Network</p>
            <div className="flex gap-4">
              {networks.map((net) => (
                <button
                  key={net.name}
                  onClick={() => setActiveNetwork(net.name)}
                  className={`flex flex-col items-center justify-center w-20 h-20 rounded-full border-2 ${
                    activeNetwork === net.name
                      ? "border-blue-500 bg-blue-600/10"
                      : "border-white/20 hover:border-white/40"
                  } transition`}
                >
                  <span className="text-2xl">{net.icon}</span>
                  <span className="text-xs mt-1">{net.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Purchase Option */}
          <div>
            <p className="text-sm text-white/60 mb-2">Select Purchase Option</p>
            <div className="flex gap-4">
              <button
                onClick={() => setPurchaseOption("Airtime")}
                className={`px-4 py-2 rounded-md text-sm ${
                  purchaseOption === "Airtime"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                Airtime
              </button>
              <button
                onClick={() => setPurchaseOption("Data")}
                className={`px-4 py-2 rounded-md text-sm ${
                  purchaseOption === "Data"
                    ? "bg-blue-500 text-white"
                    : "bg-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                Data
              </button>
            </div>
          </div>

          {/* From & To Number */}
          <div className="space-y-4">
            <div>
              <label className="text-sm block mb-1 text-white/70">
                Enter Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-md text-sm focus:outline-none"
                  placeholder="Enter Phone Number"
                />
                <FiCopy className="absolute top-3 right-3 text-white/30 cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Amount Presets */}
          <div>
            <p className="text-sm text-white/60 mb-2">Amount (₦)</p>
            <div className="flex gap-3">
              {presetAmounts.map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt)}
                  className={`px-4 py-2 rounded-md text-sm ${
                    amount === amt
                      ? "bg-blue-500 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  ₦{amt}
                </button>
              ))}
            </div>
          </div>

          {/* Equivalent USD */}
          <div>
            <label className="text-sm block mb-1 text-white/70">
              Equivalent in USD
            </label>
            <input
              disabled
              className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-md text-sm focus:outline-none text-white/60"
              value={`$${amount ? (amount / 1000).toFixed(2) : "0.00"}`}
            />
          </div>

          {/* Wallet Info */}
          <div>
            <label className="text-sm block mb-1 text-white/70">Wallet</label>
            <input
              disabled
              className="w-full bg-black/30 border border-white/10 px-4 py-3 rounded-md text-sm focus:outline-none text-white/60"
              value="Pay with Wallet"
            />
          </div>
          <p className="text-xs text-white/40">
            Available:{" "}
            <span className="text-white/70 font-medium">₦60,548.00</span>
          </p>

          {/* Purchase Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-md mt-4 transition-all text-sm font-semibold">
            Purchase
          </button>
        </div>
      </div>

      {/* Right Section - Beneficiary List */}
      <div className="w-full lg:w-1/3 rounded-lg  max-h-[700px] overflow-y-auto space-y-6">
        
        <div className="px-4">
          <h1 className="text font-semibold"> Beneficiary List</h1>
          <p className="text-xs text-white/60">
            Access beneficiary lists ea-basesily
          </p>
        </div>
        <ul className="space-y-3  bg-white/2 p-4 border border-white/5">
          {beneficiaries.map((phone, idx) => (
            <li
              key={idx}
              className="bg-white/5 hover:bg-white/10 px-4 py-2 rounded-md flex items-center justify-between"
            >
              <span className="text-sm text-white/80">{phone}</span>
              <button className="text-blue-500 text-xs">Select</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashData;
