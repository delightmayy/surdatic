import { useState } from "react";
import { FiCopy } from "react-icons/fi";
import token from "../../img/SurdaToken.png";
import profile from "../../img/profileEmail.png";
import numberBg from "../../img/numberBg.png";
import SurveySuccessModal from "../../component/modal/SuccessModal";

const initialReferrals = [
  { email: "jibug@example.com", reward: 50, status: "Pending" },
  { email: "jibug@example.com", reward: 50, status: "Pending" },
  { email: "jibug@example.com", reward: 50, status: "Claimed" },
  { email: "jibug@example.com", reward: 50, status: "Claimed" },
  { email: "jibug@example.com", reward: 50, status: "Claimed" },
  { email: "jibug@example.com", reward: 50, status: "Pending" },
  { email: "jibug@example.com", reward: 50, status: "Pending" },
  { email: "jibug@example.com", reward: 50, status: "Pending" },
  { email: "jibug@example.com", reward: 50, status: "Pending" },
  { email: "jibug@example.com", reward: 50, status: "Pending" },
];

const referralEarnings = [
  { amount: 50, user: "Surda", time: "13 mins ago" },
  { amount: 50, user: "Surda", time: "13 mins ago" },
  { amount: 50, user: "Surda", time: "13 mins ago" },
  { amount: 50, user: "Surda", time: "13 mins ago" },
  { amount: 50, user: "Surda", time: "13 mins ago" },
  { amount: 50, user: "Surda", time: "13 mins ago" },
  { amount: 50, user: "Surda", time: "13 mins ago" },
];

const DashEarn = () => {
  const [copied, setCopied] = useState(false);
  const [show, setShow] = useState(false);
  const [referralList, setReferralList] = useState(initialReferrals);

  const handleCopy = () => {
    navigator.clipboard.writeText(
      "https://surdarticles.com/referral?code=ABCD1234"
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = (index:number) => {
    setReferralList((prev) =>
      prev.map((ref, i) =>
        i === index && ref.status === "Pending"
          ? { ...ref, status: "Claimed" }
          : ref
      )
    );
    setShow(true);
  };

  const handleClaimAll = () => {
    setReferralList((prev) =>
      prev.map((ref) =>
        ref.status === "Pending" ? { ...ref, status: "Claimed" } : ref
      )
    );
  };

  return (
    <div className="text-white pb-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Left Section */}
      <div className="w-full lg:w-2/3 space-y-4  sm:px-4">
        <div>
          <h1 className="text-base font-semibold">Refer and Earn</h1>
          <p className="text-xs text-white/60">
            Share the love of surveys with your friends and colleagues, and earn
            points for each successful referral
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 p-4 overflow-y-auto h-[80vh] rounded-md space-y-4 text-white/70">
          {/* Referral Link */}
          <div>
            <p className="text-sm font-medium mb-2 px-4 py-1 bg-white/5 w-fit">
              Referral Link
            </p>
            <p className="text-xs font-semibold text-white/60 mb-2">
              Copy your referral link
            </p>
            <div className="flex items-center bg-black/30 border border-white/15 rounded-md overflow-hidden">
              <input
                type="text"
                className="flex-1 px-4 py-3 bg-transparent text-sm text-white/50 focus:outline-none"
                value="https://surdarticles.com/referral?code=ABCD1234"
                disabled
              />
              <button
                onClick={handleCopy}
                className={`px-4 py-2 border-white/10 rounded-md  text-xs transition ${
                  copied
                    ? "border border-white/10 text-blue-400 bg-white/10"
                    : ""
                }`}
              >
                {copied ? (
                  "Copied!"
                ) : (
                  <FiCopy size={16} className="text-blue-400" />
                )}
              </button>
            </div>
          </div>

          {/* Referral Table */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">My Referrals</h3>
              <button
                onClick={handleClaimAll}
                className="text-sm bg-blue-400 text-black hover:bg-blue-500 px-4 py-2 rounded-md"
              >
                Claim All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] text-xs text-left border border-white/5">
                <thead className="bg-white/5 text-white/50 text-xs">
                  <tr>
                    <th className="py-2 px-3 border-b border-white/5">#</th>
                    <th className="py-2 px-3 border-b border-white/5">Email</th>
                    <th className="py-2 px-3 border-b border-white/5">
                      Reward
                    </th>
                    <th className="py-2 px-3 border-b border-white/5">
                      Claim Status
                    </th>
                    <th className="py-2 px-3 border-b border-white/5">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {referralList.map((r, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="py-2 px-3">{idx + 1}</td>
                      <td className="py-2 text-white/80 px-3 flex flex-row  items-center gap-2">
                        <img src={profile} alt=".." className="w-6" /> {r.email}
                      </td>
                      <td className="py-2 px-3">
                        {r.status === "Claimed" ? (
                          <span className="text-green-400">Claimed</span>
                        ) : (
                          <span className="text-yellow-400">Pending</span>
                        )}
                      </td>
                      <td className="py-2 px-3 text-blue-400 font-semibold flex flex-row  items-center gap-2">
                        <img src={token} alt=".." className="w-6" /> +{r.reward}
                      </td>
                      <td className="py-2 px-3">
                        <button
                          onClick={() => handleClaim(idx)}
                          className={`text-xs px-3 py-1 border-4 text-nowrap border-white/15 bg-black/50 rounded-lg ${
                            r.status === "Claimed"
                              ? " text-white/40 cursor-not-allowed"
                              : "text-white/80 hover:text-blue-400 cursor-pointer "
                          }`}
                          disabled={r.status === "Claimed"}
                        >
                          {r.status === "Claimed" ? "Claim Now" : "Claim Now"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/3 sm:px-4 lg:px-0 space-y-4 ">
        {/* How It Works */}
        <div className=" ">
          <h3 className="text-sm font-semibold mb-2">How it Works</h3>
          <p className="text-xs text-white/60 mb-4">
            Refer a friend or colleague
          </p>

          <div className="space-y-4 border bg-white/5 p-4  rounded-b-lg overflow-y-auto max-h-72  border-white/10">
            <p className="text-sm font-medium mb-4 px-4 py-1 bg-white/5 w-fit ">
              Guidelines
            </p>
            <div className="flex gap-3 items-center ">
              <div
                className="w-14 h-10  rounded-full text-blue-400 text-xs flex justify-center items-center text-center leading-5"
                style={{
                  backgroundImage: `url(${numberBg})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // optional, makes sure it fills the area
                }}
              >
                1
              </div>
              <p className="text-xs">
                Share your unique referral code with friends and colleagues.
              </p>
            </div>
            <div className="flex gap-3 items-center">
              <div
                className="w-14 h-10  rounded-full text-blue-400 text-xs flex justify-center items-center text-center leading-5"
                style={{
                  backgroundImage: `url(${numberBg})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // optional, makes sure it fills the area
                }}
              >
                2
              </div>
              <p className="text-xs">Your friends create a new survey</p>
            </div>
            <div className="flex gap-3 items-center">
              <div
                className="w-14 h-10  rounded-full text-blue-400 text-xs flex justify-center items-center text-center leading-5"
                style={{
                  backgroundImage: `url(${numberBg})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // optional, makes sure it fills the area
                }}
              >
                3
              </div>
              <p className="text-xs">Redeem Your Points</p>
            </div>
            <div className="flex gap-3 items-center">
              <div
                className="w-14 h-10  rounded-full text-blue-400 text-xs flex justify-center items-center text-center leading-5"
                style={{
                  backgroundImage: `url(${numberBg})`,
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover", // optional, makes sure it fills the area
                }}
              >
                4
              </div>
              <p className="text-xs">
                Keep track of your points in the "Referral" section
              </p>
            </div>
          </div>
        </div>

        {/* Referral Earnings */}
        <div className="bg-white/5 p-4 rounded-b-lg border border-white/10">
          <h3 className="text-sm font-medium mb-2 px-4 py-1 bg-white/5 w-fit">
            Referral Earnings
          </h3>
          <p className="text-xs text-white/60 mb-2">
            Keep track of your earnings in real time
          </p>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {referralEarnings.map((entry, i) => (
              <div
                key={i}
                className="  text-xs  bg-black/50 p-3 ps-6  flex items-center justify-start gap-3 rounded-2xl shadow-inner shadow-white/30 hover:scale-95"
              >
                <p className="text-blue-400 flex gap-2 items-center font-semibold">
                  <img src={token} alt="token" className="w-6" /> +
                  {entry.amount}
                </p>
                <span className="text-white/80 font-semibold ">
                  {entry.user}
                </span>
                <span className="text-white/50">{entry.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {show && (
        <SurveySuccessModal
          onClose={() => setShow(false)}
          title={"Refer and Earn"}
          subtitle={
            "Share the love of surveys with your friends and colleagues, and earn points for each successful referral"
          }
          rewardAmount={50}
          titleB={"Reward Claim Successfully"}
          subtitleB={
            "Your reward has been claimed and is automatically added to your wallet balance"
          }
           buttonA={"More Rewards"}
        />
      )}
    </div>
  );
};

export default DashEarn;
