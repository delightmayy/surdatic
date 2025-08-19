//import React from 'react'

import Footer from "../../component/mainUi/Footer";
import Header from "../../component/mainUi/Header";
import Roadmap from "../../component/mainUi/home/Roadmap";
import SurdaClaim from "../../component/mainUi/surda/SurdaClaim";
import SurdaHero from "../../component/mainUi/surda/SurdaHero";
import Tokenomics from "../../component/mainUi/surda/Tokenomics";

const MainSurda = () => {
  return (
    <div>
      <Header />
      <SurdaHero />
      <SurdaClaim />
      <Tokenomics />
      <Roadmap />
      <Footer show={false} />
    </div>
  );
};

export default MainSurda;
