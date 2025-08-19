//import React from 'react'

import Footer from "../../component/mainUi/Footer";
import Header from "../../component/mainUi/Header";
import RealValue from "../../component/mainUi/home/RealValue";
import Researcher from "../../component/mainUi/survey/Reseacher";
import SurveyHero from "../../component/mainUi/survey/surveyHero";
import SurveyWorks from "../../component/mainUi/survey/SurveyWorks";
import Validator from "../../component/mainUi/survey/validator";

const MainSurvey = () => {
  return (
    <div>
      <Header />
      <SurveyHero />
      <SurveyWorks/>
      <Researcher/>
      <Validator/>
      <RealValue />
      <Footer show={false} />
    </div>
  );
};

export default MainSurvey;
