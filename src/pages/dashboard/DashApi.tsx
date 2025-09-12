//import { useState } from "react";

const DashApi = () => {
  /*   const [copied, setCopied] = useState(false); */

  const intCategory = [
    {
      title: "Token Payments API",
      desc: "Accept SURDA tokens securely for any transaction.",
    },
    {
      title: "User Verification API",
      desc: "Validate users with KYC and identity checks.",
    },
    {
      title: "Survey Access API",
      desc: "Retrieve available surveys in real time.",
    },
    {
      title: "Survey Submission API",
      desc: "Submit collected survey data instantly.",
    },
  ];

  const apiDoc = [
    "Authentication Guide",
    "Endpoints & Usage",
    "Request/Response Examples",
    "Error Codes & Handling",
  ];
  const supportRes = [
    "API Changelog",
    "Developer Community",
    "Contact Support",
  ];

  /*   const handleCopy = () => {
    navigator.clipboard.writeText("abcd1234xyzSuperSecretKey");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }; */

  return (
    <div className=" min-h-screen text-white pt-4   pb-20  max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Left Column */}
        <div className="flex-1 space-y-6 lg:w-2/3 border rounded-b-2xl border-white/10 p-3 sm:p-4 pb-8 ">
          <div className="">
            <h1 className="text-base font-semibold">API Key Management</h1>
            <p className="text-xs text-white/60">
              Connect your systems to Surdatics with ease. Access secure APIs
              for payments, surveys, and more.
            </p>
          </div>{" "}
          {/* API Key Management */}
          <section className="space-y-3">
            <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-2 text-sm">
              API Key Management
            </h2>
            <p className="text-xs text-white/60 translate-y-1">Current Key</p>
            <div className="bg-white/5 border border-white/10 rounded-md p-2 ">
              <div className="flex justify-between items-center ">
                <span className="font-mono tracking-wider text-sm">
                  •••••••••
                </span>
                <div className="flex gap-2">
                  <button className="text-xs text-blue-400 cursor-pointer">
                    Revoke
                  </button>
                  <button className="text-xs p-1 px-2  rounded text-blue-400 bg-white/10 cursor-pointer ">
                    Regenerate Key
                  </button>
                </div>
              </div>
            </div>
          </section>
          {/* Integration APIs */}
          <section className=" flex flex-col gap-4">
            <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-2 text-sm">
              Integration Categories
            </h2>
            {intCategory.map((item, i) => (
              <div
                key={i}
                className="bg-black/5 border shadow-inner shadow-white/15 border-white/10 rounded-2xl p-4 space-y-1 hover:scale-95"
              >
                <h4 className="text-sm font-semibold text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-white/60">{item.desc}</p>
              </div>
            ))}
          </section>
          {/* Webhooks */}
          <section className="space-y-2">
            <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-2 text-sm">
              Webhooks
            </h2>
            <div className=" flex w-full items-center gap-2 sm:gap-3">
              <div className="bg-black/5 border shadow-inner shadow-white/15 border-white/10 rounded-2xl p-3 sm:p-4 space-y-1 sm:flex-3/4">
                <p className="text-xs text-white/60">
                  Manage webhook endpoints and event subscriptions.
                </p>
              </div>
              <button className="bg-blue-400 hover:bg-blue-500 text-xs text-black p-3 sm:p-4 rounded-2xl cursor-pointer sm:flex-1/4">
                Add Webhook
              </button>
            </div>
          </section>
          {/* Sandbox Testing */}
          <section>
            <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-2 text-sm">
              Sandbox Testing
            </h2>
            <div className="flex  w-full items-center gap-2 sm:gap-3">
              <div className="bg-black/5 border shadow-inner shadow-white/15 border-white/10 rounded-2xl p-3 space-y-1 sm:p-4 sm:flex-3/4">
                <p className="text-xs text-white/60">
                  Use our interactive console to test API requests safely.
                </p>
              </div>
              <button className="bg-blue-400 hover:bg-blue-500 text-xs text-black p-3 rounded-2xl cursor-pointer sm:p-4  sm:flex-1/4">
                Open API Console
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-1/3  sm:px-4 lg:px-1  space-y-6">
          <div className="">
            <h1 className="text-base font-semibold">API Documentation</h1>
            <p className="text-xs text-white/60">
              Have access to all API documentations on surda
            </p>
          </div>
          {/* API Documentation */}
          <section className=" border rounded-b-2xl border-white/10 p-2 sm:p-4 pb-8">
            <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-2 text-sm">
              API Documentation
            </h2>

            <div className="space-y-2">
              {apiDoc.map((doc, i) => (
                <div
                  key={i}
                  className="bg-black/5 border shadow-inner shadow-white/15 border-white/10 rounded-2xl p-3 space-y-1 flex items-center gap-1 justify-between px-3 py-2 text-xs text-white/80"
                >
                  {doc}
                  <button className="bg-blue-400 hover:bg-blue-500 text-black text-xs px-2 py-1 rounded-md cursor-pointer">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Support & Resources */}
          <section className=" border rounded-b-2xl border-white/10 p-2 sm:p-4 pb-8">
            <div className="pb-4">
              <h1 className="text-base font-semibold">Support & Resources</h1>
              <p className="text-xs text-white/60">
                Find guides, updates, and expert help for Surdatics.
              </p>
            </div>
            <h2 className="w-fit px-2 py-1 text-white/60 bg-white/10 capitalize rounded mb-2 text-sm">
              Support & Resources
            </h2>

            <div className="space-y-2">
              {supportRes.map((item, i) => (
                <div
                  key={i}
                  className=" bg-black/5 border shadow-inner shadow-white/15 border-white/10 rounded-2xl p-3 space-y-1 text-white/70 text-xs hover:scale-95  "
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Usage Statistics */}
          <section className=" border text-center rounded-b-2xl border-white/10 p-2 px-6 sm:p-4 pb-8">
            <h3 className="text-sm font-semibold mb-2">
              Usage Statistics & Rate Limits
            </h3>
            <div className=" text-xs space-y-3 text-white/70">
              <div className="">
                <p className="mb-1 text-white/90">API Calls This Month</p>
                <div className="bg-white/2 border border-white/10 rounded-md p-4 space-y-3 ">
                  <p className="mt-1">1,246 / 1,500 calls used — 85%</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-1 text-white/90 ">Rate Limits</p>
               
                <div className="bg-white/2 border border-white/10 rounded-md p-4 space-y-3 ">
                   <p>Limit: 10,000 calls/month | Remaining: 8,754</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashApi;
