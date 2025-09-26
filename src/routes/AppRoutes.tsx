import { Route, Routes } from "react-router-dom";
import MainHome from "../pages/main/MainHome";
import MainContact from "../pages/main/MainContact";
import MainMarketPlace from "../pages/main/MainMarketPlace";
import MainSurda from "../pages/main/MainSurda";
import MainSurvey from "../pages/main/MainSurvey";
import Register from "../component/onboading/Register";
import Login from "../component/onboading/Login";
import ForgotPassword from "../component/onboading/ForgetPassword";
import ResetPassword from "../component/onboading/ResetPassword";
import ResetSuccess from "../component/onboading/ResetSuccess";
import DashboardHome from "../pages/dashboard/DashHome";
import Layout from "../pages/dashboard/Layout";
import Wallet from "../pages/dashboard/Wallet";
import PTPMarket from "../pages/dashboard/PTPMarket";
import DashSurvey from "../pages/dashboard/DashSurvey";
import DashMarket from "../pages/dashboard/DashMarket";
import DashData from "../pages/dashboard/DashData";
import DashStake from "../pages/dashboard/DashStake";
import DashEarn from "../pages/dashboard/DashEarn";
import Dashtokenomics from "../pages/dashboard/Dashtokenomics";
import DashApi from "../pages/dashboard/DashApi";
import DashSettings from "../pages/dashboard/DashSettings";
import FormSurveyDetail from "../component/dashboardUI/survey/FormSurvey";
import SurveyQuestionPage from "../component/dashboardUI/survey/SurveyQuestionPage";
import VideoSurveyDetail from "../component/dashboardUI/survey/VideoSurvey";
import ErrorPage from "../pages/dashboard/ErrorPage";
import MarketPlaceDetails from "../component/dashboardUI/marketplace/MarketPlaceDetails";
import P2POrderPage from "../component/dashboardUI/p2p/P2POrderPage";
import SurveyHistoryPage from "../component/dashboardUI/survey/SurveyHistoryPage";
import SurveyAnalysisPage from "../component/dashboardUI/survey/SurveyAnalysisPage";
import VideoSurveyCallPage from "../component/dashboardUI/survey/VideoSurveyCallPage";
import ProtectedRoute from "./ProtectedRoute";
/* import { useState } from "react"; */

export const AppRoutes = () => {
   /* const isAuthenticated = false */
   
   /* destructure save login check from login page save in localStorage or cookies for is isAuthenticated */
  

  return (
    <Routes>
      <Route path="/" element={<MainHome />} />
      <Route path="/contact" element={<MainContact />} />
      <Route path="/marketplace" element={<MainMarketPlace />} />
      <Route path="/surda" element={<MainSurda />} />
      <Route path="/survey" element={<MainSurvey />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-success" element={<ResetSuccess />} />

      <Route element={<ProtectedRoute   />}> 
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="p2pmarket" element={<PTPMarket />} />
          <Route path="p2p-order" element={<P2POrderPage />} />

          <Route path="surveys" element={<DashSurvey />} />
          <Route path="surveys/:id" element={<FormSurveyDetail />} />
          <Route path="videos/:id" element={<VideoSurveyDetail />} />
          <Route path="questionaire" element={<SurveyQuestionPage />} />
          <Route path="history" element={<SurveyHistoryPage />} />
          <Route path="analysis/:id" element={<SurveyAnalysisPage />} />
          <Route path="videocall" element={<VideoSurveyCallPage />} />

          <Route path="market" element={<DashMarket />} />
          <Route path="markets/:id" element={<MarketPlaceDetails />} />
          <Route path="airtime" element={<DashData />} />
          <Route path="stake" element={<DashStake />} />
          <Route path="earn" element={<DashEarn />} />
          <Route path="tokenomics" element={<Dashtokenomics />} />
          <Route path="api" element={<DashApi />} />
          <Route path="settings" element={<DashSettings />} />

          <Route path="*" element={<ErrorPage />} />
        </Route>
       </Route> 

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};
export default AppRoutes;
