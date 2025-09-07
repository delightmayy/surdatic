import React from "react";
import { FiArrowRight } from "react-icons/fi";

type Token = {
  id: string;
  name: string;
  symbol: string;
  icon?: string;
  portfolioPct: number;
  price: number;
  balance: number;
};

interface WalletTableProps {
  tokens: Token[];
}

const WalletTable: React.FC<WalletTableProps> = ({ tokens }) => {
  return (
    <div className="mt-4 overflow-x-auto">
      {/* Desktop / Tablet Table */}
      <table className="hidden md:table w-full min-w-[640px]">
        <thead>
          <tr className="text-left text-xs text-white/60 border-b border-white/6">
            <th className="py-3 px-3">Token</th>
            <th className="py-3 px-3">Portfolio %</th>
            <th className="py-3 px-3">Price</th>
            <th className="py-3 px-3">Balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/6">
          {tokens.map((t) => (
            <tr key={t.id} className="hover:bg-white/2">
              <td className="py-4 px-3">
                <div className="flex items-center gap-3">
                  <img
                    src={t.icon}
                    alt={t.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div className="text-xs text-white/60">{t.symbol}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-3 text-sm">{t.portfolioPct}%</td>
              <td className="py-4 px-3">
                <div className="text-sm text-white/70">
                  ${t.price.toFixed(3)}
                </div>
              </td>
              <td className="py-4 px-3">
                <div className="text-sm">{t.balance.toLocaleString()}</div>
                <div className="text-xs text-white/60">
                  {(t.balance * t.price).toFixed(3)} USDT
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-3">
        {tokens.map((t) => (
          <div
            key={t.id}
            className="p-3 rounded-xl border border-white/10 bg-black/30 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={t.icon}
                alt={t.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-white/60">{t.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-white/60">
                {t.portfolioPct}% • ${t.price.toFixed(3)}
              </div>
              <div className="text-sm font-medium">
                {t.balance.toLocaleString()}
              </div>
            </div>
            <FiArrowRight className="opacity-60" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WalletTable;
