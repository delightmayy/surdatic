import React, { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { DataProvider } from "./context/DataContext";
import { AuthProvider } from "./context/AuthContext";
import { CookiesProvider } from "react-cookie";
import { FaSpinner } from "react-icons/fa";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <FaSpinner size={50} className="animate-spin text-white/30 " />
      </div>
    );
  }

  return (
    <div className="bg-black">
      <CookiesProvider>
        <AuthProvider>
          <DataProvider>
            <AppRoutes />
          </DataProvider>
        </AuthProvider>
      </CookiesProvider>
    </div>
  );
};

export default App;
