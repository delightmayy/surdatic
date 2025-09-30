import React, { useState } from "react";
import { FaEnvelope, FaEnvelopeOpen } from "react-icons/fa";
import { useAuth } from "../../api/useAuth";

interface Notification {
  id: number;
  title: string;
  message: string;
  created_at: string;
  updated_at: string;
  read: boolean;
  user: string;
}

interface NotificationModalProps {
  notifications: Notification[];
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
}) => {
  const { UserReadNotificationID } = useAuth();
  const [step, setStep] = useState<"list" | "detail">("list");
  const [selected, setSelected] = useState<Notification | null>(null);

  const handleSelect = (n: Notification) => {
    setSelected(n);
    setStep("detail");
    try {
      UserReadNotificationID(n.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center  justify-center z-50">
      <div className="bg-black/90 rounded-xl  border border-white/30 shadow-xl w-full max-w-lg p-8 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
          <h2 className="text-lg font-semibold">
            {step === "list" ? "Notifications" : selected?.title}
          </h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        {/* Step 1: List */}
        {step === "list" && (
          <div className="space-y-3 max-h-[60vh] overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-center text-white/50">No notifications</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleSelect(n)}
                  className="flex items-center justify-between bg-white/10 p-3 rounded-lg cursor-pointer hover:bg-white/10"
                >
                  <div className="flex items-center gap-4 gap-x-6">
                    {n.read ? (
                      <FaEnvelopeOpen size={26} className="text-green-400" />
                    ) : (
                      <FaEnvelope size={26} className="text-yellow-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-white/90">
                        {n.title}
                      </p>
                      <p className="text-xs text-white/60">{n.created_at}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Step 2: Detail */}
        {step === "detail" && selected && (
          <div className="space-y-4">
            <p className="text-sm text-white/70">{selected.created_at}</p>
            <p className="text-base shadow-white/25 bg-white/5 py-8 mb-6 leading-8 tracking-wider shadow p-4">
              {selected.message}
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setStep("list")}
                className="px-6 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
              >
                Back
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;
