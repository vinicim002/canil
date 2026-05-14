import { Link, useLocation, Routes, Route } from "react-router-dom";
import { AdminCaesPage } from "../AdminCaesPage";
import { AdminReservasPage } from "../AdminReservasPage";
import { AdminClientesPage } from "../AdminClientesPage";
import { AdminAgendamentosPage } from "../AdminAgendamentosPage";
import { AdminDepoimentosPage } from "../AdminDepoimentosPage";
import { AdminFaqPage } from "../AdminFaqPage";
import { AdminDashboardPage } from "../AdminDashboardPage";

type MenuItem = {
  label: string;
  icon: string;
  path: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: "📊", path: "/admin" },
  { label: "Cães", icon: "🐕", path: "/admin/caes" },
  { label: "Filhotes", icon: "🐾", path: "/admin/filhotes" },
  { label: "Reservas", icon: "📋", path: "/admin/reservas" },
  { label: "Clientes", icon: "👤", path: "/admin/clientes" },
  { label: "Agendamentos", icon: "📅", path: "/admin/agendamentos" },
  { label: "Depoimentos", icon: "⭐", path: "/admin/depoimentos" },
  { label: "FAQ", icon: "❓", path: "/admin/faq" },
  { label: "Configurações", icon: "⚙️", path: "/admin/configuracoes" },
];

const titulos: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/caes": "Cães",
  "/admin/filhotes": "Filhotes",
  "/admin/reservas": "Reservas",
  "/admin/clientes": "Clientes",
  "/admin/agendamentos": "Agendamentos",
  "/admin/depoimentos": "Depoimentos",
  "/admin/faq": "FAQ",
  "/admin/configuracoes": "Configurações",
};

function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="admin-sidebar fixed top-0 left-0 h-screen w-64 bg-brown flex flex-col z-50">
      <div className="admin-sidebar-logo flex flex-row items-center gap-3 px-6 py-6 border-b border-white/10">
        <div className="w-9 h-9 rounded-full bg-orange flex items-center justify-center shrink-0">
          <span className="text-white text-sm font-bold">C</span>
        </div>
        <div className="flex flex-col">
          <span className="font-cmas-play text-white text-sm leading-tight">
            Canil Alto da
          </span>
          <span className="font-cmas-play text-orange text-sm leading-tight">
            Bela Vista
          </span>
        </div>
      </div>

      <nav className="admin-sidebar-nav flex flex-col gap-1 px-3 py-4 flex-1">
        <span className="text-white/30 text-xs font-medium px-3 pb-2 tracking-widest">
          MENU
        </span>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`admin-sidebar-item flex flex-row items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                isActive
                  ? "bg-orange text-white"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="admin-sidebar-footer px-6 py-4 border-t border-white/10">
        <div className="flex flex-row items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange/30 flex items-center justify-center shrink-0">
            <span className="text-orange text-xs font-bold">A</span>
          </div>
          <div className="flex flex-col">
            <span className="text-white text-xs font-medium">
              Administrador
            </span>
            <span className="text-white/40 text-xs">admin@canil.com.br</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

function AdminHeader({ titulo }: { titulo: string }) {
  return (
    <header className="admin-header flex flex-row items-center justify-between px-8 py-4 border-b border-brown/10 bg-white/50 backdrop-blur-sm">
      <h1 className="font-cmas-play text-brown text-2xl">{titulo}</h1>
      <div className="flex flex-row items-center gap-4">
        <button className="text-body/50 hover:text-brown transition-colors text-sm font-medium">
          🔔 Notificações
        </button>
        <Link
          to="/"
          className="bg-brown text-white text-sm font-medium py-2 px-4 rounded-full hover:bg-orange transition-colors"
        >
          Ver site
        </Link>
      </div>
    </header>
  );
}

export function AdminPage() {
  const location = useLocation();
  const titulo = titulos[location.pathname] || "Admin";

  return (
    <div className="admin-layout min-h-screen bg-cream flex">
      <AdminSidebar />
      <div className="admin-main flex flex-col flex-1 ml-64">
        <AdminHeader titulo={titulo} />
        <main className="admin-content flex-1 p-8">
          <Routes>
            <Route path="/" element={<AdminDashboardPage />} />
            <Route path="/caes" element={<AdminCaesPage />} />
            <Route path="/reservas" element={<AdminReservasPage />} />
            <Route path="/clientes" element={<AdminClientesPage />} />
            <Route path="/agendamentos" element={<AdminAgendamentosPage />} />
            <Route path="/depoimentos" element={<AdminDepoimentosPage />} />
            <Route path="/faq" element={<AdminFaqPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
