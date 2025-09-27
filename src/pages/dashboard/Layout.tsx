// Layout.tsx
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { FiBell, FiSearch, FiMenu } from "react-icons/fi";
import AppSidebar from "../../component/dashboardUI/sidebar/AppSidebar";
import ErrorModal from "../../component/modal/ErrorModal";
import { useAuth } from "../../api/useAuth";
import { type Notification } from "../../context/AuthContext";

export default function Layout() {
  const { user, notifyUser } = useAuth();
  const [toggled, setToggled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notifyModal, setNotifityModal] = useState(false);
  const [notification, setNotification] = useState<Notification[] | []>([]);

  useEffect(() => {
    const handleNotifyMessage = async () => {
      setLoading(true);
      try {
        const response = await notifyUser();
        if (response.data) {
          setNotification(response.data);
          /* console.log("check", response.data); */
        }
      } catch (err: any) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    handleNotifyMessage();

    const interval = setInterval(handleNotifyMessage, 30000);

    return () => clearInterval(interval);
  }, []);

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
                <div
                  /*  src="https://i.pravatar.cc/56?img=12"
                  alt="avatar" */
                  className="w-9 h-9 relative rounded-full flex justify-center text-xl text-center items-center bg-white/15 object-cover"
                >
                  {user?.last_name.charAt(0).toUpperCase()}
                  {notification.length > 0 && (
                    <p
                      onClick={() => setNotifityModal(true)}
                      className={`w-2 h-2 rounded-full cursor-pointer absolute bottom-0.5 right-0 ${
                        loading ? "bg-yellow-500/70" : "bg-green-500/70"
                      }`}
                    ></p>
                  )}
                </div>
                <div className="hidden sm:block">
                  {user === null ? (
                    <div className="text-sm font-light italic text-white/90 capitalize">
                      loading... {/* {profile?.first_name} */}
                    </div>
                  ) : (
                    <div className="text-sm font-light text-white/90 capitalize">
                      {user?.last_name} {/* {profile?.first_name} */}
                    </div>
                  )}

                  {user === null ? (
                    <div className="text-[11px] italic text-white/50">
                      loading user mail...
                    </div>
                  ) : (
                    <div className="text-[11px] text-white/50">
                      {user?.email}
                    </div>
                  )}
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
      {notifyModal && (
        <ErrorModal
          onClose={() => setNotifityModal(false)}
          message=" fake check"
        />
      )}
    </div>
  );
}
