import { useEffect, useState } from "react";
import mtnicon from "../../img/mtn.png";
import gloicon from "../../img/glo.png";
import Airtelicon from "../../img/airtel.png";
import Nmobileicon from "../../img/9mobile.png";
import token from "../../img/SurdaToken.png";
import { FaSpinner, FaWallet } from "react-icons/fa";
import AirtimePurchaseModal from "../../component/modal/AirtimePurchaseModal";
import axios from "axios";
import ErrorModal from "../../component/modal/ErrorModal";

const networks = [
  { name: "Mtn", icon: mtnicon },
  { name: "Glo", icon: gloicon },
  { name: "Airtel", icon: Airtelicon },
  { name: "9Mobile", icon: Nmobileicon },
];

interface Beneficiary {
  network: string;
  phone: string;
}

interface PresetBundle {
  availability: string;
  data_plan: string;
  price: string;
  reseller_price: string;
  service_id: string;
  service_name: string;
  variation_id: number;
}

const presetAmounts = [100, 200, 500, 1000, 2000, 5000, 10000];

const DashData = () => {
  const [activeNetwork, setActiveNetwork] = useState("Mtn");
  const [purchaseOption, setPurchaseOption] = useState<"Airtime" | "Data">(
    "Airtime"
  );
  const [Phone, setPhone] = useState("");
  const [airtimeModal, setAirtimeModal] = useState(false);
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState<number | null>(null);
  const [dataAmount, setDataAmount] = useState("");
  const [vId, setVId] = useState("");
  const [PresetBundle, setPresetBundle] = useState<PresetBundle[] | null>(null);
  const [beneficiaries, setBeneficiaries] = useState<Beneficiary[] | null>(
    null
  );

  const [accessPin, setAccessPin] = useState("");

  const [errorModal, setErrorModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [surdaAmount, setSurdaAmount] = useState("0.00");

  const handleDefaultField = () => {
    if (!activeNetwork || !purchaseOption || !amount || !Phone) {
      setErrorMessage(" Please fill all fields");
      setErrorModal(true);
    }
  };

  const handleSubmit = async () => {
    if (!activeNetwork || !purchaseOption || !amount || !Phone) {
      setErrorMessage(" Please fill all fields");
      setErrorModal(true);
      return;
    }

    setLoading(true);
    try {
      const postData =
        purchaseOption === "Airtime"
          ? {
              phone: Phone,
              network: activeNetwork.toLowerCase(),
              token_amount: "0.02" /*  surdaAmount */,
              pin: accessPin,
            }
          : {
              phone: Phone,
              network: activeNetwork.toLowerCase(),
              variation_id: vId,
              token_amount: surdaAmount,
              pin: accessPin,
            };

      const response = await axios.post(
        `https://api-surdatics.onrender.com/api/v1/redeeem/${purchaseOption.toLowerCase()}`,

        postData
      );

      if (response.data.code === "success") {
        /*  alert("✅ Top-up successful!"); */
        setStep(3);
        console.log("Transaction ID:", response.data.order_id);
      } else {
        setErrorMessage(` Failed: ${response.data.message}`);
        setErrorModal(true);
      }
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setErrorMessage(
            `API Error: ${
              error.response.data?.message || "Something went wrong"
            }`
          );

          setErrorModal(true);
        } else {
          setErrorMessage(" Network Error. Please check your connection.");
          setErrorModal(true);
        }
      } else {
        setErrorMessage(" Unexpected error occurred");
        setErrorModal(true);
      }
      console.error("Top-up error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConvertToken = async (Amount: number) => {
    try {
      const response = await axios.post(
        "https://api-surdatics.onrender.com/api/v1/convert/ngn_to_token",
        {
          token_name: "surda",
          amount_in_naira: Amount?.toString(),
        }
      );
      response.status && setSurdaAmount(response.data.amount_in_token);
    } catch (error) {
      setSurdaAmount("");
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      setPresetBundle(null);
      try {
        const response = await axios.get(
          `https://api-surdatics.onrender.com/api/v1/redeem/products/${activeNetwork.toLocaleLowerCase()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status) {
          setPresetBundle(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchBeneficiary = async () => {
      const token = localStorage.getItem("token");
      setPresetBundle(null);
      try {
        const response = await axios.get(
          `https://api-surdatics.onrender.com/api/v1/redeem/beneficiaries`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status) {
          setBeneficiaries(response.data.beneficiaries);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBeneficiary();
    fetchData();
  }, [activeNetwork, purchaseOption]);

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
                </div>
                <input
                  type="text"
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
              <div className="flex flex-wrap gap-3">
                {presetAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => {
                      setAmount(amt);
                      handleConvertToken(amt);
                    }}
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
                {activeNetwork} Data
              </h2>
              <div className="flex flex-wrap gap-3 items-center justify-center ">
                {PresetBundle === null && (
                  <div className="italic text-xs w-full text-blue-400 text-center bg-white/2 border border-white/20 p-3">
                    Loading Data
                  </div>
                )}
                {PresetBundle?.filter(
                  (d) => (d.availability = "Available")
                ).map((b) => (
                  <div
                    key={b.variation_id}
                    onClick={() => {
                      setAmount(Number(b.price));
                      setDataAmount(b.data_plan);
                      setVId(b.variation_id.toString());
                      handleConvertToken(Number(b.price));
                    }}
                    className={`p-2 rounded-md border flex flex-col justify-between items-center  h-22 gap-2 text-sm ${
                      amount === Number(b.price)
                        ? "border-blue-500/40 text-white"
                        : "border-white/20 text-white/70 hover:bg-white/5"
                    }`}
                  >
                    {" "}
                    <p className=" w-16 flex flex-wrap items text-xs text-center center justify-center">
                      {b.data_plan}
                    </p>
                    <p className=" w-12 flex flex-wrap items text-center text-xs text-blue-400 center justify-center">
                      ₦ {b.price}
                    </p>
                  </div>
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
              {surdaAmount}
            </button>
          </div>

          {/* Wallet Info */}
          <h2 className="w-fit px-2 py-1 bg-white/10 capitalize rounded mb-2 text-sm">
            Wallet
          </h2>
          <div>
            <p className="text-xs block mb-1 text-white/70">Wallet</p>
            <button
              disabled
              className="w-full flex items-center gap-2 font-bold bg-black/30 border border-white/10 px-4 py-3 rounded-md text-sm focus:outline-none text-white/60"
            >
              <FaWallet size={16} /> Pay with Wallet
            </button>
          </div>
          <p className="text-xs text-white/40">
            Available:{" "}
            <span className="text-white/70 font-medium">60 548.00 SURDA</span>
          </p>

          {/* Purchase Button */}
          <button
            onClick={() => {
              handleDefaultField();
              setAirtimeModal(true);
            }}
            disabled={surdaAmount === ""}
            className={`w-full bg-blue-400 hover:bg-blue-400/70 text-black py-3 rounded-md mt-4 transition-all text-sm font-semibold justify-center flex gap-2 items-center cursor-pointer disabled:cursor-not-allowed `}
          >
            {loading ? (
              <>
                Processing...
                <FaSpinner className="animate-spin text-black text-sm" />
              </>
            ) : (
              "Purchase"
            )}
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
        <ul className="space-y-3  bg-white/2 p-4 border border-white/5 h-[70vh]  lg:h-screen overflow-y-auto">
          {beneficiaries === null ? (
            <div className="italic text-xs w-full text-blue-400 text-center bg-white/2 border border-white/20 p-3">
              Loading Data
            </div>
          ) : (
            beneficiaries.map((b, idx) => (
              <li
                key={idx}
                onClick={() => {
                  setActiveNetwork(
                    b.network.charAt(0).toUpperCase() + b.network.substring(1)
                  );
                  setPhone(b.phone);
                }}
                className="bg-black/10 border border-white/10 hover:border-blue-400/30 px-4 py-2 rounded-md flex items-center gap-3"
              >
                <img
                  src={
                    b.network === "mtn"
                      ? mtnicon
                      : b.network === "glo"
                      ? gloicon
                      : b.network === "airtel"
                      ? Airtelicon
                      : Nmobileicon
                  }
                  alt={b.network}
                  className=" w-10 h-10 p-1 rounded-full"
                />
                <span className="text-md tracking-widest hover:text-blue-400 text-white/80 ">
                  {b.phone}
                </span>
              </li>
            ))
          )}
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
          surdaAmount={surdaAmount}
          step={step}
          setStep={setStep}
          /* accessPin={accessPin} */
          setAccessPin={setAccessPin}
          handleProceed={handleSubmit}
        />
      )}
      {errorModal && (
        <ErrorModal
          onClose={() => {
            setErrorModal(false);
            setAirtimeModal(false);
          }}
          message={errorMessage}
        />
      )}
    </div>
  );
};

export default DashData;
