import React from "react";
import logo from "../../../img/minilogo.png";
import cardimg1 from "../../../img/card1img.png";
/* import cardimg2 from "../../../img/card2img.png";  */
import surdacoin from "../../../img/tokenicon.png";
import { FaClock } from "react-icons/fa6";
import Slider from "react-slick";
import { motion } from "framer-motion";

interface CardProps {
  frontImg: string;
  /* backImg: string; */
  title: string;
  date: string;
  reward: number;
}

const containerFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Marketplace: React.FC = () => {
  const cardsData: CardProps[] = [
    {
      frontImg: cardimg1,
      /* backImg: cardimg2, */
      title:
        "ExaminingSafety Compliance rate among senior managers in corporate organisations in Nigeria ",
      date: "58D 17H 03M",
      reward: 50,
    },
    {
      frontImg: cardimg1,
      /* backImg: cardimg2, */
      title:
        "Examining Safety Compliance rate among senior managers in corporate organisations in Nigeria",
      date: "58D 17H 03M",
      reward: 75,
    },
    {
      frontImg: cardimg1,
      /* backImg: cardimg2, */
      title:
        "Examining Safety Compliance rate among senior managers in corporate organisations in Nigeria",
      date: "58D 17H 03M",
      reward: 75,
    },
    {
      frontImg: cardimg1,
      /* backImg: cardimg2, */
      title:
        "ExaminingSafety Compliance rate among senior managers in corporate organisations in Nigeria ",
      date: "58D 17H 03M",
      reward: 50,
    },
    {
      frontImg: cardimg1,
      /* backImg: cardimg2, */
      title:
        "Examining Safety Compliance rate among senior managers in corporate organisations in Nigeria",
      date: "58D 17H 03M",
      reward: 75,
    },
    {
      frontImg: cardimg1,
      /* backImg: cardimg2, */
      title:
        "Examining Safety Compliance rate among senior managers in corporate organisations in Nigeria",
      date: "58D 17H 03M",
      reward: 75,
    },
    // add more cards...
  ];

  return (
    <section className="bg-black px-6 py-8 md:py-16">
      <div className="flex flex-col items-center">
        <h2 className="text-center md:text-left text-white font-semibold md:text-2xl mb-1">
          SURDATICS Marketplace
        </h2>
        <p className="text-center md:text-left text-gray-400 text-xs md:text-sm mb-8">
          Buy, and List, NFT-Backed Data
        </p>
      </div>

      <div className="text-white max-w-7xl mt-4 md:mt-6 mx-auto flex flex-col lg:flex-row gap-12 md:gap-8 px-4">
        {/* Left Section */}
        <div className="flex flex-col justify-center flex-1 max-w-md mx-auto lg:mx-4 lg:w-5/12">
          <div className="bg-gradient-to-bl from-black via-black/90 to-fuchsia-950/70 rounded-2xl p-6 text-center lg:text-start border border-white/20">
            <div className="flex flex-col items-center lg:items-start mb-4">
              <div className="p-2 mt-2">
                <img src={logo} alt="logo" className="w-8" />
              </div>
              <h3 className="font-semibold text-white">
                SURDATICS Marketplace
              </h3>
            </div>
            <p className="text-gray-400 mb-4 text-sm">
              Explore the SURDATICS Marketplace: Buy, and List, NFT-Backed Data
            </p>
            <ul className="text-gray-400 text-xs md:text-sm mb-6 list-disc list-inside space-y-1">
              <li>Buy real-world insights</li>
              <li>Sell verified responses</li>
              <li>Peer-to-peer data exchange</li>
              <li>Earn free $surda token</li>
            </ul>
            <button className="bg-blue-500 hover:bg-blue-800 text-white px-5 py-2 rounded-md w-full md:w-auto transition text-sm">
              Explore Marketplace
            </button>
          </div>
        </div>

        {/* Available surveys + Carousel for mobile */}
        <motion.section
          variants={containerFade}
          initial="hidden"
          animate="visible"
          className="flex  md:hidden flex-1 flex-col justify-center lg:w-7/12"
        >
          <div className="mt-4 overflow-hidden">
            <Slider
              dots
              arrows={false}
              infinite
              autoplay
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1440, settings: { slidesToShow: 3 } },
                { breakpoint: 1280, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } },
              ]}
            >
              {cardsData.map((s, idx) => (
                <div key={idx} className="px-2">
                  <div className="cursor-pointer bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col mx-auto  sm:w-[240px] min-h-96">
                    <img
                      src={s.frontImg}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />
                    <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                      <h3 className="text-xs mb-1 flex gap-2 items-center">
                        <FaClock size={14} /> {s.date}
                      </h3>
                      <p className="font-semibold text-sm mb-4">{s.title}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center flex-wrap gap-1 font-semibold">
                          <p className="font-light">Rewards:</p>
                          <img src={surdacoin} alt="reward" className="w-5" />
                          {s.reward}
                        </div>
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 ">
                          Buy Survey
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.section>

        {/* Available surveys + Carousel for medium */}
        <motion.section
          variants={containerFade}
          initial="hidden"
          animate="visible"
          className="md:flex xl:hidden hidden flex-1 flex-col justify-center lg:w-7/12"
        >
          <div className="mt-4 overflow-hidden">
            <Slider
              dots
              arrows={false}
              infinite
              autoplay
              speed={500}
              slidesToShow={2}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1440, settings: { slidesToShow: 3 } },
                { breakpoint: 1280, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } },
              ]}
            >
              {cardsData.map((s, idx) => (
                <div key={idx} className="px-2 ">
                  <div className="cursor-pointer bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col mx-auto  sm:w-[240px] min-h-96">
                    <img
                      src={s.frontImg}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />
                    <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                      <h3 className="text-xs mb-1 flex gap-2 items-center">
                        <FaClock size={14} /> {s.date}
                      </h3>
                      <p className="font-semibold text-sm mb-4">{s.title}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center flex-wrap gap-1 font-semibold">
                          <p className="font-light">Rewards:</p>
                          <img src={surdacoin} alt="reward" className="w-5" />
                          {s.reward}
                        </div>
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 ">
                          Buy Survey
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.section>
        <motion.section
          variants={containerFade}
          initial="hidden"
          animate="visible"
          className="xl:flex hidden flex-1 flex-col justify-center lg:w-7/12"
        >
          <div className="mt-4 overflow-hidden">
            <Slider
              dots
              arrows={false}
              infinite
              autoplay
              speed={500}
              slidesToShow={3}
              slidesToScroll={1}
              responsive={[
                { breakpoint: 1440, settings: { slidesToShow: 3 } },
                { breakpoint: 1280, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } },
              ]}
            >
              {cardsData.map((s, idx) => (
                <div key={idx} className="px-2 mx-3">
                  <div className="cursor-pointer bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none flex flex-col mx-auto  sm:w-[240px] min-h-96">
                    <img
                      src={s.frontImg}
                      alt="card"
                      className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
                    />
                    <div className="p-4 flex flex-col justify-between text-white/50 flex-grow">
                      <h3 className="text-xs mb-1 flex gap-2 items-center">
                        <FaClock size={14} /> {s.date}
                      </h3>
                      <p className="font-semibold text-sm mb-4">{s.title}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center flex-wrap gap-1 font-semibold">
                          <p className="font-light">Rewards:</p>
                          <img src={surdacoin} alt="reward" className="w-5" />
                          {s.reward}
                        </div>
                        <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 ">
                          Buy Survey
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </motion.section>
      </div>
    </section>
  );
};

export default Marketplace;
