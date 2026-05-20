import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { DashboardMetricCards } from "../../components/admin/dashboard/DashboardMetricCards";
import { DashboardRecentReservas } from "../../components/admin/dashboard/DashboardRecentReservas";
import { DashboardRecentFilhotes } from "../../components/admin/dashboard/DashboardRecentFilhotes";
import { DashboardRecentCaes } from "../../components/admin/dashboard/DashboardRecentCaes";
import { useAdminDashboard } from "../../hooks/useAdminDashboard";

export function AdminDashboardPage() {
  const {
    cards,
    reservasRecentes,
    filhotesRecentes,
    caesRecentes,
    carregando,
  } = useAdminDashboard();

  if (carregando) {
    return (
      <LoadingSpinner
        message="Carregando dashboard..."
        className="py-32"
      />
    );
  }

  return (
    <div className="admin-dashboard flex flex-col gap-8">
      <DashboardMetricCards cards={cards} />

      <div className="admin-tabelas grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DashboardRecentReservas reservas={reservasRecentes} />
        <DashboardRecentFilhotes filhotes={filhotesRecentes} />
        <DashboardRecentCaes caes={caesRecentes} />
      </div>
    </div>
  );
}
