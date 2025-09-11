
import { useState } from "react";
import numberBg from "../../img/numberBg.png";
import token from "../../img/SurdaToken.png";

const stakingPlans = [
  { type: "Flexible", duration: "7 Days", apy: "35%", minStake: 500 },
  { type: "Flexible", duration: "14 Days", apy: "35%", minStake: 800 },
  { type: "Flexible", duration: "30 Days", apy: "35%", minStake: 1000 },
  { type: "Flexible", duration: "60 Days", apy: "35%", minStake: 1500 },
];

const DashStake = () => {
  const [activePlan, setActivePlan] = useState<null | number>(null);

  return (
    <div className="text-white pb-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Left Column */}
      <div className="w-full lg:w-2/3 space-y-4 sm:px-4">
        <div>
          <h1 className="text-base font-semibold">Stake</h1>
          <p className="text-xs text-white/60">
            Lock your SURDA tokens to earn passive rewards and boost your long-term holdings.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3">
          <button className="text-xs px-3 py-2 bg-white/10 border border-white/20 rounded-md">
            Stake Overview
          </button>
          <button className="text-xs px-3 py-2 bg-blue-500 text-black rounded-md">
            Active Stake
          </button>
        </div>

        {/* Stake Status Box */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="w-24 h-24 rounded-full border-4 border-white/10 flex items-center justify-center">
              <p className="text-sm text-white/60">Status</p>
            </div>
            <p className="text-base text-blue-400 font-semibold">Inactive</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-white/40 mb-1">Period Left</p>
            <h2 className="text-xl font-bold">00 D : 00 H : 00 M</h2>
            <p className="text-xs text-white/40 mt-2">No Plan</p>
          </div>
        </div>

        {/* Staking Details Box */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-3 text-xs">
          <div className="flex justify-between">
            <span className="text-white/60">Staking Plan:</span>
            <span className="text-white/80">Flexible</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Asset Staked:</span>
            <span className="text-white/80">Surda</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Period of Staking:</span>
            <span className="text-white/80">24 Hrs</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">APY:</span>
            <span className="text-white/80">35%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Reward:</span>
            <span className="flex items-center gap-1 text-blue-400 font-semibold">
              <img src={token} alt="token" className="w-5" /> 0 Surda
            </span>
          </div>
          <div className="flex justify-between items-center pt-3 border-t border-white/10">
            <span className="text-white/60">Automatic Restake:</span>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="relative w-10 h-5 bg-white/10 peer-focus:outline-none peer-checked:bg-blue-500 rounded-full transition-all"></div>
            </label>
          </div>
          <button className="w-full mt-4 bg-white/10 text-white/40 text-sm py-2 rounded-md cursor-not-allowed">
            Unstake
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/3 sm:px-4 lg:px-0 space-y-6">
        {/* How to Stake */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-1">How to Stake</h3>
          <p className="text-xs text-white/60 mb-4">Learn how to stake SURDA effectively in four simple steps</p>
          <p className="text-sm font-medium mb-3 px-4 py-1 bg-white/10 w-fit">Guidelines</p>
          <div className="space-y-3">
            {[
              "Choose a plan based on your preferred duration and APY",
              "Choose Asset to stake",
              "Confirm Staking",
              "Track & Claim Rewards"
            ].map((step, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div
                  className="w-14 h-10 rounded-full text-blue-400 text-xs flex justify-center items-center"
                  style={{
                    backgroundImage: `url(${numberBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {index + 1}
                </div>
                <p className="text-xs">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Staking Plans */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
          <h3 className="text-sm font-medium mb-3 px-4 py-1 bg-white/10 w-fit">Staking Plan</h3>
          <p className="text-xs text-white/60 mb-4">Choose the plan that suits your needs</p>
          <div className="space-y-3">
            {stakingPlans.map((plan, idx) => (
              <div
                key={idx}
                className="bg-black/50 text-xs p-4 rounded-xl flex items-center justify-between hover:scale-95 transition-transform"
              >
                <div className="space-y-1">
                  <p className="font-semibold">{plan.type}</p>
                  <p className="text-white/60">APY: {plan.apy}</p>
                  <p className="text-white/40">Min: {plan.minStake} tokens</p>
                </div>
                <button
                  onClick={() => setActivePlan(idx)}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition ${
                    activePlan === idx
                      ? "bg-white text-black"
                      : "bg-blue-500 hover:bg-blue-600 text-black"
                  }`}
                >
                  {activePlan === idx ? "Activated" : "Activate"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashStake;
