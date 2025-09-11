import React, { useEffect, useMemo, useState } from "react";
import numberBg from "../../img/numberBg.png";
import token from "../../img/SurdaToken.png";
import StakeFormModal from "../../component/modal/StakeModal";
//import { FiSend, FiDownload, FiPlusSquare, FiFilter } from "react-icons/fi";

/* Plan type */
type Plan = {
  type: string;
  durationDays: number; // numeric duration used for timer
  durationLabel?: string; // optional friendly label
  apy: number; // 35 for 35%
  minStake: number;
};

/* Example plans (note: durationDays numeric helps timer calculations) */
const stakingPlans: Plan[] = [
  {
    type: "Flexible",
    durationDays: 1,
    durationLabel: "1 Days",
    apy: 35,
    minStake: 500,
  },
  {
    type: "Flexible",
    durationDays: 14,
    durationLabel: "14 Days",
    apy: 35,
    minStake: 800,
  },
  {
    type: "Flexible",
    durationDays: 30,
    durationLabel: "30 Days",
    apy: 35,
    minStake: 1000,
  },
  {
    type: "Flexible",
    durationDays: 60,
    durationLabel: "60 Days",
    apy: 35,
    minStake: 1500,
  },
];

type ActiveStake = {
  planIndex: number;
  start: number; // unix ms
  end: number; // unix ms
};

const msInDay = 24 * 60 * 60 * 1000;

function formatRemaining(ms: number) {
  if (ms <= 0) return "00 D : 00 H : 00 M : 00 S";
  const days = Math.floor(ms / msInDay);
  ms -= days * msInDay;
  const hours = Math.floor(ms / (60 * 60 * 1000));
  ms -= hours * 60 * 60 * 1000;
  const minutes = Math.floor(ms / (60 * 1000));
  ms -= minutes * 60 * 1000;
  const seconds = Math.floor(ms / 1000);
  const pad = (v: number) => String(v).padStart(2, "0");
  return `${pad(days)} D : ${pad(hours)} H : ${pad(minutes)} M : ${pad(
    seconds
  )} S`;
}

/* example reward estimate: reward tokens = stakedAmount * (apy/100) * (durationDays/365)
   Using the plan.minStake as staked amount for demonstration. */
function estimateReward(minStake: number, apy: number, durationDays: number) {
  return minStake * (apy / 100) * (durationDays / 365);
}

const DashStake: React.FC = () => {
  // either null or active stake object
  const [activeStake, setActiveStake] = useState<ActiveStake | null>(() => {
    // Optionally restore from localStorage
    try {
      const raw = localStorage.getItem("activeStake");
      return raw ? (JSON.parse(raw) as ActiveStake) : null;
    } catch {
      return null;
    }
  });

  const [isStakeModalOpen, setStakeModalOpen] = useState(false);

  // remaining ms for UI
  const [remainingMs, setRemainingMs] = useState<number>(() => {
    if (!activeStake) return 0;
    return Math.max(activeStake.end - Date.now(), 0);
  });

  // update remaining once per second
  useEffect(() => {
    if (!activeStake) {
      setRemainingMs(0);
      return;
    }
    // set immediately
    setRemainingMs(Math.max(activeStake.end - Date.now(), 0));

    const id = setInterval(() => {
      const rem = Math.max(activeStake.end - Date.now(), 0);
      setRemainingMs(rem);
      if (rem <= 0) {
        // stake expired, clear or mark complete
        clearInterval(id);
        setActiveStake(null);
        localStorage.removeItem("activeStake");
      }
    }, 1000);

    return () => clearInterval(id);
  }, [activeStake]);

  // persist activeStake to localStorage whenever it changes
  useEffect(() => {
    try {
      if (activeStake)
        localStorage.setItem("activeStake", JSON.stringify(activeStake));
      else localStorage.removeItem("activeStake");
    } catch {}
  }, [activeStake]);

  // derived selected plan if any
  const selectedPlan = useMemo(() => {
    if (activeStake == null) return null;
    return stakingPlans[activeStake.planIndex] ?? null;
  }, [activeStake]);

  // handler to activate a plan
  function activatePlan(planIndex: number) {
    const plan = stakingPlans[planIndex];
    const durationMs = plan.durationDays * msInDay;
    const start = Date.now();
    const end = start + durationMs;
    setActiveStake({ planIndex, start, end });
    // remaining will update via effect
  }

  // handler to unstake (clear)
  function unstake() {
    // TODO: perform actual unstake logic (backend call) then clear local state
    setActiveStake(null);
    localStorage.removeItem("activeStake");
    setRemainingMs(0);
  }

  // friendly strings
  const statusText = selectedPlan ? "Active" : "Inactive";
  const statusClass = selectedPlan ? "text-emerald-400" : "text-blue-400";
  const periodLeft = selectedPlan
    ? formatRemaining(remainingMs)
    : "00 D : 00 H : 00 M : 00 S";

  // estimated reward using minStake
  const estimatedReward = selectedPlan
    ? estimateReward(
        selectedPlan.minStake,
        selectedPlan.apy,
        selectedPlan.durationDays
      )
    : 0;

  const progress = selectedPlan
    ? Math.min(
        1,
        Math.max(
          0,
          (Date.now() - activeStake!.start) /
            (activeStake!.end - activeStake!.start)
        )
      )
    : 0;

  // Inside DashStake, above return
  async function handleStake({
    plan,
    period,
    amount,
  }: {
    plan: "Flexible" | "Locked";
    period: string;
    amount: number;
  }) {
    // Find matching plan from stakingPlans
    const planIndex = stakingPlans.findIndex(
      (p) =>
        p.type === plan &&
        (p.durationLabel ?? `${p.durationDays} Days`) === period
    );

    if (planIndex === -1) {
      console.error("Plan not found");
      return;
    }

    // Check minStake requirement
    if (amount < stakingPlans[planIndex].minStake) {
      alert(
        `Minimum stake for this plan is ${stakingPlans[planIndex].minStake}`
      );
      return;
    }

    // Call your activatePlan logic
    activatePlan(planIndex);

    // Close modal
    setStakeModalOpen(false);

    console.log("Staked:", { plan, period, amount });
  }

  return (
    <div className="text-white pb-20 max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
      {/* Left Column */}
      <div className="w-full lg:w-2/3 space-y-4 sm:px-4">
        <div>
          <h1 className="text-base font-semibold">Stake</h1>
          <p className="text-xs text-white/60">
            Lock your SURDA tokens to earn passive rewards and boost your
            long-term holdings.
          </p>
        </div>

        {/* Stake Status Box */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-6">
          <div className="flex flex-col items-center justify-center space-y-2  ">
            {/* progress circle */}
            <div className="relative w-32 h-32 flex flex-col items-center justify-center gap-2">
              {/* Background circle */}
              <svg className="absolute top-0 left-0 w-full h-full -rotate-90">
                <circle
                  cx="50%"
                  cy="50%"
                  r="46" // radius = (size/2 - strokeWidth/2)
                  stroke="rgba(255,255,255,0.1)" // grey bg border
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="46"
                  stroke="#60A5FA" // Tailwind blue-400 hex
                  strokeWidth="8"
                  fill="transparent"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 46} // circumference
                  strokeDashoffset={
                    2 * Math.PI * 46 * (1 - progress) // progress = 0 → empty, 1 → full
                  }
                  className="transition-all duration-1000"
                />
              </svg>

              {/* Content inside circle */}
              <p className="text-sm text-white/60">Status</p>
              <p className={`text-base font-semibold ${statusClass}`}>
                {statusText}
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-xs text-white/40 mb-1">Period Left</p>
            <h2 className="text-xl font-bold">{periodLeft}</h2>
            <p className="text-xs text-white/40 mt-2">
              {selectedPlan ? selectedPlan.type : "No Plan"}
            </p>
          </div>
        </div>

        {/* Staking Details Box */}
        <div className="bg-white/5 border border-white/10 p-6 rounded-lg space-y-3 text-xs">
          <div className="flex justify-between">
            <span className="text-white/60">Staking Plan:</span>
            <span className="text-white/80">
              {selectedPlan ? selectedPlan.type : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Asset Staked:</span>
            <span className="text-white/80">Surda</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Period of Staking:</span>
            <span className="text-white/80">
              {selectedPlan
                ? `${
                    selectedPlan.durationLabel ??
                    selectedPlan.durationDays + " Days"
                  }`
                : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">APY:</span>
            <span className="text-white/80">
              {selectedPlan ? `${selectedPlan.apy}%` : "-"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Reward (est):</span>
            <span className="flex items-center gap-1 text-blue-400 font-semibold">
              <img src={token} alt="token" className="w-5" />
              {selectedPlan ? `${estimatedReward.toFixed(2)} SURDA` : "0 SURDA"}
            </span>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-white/10">
            <span className="text-white/60">Automatic Restake:</span>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="relative w-10 h-5 bg-white/10 peer-focus:outline-none peer-checked:bg-blue-500 rounded-full transition-all" />
            </label>
          </div>

          <button
            onClick={unstake}
            disabled={!selectedPlan}
            className={`w-full mt-4 text-sm py-2 rounded-md transition ${
              selectedPlan
                ? "bg-blue-500 hover:bg-blue-600 text-black"
                : "bg-white/10 text-white/40 cursor-not-allowed"
            }`}
          >
            {selectedPlan ? "Unstake" : "Unstake (Disabled)"}
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full lg:w-1/3 sm:px-4 lg:px-0 space-y-6">
        {/* How to Stake */}
        <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
          <h3 className="text-sm font-semibold mb-1">How to Stake</h3>
          <p className="text-xs text-white/60 mb-4">
            Learn how to stake SURDA effectively in four simple steps
          </p>
          <p className="text-sm font-medium mb-3 px-4 py-1 bg-white/10 w-fit">
            Guidelines
          </p>
          <div className="space-y-3">
            {[
              "Choose a plan based on your preferred duration and APY",
              "Choose Asset to stake",
              "Confirm Staking",
              "Track & Claim Rewards",
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
          <h3 className="text-sm font-medium mb-3 px-4 py-1 bg-white/10 w-fit">
            Staking Plan
          </h3>
          <p className="text-xs text-white/60 mb-4">
            Choose the plan that suits your needs
          </p>
          <div className="space-y-3">
            {stakingPlans.map((plan, idx) => (
              <div
                key={idx}
                className="bg-black/50 text-xs p-4 rounded-xl flex items-center justify-between hover:scale-95 transition-transform"
              >
                <div className="space-y-1">
                  <p className="font-semibold">
                    {plan.type} •{" "}
                    {plan.durationLabel ?? `${plan.durationDays} Days`}
                  </p>
                  <p className="text-white/60">APY: {plan.apy}%</p>
                  <p className="text-white/40">Min: {plan.minStake} tokens</p>
                </div>
                <button
                  /* onClick={() => activatePlan(idx)} */
                  onClick={() => setStakeModalOpen(true)}
                  className={`px-4 py-2 rounded-md text-xs font-medium transition ${
                    activeStake?.planIndex === idx
                      ? "bg-white text-black"
                      : "bg-blue-500 hover:bg-blue-600 text-black"
                  }`}
                >
                  {activeStake?.planIndex === idx ? "Activated" : "Activate"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isStakeModalOpen && (
        <StakeFormModal
          onClose={() => setStakeModalOpen(false)}
          available={500546}
          defaultPlan="Flexible"
          defaultPeriod="7 Days"
          onStake={handleStake}
        />
      )}
    </div>
  );
};

export default DashStake;
