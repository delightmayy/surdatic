import React from "react";
import "./App.css";
import  AppRoutes  from "./routes/AppRoutes";
/* import MainHome from "./pages/main/MainHome";
import MainSurvey from "./pages/main/MainSurvey";
import MainMarketPlace from "./pages/main/MainMarketPlace";
import MainSurda from "./pages/main/MainSurda";
import MainContact from "./pages/main/MainContact"; */

const App: React.FC = () => {
  return (
    <div className="">
      {/* <MainHome />
      <MainSurvey />
      <MainMarketPlace />
      <MainSurda />
      <MainContact /> */}
      <AppRoutes />
     {/*  <AuthRoutes /> */}
    </div>
  );
};

export default App;
