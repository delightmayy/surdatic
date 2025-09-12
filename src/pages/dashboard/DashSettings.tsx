import { useState } from "react";
import UpdateBioModal from "../../component/modal/UpdateBioModal";
import KYCModal from "../../component/modal/KYCModal";
import PinModal from "../../component/modal/PinModal";

const DashSettings = () => {
  const [showBiodata, setShowBiodata] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [showPin, setShowPin] = useState(false);

  return (
    <div className="min-h-screen text-white pt-4 pb-20 max-w-7xl mx-auto">
      {/* Header */}
      <div className="pb-4">
        <h1 className="text-base font-semibold">Settings</h1>
        <p className="text-xs text-white/60">
          Manage your profile, preferences, and security settings to personalize
          your Surdatics experience.
        </p>
      </div>
      <div className="flex flex-col gap-3 border rounded-b-2xl border-white/10 p-4 pb-8">
        {/* Profile Settings */}
        <section className="space-y-3">
          <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded text-sm">
            Profile Settings
          </h2>

          <div className="bg-black/5 border shadow-inner shadow-white/15 border-white/10 rounded-2xl p-4  flex justify-between items-center  transition">
            <div
              onClick={() => setShowBiodata(true)}
              className="space-y-3 cursor-pointer w-full "
            >
              <h4 className="text-sm font-semibold text-white">
                Update Biodata
              </h4>
              <p className="text-xs text-white/60">
                Complete/update your profile
              </p>
            </div>
          </div>
          <div className="bg-black/5 border shadow-inner shadow-white/15 border-white/10 rounded-2xl p-4  flex justify-between items-center  transition">
            <div
              onClick={() => setShowKYC(true)}
              className="space-y-3 cursor-pointer w-full"
            >
              <h4 className="text-sm font-semibold text-white">
                Verification Status
              </h4>
              <p className="text-xs text-white/60">Provide KYC information</p>
            </div>

            <p className="text-xs w-fit px-4 text-emerald-400 border border-emerald-500/30 rounded flex items-center gap-1 py-2">
              <span className="text-white/80">Status:</span> Verified
            </p>
          </div>
        </section>

        {/* Security and Privacy */}
        <section className="space-y-3 mt-6">
          <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded text-sm">
            Security and Privacy
          </h2>

          <div
            onClick={() => setShowPin(true)}
            className="bg-black/5 border shadow-inner shadow-white/15 border-white/10 rounded-2xl p-4 space-y-3 cursor-pointer  transition"
          >
            <h4 className="text-sm  font-semibold text-white">
              Transaction PIN
            </h4>
            <p className="text-xs text-white/60">
              Create/Reset transaction PIN
            </p>
          </div>
          <div className="bg-black/5 border shadow-inner shadow-white/15 border-white/10 rounded-2xl p-4 space-y-3  transition">
            <h4 className="text-sm font-semibold text-white">Password</h4>
            <p className="text-xs text-white/60">Update/Change your password</p>
          </div>
        </section>
      </div>

      {showBiodata && <UpdateBioModal onClose={() => setShowBiodata(false)} />}
      {showKYC && <KYCModal onClose={() => setShowKYC(false)} />}
      {showPin && <PinModal onClose={() => setShowPin(false)} mode="reset" />}
    </div>
  );
};

export default DashSettings;
