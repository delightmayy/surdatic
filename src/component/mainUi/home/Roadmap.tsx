import { motion } from "framer-motion";
import titlebg from "../../../img/titlebg.png";
/* import bg from "../../../img/bg3.png"; */
import star from "../../../img/roadmapstar.png";
import line from "../../../img/roadmapline.png";

const Roadmap = () => {
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
    <section
      className="bg-black text-white px-6 pb-8 pt-8 md:px-16 md:pb-16 relative"
      /*   style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }} */
    >
      <div className="absolute top-10 left-10 bg-cyan-300/70 p-20 blur-[100px]"></div>
      <div className="absolute bottom-10 right-10 bg-blue-500/40 p-30 blur-[100px]"></div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" flex flex-col-reverse gap-5 md:flex-row max-w-6xl mx-auto mb-6"
        >
          <div className="text-center md:text-start md:flex-1 space-y-2 flex flex-col items-center md:items-start max-w-sm mx-auto  md:justify-start lg:mx-2">
            <h2 className=" hidden md:block md:text-2xl max-w-sm  font-bold">
              Surdactics Roadmap
            </h2>
            <p className="max-w-sm mx-auto md:mx-0 text-gray-300  text-xs leading-relaxed   ">
              See what we are building and follow us as we reach our goal
            </p>
          </div>{" "}
          <div className="text-center md:flex-1 flex flex-col md:flex-row justify-center items-center md:justify-end ">
            <h2
              className="  md:text-xl font-semibold py-2 px-6 rounded-full"
              style={{
                backgroundImage: `url(${titlebg})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
              }}
            >
              Surdactics Roadmap
            </h2>
          </div>
        </motion.div>
        <div className="flex justify-center items-center ">
          <img
            src={line}
            alt="roadmap"
            className=" w-8 h-8 rotate-80 translate-y-6"
          />
        </div>
        {/* Roadmap Items */}
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 max-w-5xl pt-10 mx-auto">
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
  );
};

export default Roadmap;
