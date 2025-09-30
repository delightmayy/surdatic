import React, { useState } from "react";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import VeiwHistoryModal from "../../modal/VeiwHistoryModal";

export interface History {
  id: string;
  address: string;
  amount: string;
  created_at: string;
  updated_at?: string;
  purpose: string;
  status: string;
  fee?: string | null;
  user: string;
}

interface WalletTableProps {
  tokens: History[] | null;
}

const WalletHistory: React.FC<WalletTableProps> = ({ tokens }) => {
  const [selected, setSelected] = useState<History | null>(null);
  const handleRowClick = (id: string) => {
    const found = tokens?.find((token) => token.id === id) || null;
    setSelected(found);
  };

  return (
    <div className="mt-4 px-2 overflow-x-auto overflow-y-scroll h-[50vh] border-white/10">
      {/* Desktop / Tablet Table */}
      <table className=" w-full min-w-[640px]  ">
        <thead>
          <tr className="text-center text-xs text-white/60 border-b border-white/6">
            <th className="py-3 px-3">Status</th>
            <th className="py-3 px-3">Title</th>
            <th className="py-3 px-3">Date</th>
            <th className="py-3 px-3">Amount</th>
          </tr>
        </thead>
        {tokens === null || tokens.length === 0 ? (
          <tbody className="w-full mx-auto">
            <tr className=" w-full mx-auto  p-8 italic text-center ">
              <td>no data available</td>
            </tr>
          </tbody>
        ) : (
          <tbody className="divide-y divide-white/6 ">
            {tokens.map((t) => (
              <tr
                key={t.id}
                onClick={() => handleRowClick(t.id)}
                className="hover:bg-white/2 text-center"
              >
                <td className="py-4 px-3">
                  <div className="p-3 flex items-center justify-center ">
                    {t.status === "CREDIT" ? (
                      <FaArrowAltCircleUp
                        size={34}
                        className="text-green-600/70 rotate-12  "
                      />
                    ) : (
                      <FaArrowAltCircleDown
                        size={34}
                        className="text-red-600/70 rotate-16  "
                      />
                    )}
                  </div>
                </td>
                <td className="py-4 px-3 text-sm">{t.purpose}</td>
                <td className="py-4 px-3">
                  {/* <div className="text-sm text-white/70">{t.created_at}</div> */}
                  <div className="text-xs text-white/60">{t.created_at}</div>
                </td>
                <td className="py-4 px-3">
                  <div
                    className={`text-sm ${
                      t.status === "CREDIT" ? "text-green-500" : "text-red-400"
                    }`}
                  >
                    {t.amount.toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {selected && (
        <VeiwHistoryModal
          transaction={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
};

export default WalletHistory;
