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

/*   const handleCopy = () => {
    navigator.clipboard.writeText("abcd1234xyzSuperSecretKey");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }; */

  return (
    <div className="bg-black min-h-screen text-white py-10 px-4 lg:px-12 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 space-y-6">
          {/* API Key Management */}
          <section className="space-y-3">
            <h3 className="text-sm font-semibold">API Key Management</h3>
            <div className="bg-white/5 border border-white/10 rounded-md p-4 space-y-2">
              <p className="text-xs text-white/60">Current Key</p>
              <div className="flex justify-between items-center">
                <span className="font-mono tracking-wider text-sm">
                  ••••••••••••••••••
                </span>
                <div className="flex gap-2">
                  <button className="text-xs text-blue-400 hover:underline">
                    Revoke
                  </button>
                  <button className="text-xs text-blue-400 hover:underline">
                    Regenerate Key
                  </button>
                {/*   <button
                    onClick={handleCopy}
                    className="text-xs px-3 py-1 border border-white/20 bg-black/40 rounded-md text-blue-400 hover:text-blue-200"
                  >
                    {copied ? "Copied!" : "Copy Key"}
                  </button>*/}
                </div> 
              </div>
            </div>
          </section>

          {/* Integration APIs */}
          <section className=" flex flex-col gap-4">
            <p>Integration Categories</p>

            {intCategory.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-md p-4 space-y-1"
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
            <div className="bg-white/5 border border-white/10 rounded-md p-4 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-semibold text-white">Webhooks</h4>
                <p className="text-xs text-white/60">
                  Manage webhook endpoints and event subscriptions.
                </p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-xs text-black px-4 py-2 rounded-md">
                Add Webhook
              </button>
            </div>
          </section>

          {/* Sandbox Testing */}
          <section>
            <div className="bg-white/5 border border-white/10 rounded-md p-4 flex justify-between items-center">
              <div>
                <h4 className="text-sm font-semibold text-white">
                  Sandbox Testing
                </h4>
                <p className="text-xs text-white/60">
                  Use our interactive console to test API requests safely.
                </p>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-xs text-black px-4 py-2 rounded-md">
                Open API Console
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="w-full lg:w-[300px] space-y-6">
          {/* API Documentation */}
          <section>
            <h3 className="text-sm font-semibold mb-2">API Documentation</h3>
            <div className="space-y-2">
              {[
                "Authentication Guide",
                "Endpoints & Usage",
                "Error/Response Examples",
                "Error Codes & Handling",
              ].map((doc, i) => (
                <div
                  key={i}
                  className="bg-white/10 border border-white/10 rounded-md flex items-center justify-between px-3 py-2 text-xs text-white/80"
                >
                  {doc}
                  <button className="bg-blue-500 hover:bg-blue-600 text-black text-xs px-2 py-1 rounded-md">
                    Download
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Support & Resources */}
          <section>
            <h3 className="text-sm font-semibold mb-2">Support & Resources</h3>
            <div className="space-y-2">
              {[
                "Support & Resources",
                "API Changelog",
                "Developer Community",
                "Contact Support",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white/10 text-white/70 text-xs px-3 py-2 rounded-md border border-white/10"
                >
                  {item}
                </div>
              ))}
            </div>
          </section>

          {/* Usage Statistics */}
          <section>
            <h3 className="text-sm font-semibold mb-2">
              Usage Statistics & Rate Limits
            </h3>
            <div className="bg-white/5 border border-white/10 rounded-md p-4 space-y-3 text-xs text-white/70">
              <div>
                <p className="mb-1">API Calls This Month</p>
                <div className="bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-2 w-[85%]"></div>
                </div>
                <p className="mt-1">1,246 / 1,500 calls used — 85%</p>
              </div>
              <div>
                <p className="font-semibold">Rate Limits</p>
                <p>Limit: 10,000 calls/month | Remaining: 8,754</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashApi;
