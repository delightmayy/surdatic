/* import bg from "../../../img/bg3.png"; */
import star from "../../img/roadmapstar.png";
import line from "../../img/roadmapline.png";
import tokenomics from "../../img/tokenomics.png";

const Dashtokenomics = () => {
  const roadmapItems = [
    {
      id: "01.",
      quarter: "Q1 - Q2 (2024)",
      points: [
        "Surdactics token development",
        "Project MVP Testnet Launch",
        "Smart contract audit, release (KAD) forensics",
        "Strategic partnerships announcements",
        "Project cross promotional partnerships",
      ],
    },
    { id: "02.", quarter: "Q3 (2024)", points: [] },
    { id: "03.", quarter: "Q4 (2024)", points: [] },
    { id: "04.", quarter: "Q5-Q6 (2025)", points: [] },
    { id: "05.", quarter: "Q6 (2025)", points: [] },
  ];

  return (
    <main className=" space-y-4">
      <div className="p-4">
        <h1 className="text-base font-semibold">Tokenomics</h1>
        <p className="text-xs text-white/60">
          Track SURDA's supply, distribution, and burn metrics in real time,
          ensuring full transparency and trust in our ecosystem.
        </p>
      </div>
      <section className="bg-black border border-white/15 text-white px-6 pb-8 pt-8 md:px-16 md:pb-16 relative">
        <div className="absolute bottom-10 left-10 bg-cyan-300/70 p-12  md:p-20 blur-[100px]"></div>
        <div className="absolute hidden md:block top-10 right-10 bg-green-800/40 p-30 blur-[100px]"></div>
        <div className="text-xs max-w-fit  text-white/90  p-2 mt-2 bg-white/10 rounded">
          Surda Tokenomics
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Header */}

          {/* Roadmap Items */}
          <div className=" flex w-full max-w-5xl pt-6 mx-auto">
            <img src={tokenomics} alt="tokenomics" className="flex-1" />
          </div>
        </div>
      </section>

      <section className="bg-black border-white/20 text-white px-6 pb-8 pt-8 md:px-16 md:pb-16 relative">
        <div className="absolute bottom-15 left-10 bg-cyan-300/70 p-14 blur-[100px]"></div>
        <div className="absolute bottom-10 right-10 hidden sm:block bg-blue-500/40 p-30 blur-[100px]"></div>
         <div className="text-xs max-w-fit  text-white/90  p-2 mt-2 bg-white/10 rounded">
          Surda Roadmap
        </div>
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center ">
            <img
              src={line}
              alt="roadmap"
              className=" w-8 h-8 rotate-80 translate-y-6"
            />
          </div>
          {/* Roadmap Items */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0 max-w-5xl pt-10 mx-auto">
            {roadmapItems.map(({ id, quarter, points }, idx) => (
              <div
                key={id}
                className={`flex-1 bg-white/5 rounded-lg hover:scale-95  flex flex-col lg:pb-16 ${
                  idx === 0
                    ? "text-white p-6 md:w-80 lg:min-w-2/5 "
                    : "text-white/40 px-2 pt-3 "
                }`}
              >
                <div className="mb-4 flex flex-col justify-center items-center md:justify-start">
                  <p
                    className={`font-bold text-white  ${
                      idx === 0 ? "text-4xl" : "text-md"
                    }`}
                  >
                    {id}
                  </p>
                  <p
                    className={`text-sm font-semibold text-white/40 text-nowrap ${
                      idx > 0 ? "md:rotate-90 md:translate-y-20" : ""
                    }  `}
                  >
                    {quarter}
                  </p>
                </div>
                {points.length > 0 ? (
                  <ul className="list-disc  text-white/40 list-inside space-y-2 text-xs">
                    {points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="opacity-30 italic text-xs">{""}</p>
                )}
              </div>
            ))}
          </div>
          <div className=" hidden lg:flex w-full max-w-5xl pt-6 mx-auto">
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-between ">
              <img src={line} alt="roadmap" className=" w-10 h-10 rotate-80" />

              <img src={star} alt="roadmap" className="w-10 h-10 " />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashtokenomics;
