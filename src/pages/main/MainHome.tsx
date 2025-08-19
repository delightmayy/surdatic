//import React from 'react'

import Footer from "../../component/mainUi/Footer";
import Header from "../../component/mainUi/Header";
import BlogArticle from "../../component/mainUi/home/BlogArticle";
import Company from "../../component/mainUi/home/Company";
import FAQ from "../../component/mainUi/home/FAQ";
import Harness from "../../component/mainUi/home/Harness";
import HomeHero from "../../component/mainUi/home/HomeHero";
import MarketPlace from "../../component/mainUi/home/MarketPlace";
import Partner from "../../component/mainUi/home/Partner";
import RealValue from "../../component/mainUi/home/RealValue";
import Roadmap from "../../component/mainUi/home/Roadmap";
import Solution from "../../component/mainUi/home/Solution";

const MainHome = () => {
  return (
    <div>
      <Header />
      <HomeHero />
      <Partner />
      <Company />
      <Solution />
      <Harness />
      <RealValue />
      <MarketPlace />
      <Roadmap />
      <BlogArticle />
      <FAQ />
      <Footer show={true} />
    </div>
  );
};

export default MainHome;
