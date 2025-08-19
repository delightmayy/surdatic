import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import titlebg from "../../../img/titlebg.png";
import { FaQuoteLeft } from "react-icons/fa6";
import partner1 from "../../../img/partner1.png";
import partner2 from "../../../img/partner2.png";
import partner3 from "../../../img/partner3.png";
import partner4 from "../../../img/partner4.png";
import partner5 from "../../../img/partner5.png";
import partner6 from "../../../img/partner6.png";

const TrustedPartners: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const logos = [partner1, partner2, partner3, partner4, partner5, partner6];

  return (
    <section className=" bg-gradient-to-b from-black/95 to-black text-white py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Title */}
        <div className="text-center flex flex-col lg:flex-row justify-center items-center">
          <h2
            className=" bg-black md:text-xl font-semibold py-2 px-6 rounded-full"
            style={{
              backgroundImage: `url(${titlebg})`,
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain", // optional, makes sure it fills the area
            }}
          >
            Trusted Partners
          </h2>
          <p className="text-xs font-normal mt-2 lg:hidden">
            Tested & Trusted by <span className="text-blue-400"> 20k+ </span>
            users
          </p>
        </div>

        {/* Stats Section */}

        <div className="flex flex-wrap justify-around px-4 gap-2 md:gap-6">
          <div className="  hidden bg-white/10 lg:flex justify-center items-center  md:text-sm mb-2 w-full gap-4 lg:w-auto pe-12 ps-4 rounded-br-2xl rounded-tr-2xl">
            <FaQuoteLeft size={30} className="text-blue-600 " />
            <div className="">
              <div className="text-sm ">Tested & Trusted</div>
              <div className="text-xs  text-gray-400 mt-1">by 20k+ users</div>
            </div>
          </div>
          <div className="basis-[calc(50%-0.75rem)] md:basis-auto gap-1 p-4 flex  flex-col justify-center items-center  text-center h-25">
            <div className="text-xs text-gray-400">Completed Surveys</div>
            <div className="text-sm font-semibold mt-1 p-2 text-center rounded-full bg-white/15">
              25+
            </div>
          </div>
          <div className="basis-[calc(50%-0.75rem)] md:basis-auto gap-1 p-4 flex  flex-col-reverse justify-center  items-center rounded-md shadow text-center">
            <div className="text-xs text-gray-400">Verified Respondents</div>
            <div className="text-sm font-semibold mt-1 p-2 text-center rounded-full bg-white/15">
              3.2K
            </div>
          </div>
          <div className="basis-[calc(50%-0.75rem)] md:basis-auto gap-1 p-4 flex  flex-col justify-center items-center  text-center h-25">
            <div className="text-xs text-gray-400">Data Partners Onboarded</div>
            <div className="text-sm font-semibold mt-1 p-2 text-center rounded-full bg-white/15">
              50+
            </div>
          </div>
          <div className="basis-[calc(50%-0.75rem)] md:basis-auto gap-1 p-4 flex  flex-col-reverse justify-center  items-center rounded-md shadow text-center">
            <div className="text-xs text-gray-400">
              Countries with Active Users
            </div>
            <div className="text-sm font-semibold mt-1 p-2 text-center rounded-full bg-white/15">
              12+
            </div>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="bg-white/5 rounded-md py-8 px-4 text-center">
          <p className="mb-6 text-gray-300 text-sm">
            The world’s best companies partner with us
          </p>
          <Slider {...settings}>
            {logos.map((partner, idx) => (
              <div key={idx} className="px-4">
                <img
                  src={partner}
                  alt={partner.toString()}
                  className="h-12 mx-auto object-contain opacity-80 hover:opacity-100 transition scale-90 md:scale-95 lg:scale-100"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TrustedPartners;
