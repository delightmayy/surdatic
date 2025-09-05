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

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainHome />} />
      <Route path="/contact" element={<MainContact />} />
      <Route path="/marketplace" element={<MainMarketPlace />} />
      <Route path="/surda" element={<MainSurda />} />
      <Route path="/survey" element={<MainSurvey />} />
      {/* <Route path="/dashboard" element={<Layout />} /> */}
       <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-success" element={<ResetSuccess />} />
       <Route path="/dashboard" element={<Layout />}>
          <Route index element={<DashboardHome />} />
          {/* <Route path="profile" element={<Profile />} /> */}
          {/* add more pages here */}
        </Route>
    </Routes>
  );
};
export default AppRoutes


