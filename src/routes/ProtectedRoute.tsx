import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../api/useAuth";

const ProtectedRoute: React.FC = () => {
 
   const { isAuthenticated } = useAuth();

  if (isAuthenticated != true) {
    return <Navigate to={"/login"} replace />;
  }


  // Render children (nested routes inside dashboard)
  return <Outlet />;
};

export default ProtectedRoute;

