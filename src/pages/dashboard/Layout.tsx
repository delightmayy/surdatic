// Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import { FiBell, FiSearch, FiMenu } from "react-icons/fi";
import AppSidebar from "../../component/dashboardUI/sidebar/AppSidebar";

export default function Layout() {
  const [toggled, setToggled] = React.useState(false);

  return (
    <div className="h-screen overflow-hidden bg-[#0b0c10] text-white flex">
      {/* Sidebar */}
      <AppSidebar toggled={toggled} setToggled={setToggled} />

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-[#0b0c10]/70 bg-[#0b0c10]/95 border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10"
                onClick={() => setToggled((t) => !t)}
              >
                <FiMenu />
              </button>
              <div className="hidden md:flex items-center gap-2 text-white/70 text-sm">
                <span className="font-medium">Dashboard</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden ssm:flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg">
                <FiSearch className="opacity-70" />
                <input
                  className="bg-transparent outline-none text-sm placeholder-white/50 w-40 md:w-64"
                  placeholder="Search surveys, topics..."
                />
              </div>
              <button className=" hidden relative w-9 h-9 llg:grid place-items-center rounded-lg bg-white/5 hover:bg-white/10">
                <FiBell />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-rose-500" />
              </button>
              <div className="flex items-center gap-3">
                <img
                  src="https://i.pravatar.cc/56?img=12"
                  alt="avatar"
                  className="w-9 h-9 rounded-full object-cover"
                />
                <div className="hidden sm:block">
                  <div className="text-sm font-medium">Alison Dye</div>
                  <div className="text-[11px] text-white/50">@alison.dev</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Render child pages */}
        <main className="max-w-7xl overflow-y-scroll h-screen mx-auto px-4 sm:px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
