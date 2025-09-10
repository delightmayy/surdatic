import { motion } from "framer-motion";
import titlebg from "../../../img/titlebg.png";
/* import bg from "../../../img/bg3.png"; */
import tokenomics from "../../../img/tokenomics.png";

const Tokenomics = () => {
  return (
    <section
      className="bg-black text-white px-6 pb-8 pt-8 md:px-16 md:pb-16 relative"
      
    >
      <div className="absolute top-10 left-10 bg-cyan-300/70 p-12  md:p-20 blur-[100px]"></div>
      <div className="absolute hidden md:block bottom-10 right-10 bg-green-800/40 p-30 blur-[100px]"></div>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className=" flex flex-col-reverse gap-5 md:flex-row max-w-6xl mx-auto mb-6"
        >
          <div className="text-center md:text-start md:flex-1 space-y-2 flex flex-col items-center md:items-start max-w-sm mx-auto  md:justify-start lg:mx-2">
             <p className="text-xs  p-1 px-4  rounded-full capitalize tracking-widest border border-white/15">
                Surda<span className="text-[#00DCFF]"> Tokenomics</span>
              </p>
            <h2 className=" hidden md:block md:text-2xl max-w-sm  font-bold">
              Understanding SURDA Tokenomics:
            </h2>
            <p className="max-w-sm mx-auto md:mx-0 text-gray-300  text-xs leading-relaxed   ">
              Understanding SURDA Tokenomics: Distribution and Future Plans
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
              SURDA Tokenomics
            </h2>
          </div>
        </motion.div>

        {/* Roadmap Items */}
        <div className=" flex w-full max-w-5xl pt-6 mx-auto">
          <img src={tokenomics} alt="tokenomics" className="flex-1" />
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
