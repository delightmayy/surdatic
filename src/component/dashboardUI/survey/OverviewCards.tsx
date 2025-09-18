import { useNavigate } from "react-router-dom";

type OverviewCardData = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  iconBg: string; // Tailwind background class e.g. "bg-amber-400"
};

interface OverviewCardsProps {
  data: OverviewCardData[];
}

const OverviewCards: React.FC<OverviewCardsProps> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
      {data.map((item, idx) => (
        <div
          key={idx}
          onClick={() => {
            item.title.toLowerCase().includes("completed")
              ? navigate("/dashboard/history")
              : navigate("#");
          }}
          className="rounded-xl border border-white/10 hover:border-sky-500/30 bg-white/5 p-4 hover:scale-98"
        >
          <div className="flex justify-between items-center">
            <p className="text-white/70 text-sm">{item.title}</p>
            <span className={`p-1 rounded ${item.iconBg}`}>{item.icon}</span>
          </div>
          <p className="mt-4 text-3xl font-semibold">
            {" "}
            {String(item.value).padStart(2, "0")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCards;
