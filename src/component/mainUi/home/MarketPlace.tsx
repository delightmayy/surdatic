import React, { useState } from "react";
import logo from "../../../img/minilogo.png";
import cardimg1 from "../../../img/card1img.png"; /* 
import cardimg2 from "../../../img/card2img.png"; */
import surdacoin from "../../../img/tokenicon.png";
import { FaClock } from "react-icons/fa6";

interface CardProps {
  frontImg: string;
  /* backImg: string; */
  title: string;
  date: string;
  reward: number;
}

const FlipCard: React.FC<CardProps> = ({
  frontImg,
  /* backImg, */
  title,
  date,
  reward,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer bg-white/5 shadow-inner shadow-white/30 rounded-xl overflow-hidden select-none
      flex flex-col flex-shrink-0 mx-auto w-4/5 sm:w-[240px] min-h-96"
    >
      <img
        src={frontImg}
        alt="card"
        className="object-cover w-full rounded-3xl transition-transform duration-500 p-2 h-52"
      />

      <div className="p-4 flex flex-col justify-between  text-white/50 flex-grow">
        <h3 className="  text-xs mb-1 flex gap-2 items-center">
          <FaClock size={14} /> {date}{" "}
        </h3>
        <p className=" font-semibold text-sm md:text-sm mb-4">{title}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1  font-semibold">
            <p className="font-light">Rewards:</p>
            <img src={surdacoin} alt="reward" className="w-5" />{" "}
            <span className="text-white/90"></span>
            {reward}
          </div>
          <button className="bg-blue-600 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-700 transition hover:scale-95 cursor-pointer">
            Buy Survey
          </button>
        </div>
      </div>
    </div>
  );
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
    // add more cards...
  ];

  const [activeIndex, setActiveIndex] = useState(0);

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

        {/* Right Section */}
        <div className="flex flex-1 flex-col justify-center lg:w-7/12">
          <div className="overflow-x-scroll flex gap-4 md:gap-0 md:py-5">
            {cardsData.map((card, idx) => (
              <div
                key={idx}
                className={`transition-opacity duration-500 min-w-80 ${
                  idx === activeIndex
                    ? "opacity-100"
                    : "opacity-40 pointer-events-none"
                }`}
              >
                <FlipCard {...card} />
              </div>
            ))}
          </div>

          {/* Indicator */}
          <div className="flex justify-center items-center w-full mt-6 gap-3">
            {cardsData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === activeIndex ? "bg-blue-500" : "bg-gray-700"
                }`}
                aria-label={`Select card ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Marketplace;
