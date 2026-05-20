import { Link } from "react-router-dom";
import type { DashboardMetricaCard } from "../../../../hooks/useAdminDashboard";

interface DashboardMetricCardsProps {
  cards: DashboardMetricaCard[];
}

export function DashboardMetricCards({ cards }: DashboardMetricCardsProps) {
  return (
    <div className="admin-metricas grid grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((m) => (
        <Link
          key={m.label}
          to={m.link}
          className="admin-metrica-card bg-white rounded-2xl p-5 flex flex-col gap-3 border border-brown/10 hover:border-orange/30 hover:shadow-sm transition-all"
        >
          <div className="flex flex-row items-center justify-between">
            <span className="text-body/50 text-sm font-medium">{m.label}</span>
            <span className="text-2xl">{m.icon}</span>
          </div>
          <span className="font-cmas-play text-brown text-4xl">{m.valor}</span>
          <span className="text-orange text-xs font-medium">{m.variacao}</span>
        </Link>
      ))}
    </div>
  );
}
