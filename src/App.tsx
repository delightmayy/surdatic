import React from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { DataProvider } from "./context/DataContext";

const App: React.FC = () => {
  return (
    <div className="">
      <DataProvider>
        <AppRoutes />
      </DataProvider>
      {/*  <AuthRoutes /> */}
    </div>
  );
};

export default App;
