// Sidebar.tsx
import React from "react";
import { Sidebar, Menu, MenuItem, sidebarClasses } from "react-pro-sidebar";
/* import { Link } from "react-router-dom"; */
import logo from "../../../img/logo.png";
import sidebarimg from "../../../img/sidebarimg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  FiHome,
  FiCreditCard,
  FiRepeat,
  FiFileText,
  FiShoppingCart,
  FiSmartphone,
  FiBarChart2,
  FiUsers,
  FiPieChart,
  FiCode,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { motion } from "framer-motion";

interface SidebarProps {
  toggled: boolean;
  setToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppSidebar: React.FC<SidebarProps> = ({ toggled, setToggled }) => {
  const location = useLocation();
  const navigate = useNavigate();


  return (
    <Sidebar
      image={sidebarimg}
      breakPoint="md"
      toggled={toggled}
      onBackdropClick={() => setToggled(false)}
      /* className="bg-[#0f1115]" */
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          /* backgroundColor: "#0f1115", */
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
        },
      }}
    >
      {/* Logo / Header */}
      <div className="px-4 py-5 border-b border-white/10 flex items-center gap-3">
        <motion.div
          className="flex-shrink-0 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          onClick={()=>navigate("/")}
        >
          <img src={logo} alt="Logo" className="w-22" />
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        <Menu
          menuItemStyles={{
            button: ({ active }: { active?: boolean }) => ({
              padding: "6px 10px",
              fontSize: "13px",
              borderRadius: "6px",
              margin: "4px 6px",
              color: active ? "#000" : "#fff",
              backgroundColor: active
                ? "rgba(59,130,246,0.9)"
                : "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(59,130,246,0.4)",
                color: "#000",
              },
            }),
            icon: {
              fontSize: "14px",
            },
          }}
        >
          <MenuItem icon={<FiHome />} component={<Link to="/dashboard" />}
           active={
              location.pathname === ("/dashboard")
            }>
            Home
          </MenuItem>
          <MenuItem
            icon={<FiCreditCard />}
            component={<Link to="/dashboard/wallet" />}
            active={location.pathname.startsWith("/dashboard/wallet")}
          >
            Wallet
          </MenuItem>
          <MenuItem
            icon={<FiRepeat />}
            component={<Link to="/dashboard/p2pmarket" />}
            active={location.pathname.startsWith("/dashboard/p2pmarket")}
          >
            P2P Marketplace
          </MenuItem>
          <MenuItem
            icon={<FiFileText />}
            component={<Link to="/dashboard/surveys" />}
              active={location.pathname.startsWith("/dashboard/survey")||location.pathname.startsWith("/dashboard/questionaire")} 
          >
            Surveys
          </MenuItem>
          <MenuItem
            icon={<FiShoppingCart />}
            component={<Link to="/dashboard/market" />}
            active={location.pathname.startsWith("/dashboard/market")}
          >
            Marketplace
          </MenuItem>
          <MenuItem
            icon={<FiSmartphone />}
            component={<Link to="/dashboard/airtime" />}
            active={location.pathname.startsWith("/dashboard/airtime")}
          >
            Airtime & Data
          </MenuItem>
          <MenuItem
            icon={<FiBarChart2 />}
            component={<Link to="/dashboard/stake" />}
            active={location.pathname.startsWith("/dashboard/stake")}
          >
            Stake
          </MenuItem>
          <MenuItem
            icon={<FiUsers />}
            component={<Link to="/dashboard/earn" />}
            active={location.pathname.startsWith("/dashboard/earn")}
          >
            Refer and Earn
          </MenuItem>
          <MenuItem
            icon={<FiPieChart />}
            component={<Link to="/dashboard/tokenomics" />}
            active={location.pathname.startsWith("/dashboard/tokenomics")}
          >
            Tokenomics
          </MenuItem>
          <MenuItem
            icon={<FiCode />}
            component={<Link to="/dashboard/api" />}
            active={location.pathname.startsWith("/dashboard/api")}
          >
            API & Integrations
          </MenuItem>
        </Menu>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-2 py-3">
        <Menu
          menuItemStyles={{
            button: ({ active }: { active?: boolean }) => ({
              padding: "6px 10px",
              fontSize: "13px",
              borderRadius: "6px",
              margin: "4px 6px",
              color: active ? "#000" : "#fff",
              backgroundColor: active
                ? "rgba(59,130,246,0.9)"
                : "rgba(0,0,0,0.4)",
              border: "1px solid rgba(255,255,255,0.2)",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                backgroundColor: "rgba(59,130,246,0.9)",
                color: "#000",
              },
            }),
            icon: {
              fontSize: "14px",
            },
          }}
        >
          <MenuItem
            icon={<FiSettings />}
            active={location.pathname.startsWith("/dashboard/settings")}
            component={<Link to="/dashboard/settings" />}
          >
            Settings
          </MenuItem>

          <MenuItem icon={<FiLogOut />} /* component={<Link to="/logout" />} */>
            Log Out
          </MenuItem>
        </Menu>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;
