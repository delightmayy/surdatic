//import React from 'react'

import Footer from "../../component/mainUi/Footer";
import Header from "../../component/mainUi/Header";
import FAQ from "../../component/mainUi/home/FAQ";
import MarketPlaceHero from "../../component/mainUi/marketplace/MarketPlaceHero";
import SurveyCollection from "../../component/mainUi/marketplace/SurveyCollection";

const MainMarketPlace = () => {
  return (
    <div>
      <Header />
      <MarketPlaceHero />
      <SurveyCollection />
      <FAQ />
      <Footer show={true} />
    </div>
  );
};

export default MainMarketPlace;
