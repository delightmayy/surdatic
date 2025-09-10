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

export const AppRoutes = () => {
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

      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<DashboardHome />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="marketplace" element={<PTPMarket />} />

        <Route path="surveys" element={<DashSurvey />} />
        <Route path="surveys/:id" element={<FormSurveyDetail/>}/>
        <Route path="videos/:id" element={<VideoSurveyDetail/>}/>
        <Route path="questionaire" element={<SurveyQuestionPage/>}/>

        <Route path="market" element={<DashMarket />} />
        <Route path="airtime" element={<DashData />} />
        <Route path="stake" element={<DashStake />} />
        <Route path="earn" element={<DashEarn />} />
        <Route path="tokenomics" element={<Dashtokenomics />} />
        <Route path="api" element={<DashApi />} />
        <Route path="settings" element={<DashSettings />} />
      </Route>
     
    </Routes>
  );
};
export default AppRoutes;
