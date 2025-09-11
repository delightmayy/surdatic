import { useState } from "react";
import mtnicon from "../../img/mtn.png";
import gloicon from "../../img/glo.png";
import Airtelicon from "../../img/airtel.png";
import Nmobileicon from "../../img/9mobile.png";
import token from "../../img/SurdaToken.png";
import { FaWallet } from "react-icons/fa";
import AirtimePurchaseModal from "../../component/modal/AirtimePurchaseModal";

const networks = [
  { name: "Mtn", icon: mtnicon },
  { name: "Glo", icon: gloicon },
  { name: "Airtel", icon: Airtelicon },
  { name: "9Mobile", icon: Nmobileicon },
];

const beneficiaries = [
  { network: "Mtn", number: "09012345671" },
  { network: "Glo", number: "09012345672" },
  { network: "Airtel", number: "09012345673" },
  { network: "9Mobile", number: "09012345674" },
  { network: "Mtn", number: "09012345675" },
  { network: "Mtn", number: "09012345671" },
  { network: "Glo", number: "09012345672" },
  { network: "Airtel", number: "09012345673" },
  { network: "9Mobile", number: "09012345674" },
  { network: "Mtn", number: "09012345675" },
  { network: "Mtn", number: "09012345671" },
  { network: "Glo", number: "09012345672" },
  { network: "Airtel", number: "09012345673" },
  { network: "9Mobile", number: "09012345674" },
  { network: "Mtn", number: "09012345675" },
  { network: "Mtn", number: "09012345671" },
  { network: "Glo", number: "09012345672" },
  { network: "Airtel", number: "09012345673" },
  { network: "9Mobile", number: "09012345674" },
  { network: "Mtn", number: "09012345675" },
];

const presetAmounts = [100, 200, 500, 1000];
const presetData = [
  { plan: "1gb", amount: 1000 },
  { plan: "2gb", amount: 2000 },
  { plan: "5gb", amount: 3000 },
  { plan: "10gb", amount: 4000 },
];

const DashData = () => {
  const [activeNetwork, setActiveNetwork] = useState("Mtn");
  const [purchaseOption, setPurchaseOption] = useState("Airtime");
  const [Phone, setPhone] = useState("");
  const [airtimeModal, setAirtimeModal] = useState(false);
  const [amount, setAmount] = useState<number | null>(null);
  const [dataAmount, setDataAmount] = useState("");

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
            <div className="flex justify-between  sm:justify-start gap-1 sm:gap-6 max-w-md ">
              {networks.map((net) => (
                <div
                  key={net.name}
                  className=" flex  flex-col items-center gap-3 "
                >
                  <button
                    key={net.name}
                    onClick={() => setActiveNetwork(net.name)}
                    className={`flex  flex-col items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full shadow-inner ${
                      activeNetwork === net.name
                        ? "shadow-blue-500 bg-blue-600/10"
                        : "shadow-white/20 hover:border-white/40"
                    } transition`}
                  >
                    <img src={net.icon} alt={net.name} className=" p-4" />
                  </button>
                  <div
                    className={`text-sm mt-1 ${
                      activeNetwork === net.name
                        ? "text-blue-400"
                        : "text-white/70"
                    }`}
                  >
                    {net.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Purchase Option */}
          <div>
            <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-2 text-sm">
              Purchase Option
            </h2>
            <p className="text-xs text-white/70 mb-2">Select Purchase Option</p>
            <div className="flex gap-4 w-full ">
              <button
                onClick={() => setPurchaseOption("Airtime")}
                className={`px-4 py-2 rounded-md text-sm border flex-1 ${
                  purchaseOption === "Airtime"
                    ? "border-blue-500/30 text-white"
                    : "border-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                Airtime
              </button>
              <button
                onClick={() => setPurchaseOption("Data")}
                className={`px-4 py-2 flex-1 border rounded-md text-sm ${
                  purchaseOption === "Data"
                    ? "border-blue-500/30 text-white"
                    : "border-white/10 text-white/60 hover:bg-white/20"
                }`}
              >
                Data
              </button>
            </div>
          </div>

          {/* From & To Number */}
          <div className="space-y-4">
            <div>
              <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-2 text-sm">
                Phone Number
              </h2>
              <label className="text-xs block mb-1 text-white/70">
                Enter Phone Number
              </label>
              <div className="relative flex gap-2 items-center">
                <div className="w-10 h-10 flex  items-center justify-center rounded-full p-2 bg-white/2">
                  <img
                    src={
                      activeNetwork === "Mtn"
                        ? mtnicon
                        : activeNetwork === "Glo"
                        ? gloicon
                        : activeNetwork === "Airtel"
                        ? Airtelicon
                        : Nmobileicon
                    }
                    alt="network"
                    className=" w-10  "
                  />
                  {/* <select name="selectnetwork" id="selectnetwork" className=" border border-white/5! ">
                    {networks.map((x, xid) => (
                      <option key={x.name} className="bg-black/90 border border-white/5 text-xs">{xid === 0 ? ">" : x.name}</option>
                    ))}
                  </select> */}
                </div>
                <input
                  type="number"
                  required
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 px-4 py-3 rounded-md text-sm focus:outline-none"
                  placeholder="Enter Phone Number"
                />
              </div>
            </div>
          </div>

          {/* Amount Presets */}
          {purchaseOption === "Airtime" && (
            <div>
              <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-3 text-sm">
                Amount (₦)
              </h2>
              <div className="flex gap-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt)}
                    className={`px-4 py-2 rounded-md border text-sm ${
                      amount === amt
                        ? "border-blue-500/30 text-white"
                        : "border-white/10 text-white/70 hover:bg-white/5"
                    }`}
                  >
                    ₦{amt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {purchaseOption === "Data" && (
            <div>
              <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-3 text-sm">
                Amount (gb)
              </h2>
              <div className="flex gap-3">
                {presetData.map((amt) => (
                  <button
                    key={amt.plan}
                    onClick={() => {
                      setAmount(amt.amount);
                      setDataAmount(amt.plan);
                    }}
                    className={`px-4 py-2 rounded-md border text-sm ${
                      amount === amt.amount
                        ? "border-blue-500/30 text-white"
                        : "border-white/10 text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {amt.plan}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Equivalent USD */}
          <h2 className="w-fit px-2 py-1 bg-white/10 capitalize rounded mb-2 text-sm">
            Amount in Surda
          </h2>
          <div>
            <p className="text-xs block mb-1 text-white/70">
              Equivalent Surda Amount
            </p>
            <button
              disabled
              className="w-full flex items-center gap-2 bg-black/30 border border-white/10 px-4 py-3 rounded-md text-sm focus:outline-none text-white/60"
            >
              <img src={token} alt="surda" className="h-5 w-5" />
              {`${amount ? (amount / 1000).toFixed(2) : "0.00"}`}
            </button>
          </div>

          {/* Wallet Info */}
          <h2 className="w-fit px-2 py-1 bg-white/10 capitalize rounded mb-2 text-sm">
            Amount in Surda
          </h2>
          <div>
            <p className="text-xs block mb-1 text-white/70">Wallet</p>
            <button
              disabled
              className="w-full flex items-center gap-2 font-bold bg-black/30 border border-white/10 px-4 py-3 rounded-md text-sm focus:outline-none text-white/60"
            >
              {" "}
              <FaWallet size={16} /> Pay with Wallet
            </button>
          </div>
          <p className="text-xs text-white/40">
            Available:{" "}
            <span className="text-white/70 font-medium">60 548.00 SURDA</span>
          </p>

          {/* Purchase Button */}
          <button
            onClick={() => setAirtimeModal(true)}
            className="w-full bg-blue-400 hover:bg-blue-400/70 text-black py-3 rounded-md mt-4 transition-all text-sm font-semibold"
          >
            Purchase
          </button>
        </div>
      </div>

      {/* Right Section - Beneficiary List */}
      <div className="w-full lg:w-1/3 rounded-lg   space-y-6">
        <div className="px-4">
          <h1 className="text font-semibold"> Beneficiary List</h1>
          <p className="text-xs text-white/60">
            Access beneficiary lists ea-basesily
          </p>
        </div>
        <ul className="space-y-3  bg-white/2 p-4 border border-white/5 max-h-[90vh] overflow-y-auto">
          {beneficiaries.map((b, idx) => (
            <li
              key={idx}
              onClick={() => {
                setActiveNetwork(b.network);
                setPhone(b.number);
              }}
              className="bg-black/10 border border-white/10 hover:border-blue-400/30 px-4 py-2 rounded-md flex items-center gap-3"
            >
              <img
                src={
                  b.network === "Mtn"
                    ? mtnicon
                    : b.network === "Glo"
                    ? gloicon
                    : b.network === "Airtel"
                    ? Airtelicon
                    : Nmobileicon
                }
                alt={b.network}
                className=" w-10 h-10 p-1 rounded-full"
              />
              <span className="text-md tracking-widest hover:text-blue-400 text-white/80 ">
                {b.number}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {airtimeModal && (
        <AirtimePurchaseModal
          onClose={() => setAirtimeModal(false)}
          phone={Phone}
          amount={Number(amount)}
          network={activeNetwork}
          option={purchaseOption}
          dataAmount={dataAmount}
          surdaAmount={`${amount ? (amount / 1000).toFixed(2) : "0.00"}`}
        />
      )}
    </div>
  );
};

export default DashData;
