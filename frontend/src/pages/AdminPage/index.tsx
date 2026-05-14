import { Link, useLocation, Routes, Route } from "react-router-dom";
import { AdminCaesPage } from "../AdminCaesPage";
import { AdminReservasPage } from "../AdminReservasPage";
import { AdminClientesPage } from "../AdminClientesPage";
import { AdminAgendamentosPage } from "../AdminAgendamentosPage";
import { AdminDepoimentosPage } from "../AdminDepoimentosPage";
import { AdminFaqPage } from "../AdminFaqPage";

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

function DashboardPage() {
  const metricas = [
    {
      label: "Filhotes disponíveis",
      valor: "8",
      icon: "🐾",
      variacao: "+2 esse mês",
    },
    {
      label: "Reservas ativas",
      valor: "5",
      icon: "📋",
      variacao: "+1 essa semana",
    },
    {
      label: "Clientes cadastrados",
      valor: "47",
      icon: "👤",
      variacao: "+3 esse mês",
    },
    {
      label: "Agendamentos pendentes",
      valor: "3",
      icon: "📅",
      variacao: "hoje",
    },
  ];

  const reservasRecentes = [
    {
      cliente: "Maria Silva",
      cao: "Thor",
      status: "APROVADA",
      valor: "R$ 500,00",
      data: "05/05/2026",
    },
    {
      cliente: "João Santos",
      cao: "Luna",
      status: "SOLICITADA",
      valor: "R$ 500,00",
      data: "04/05/2026",
    },
    {
      cliente: "Ana Costa",
      cao: "Max",
      status: "PAGA",
      valor: "R$ 2.800,00",
      data: "01/05/2026",
    },
    {
      cliente: "Pedro Lima",
      cao: "Bella",
      status: "CANCELADA",
      valor: "R$ 500,00",
      data: "28/04/2026",
    },
  ];

  const filhotesRecentes = [
    {
      nome: "Thor",
      pelo: "Pelo curto",
      tamanho: "Miniatura",
      status: "DISPONIVEL",
    },
    {
      nome: "Luna",
      pelo: "Pelo longo",
      tamanho: "Kaninchen",
      status: "RESERVADO",
    },
    {
      nome: "Max",
      pelo: "Pelo curto",
      tamanho: "Padrão",
      status: "DISPONIVEL",
    },
    {
      nome: "Bella",
      pelo: "Pelo longo",
      tamanho: "Miniatura",
      status: "VENDIDO",
    },
  ];

  const statusReservaColor: Record<string, string> = {
    APROVADA: "bg-green-100 text-green-700",
    SOLICITADA: "bg-yellow-100 text-yellow-700",
    EM_ANALISE: "bg-blue-100 text-blue-700",
    PAGA: "bg-purple-100 text-purple-700",
    REJEITADA: "bg-red-100 text-red-700",
    CANCELADA: "bg-red-100 text-red-700",
  };

  const statusFilhoteColor: Record<string, string> = {
    DISPONIVEL: "bg-green-100 text-green-700",
    RESERVADO: "bg-yellow-100 text-yellow-700",
    VENDIDO: "bg-brown/10 text-brown",
  };

  return (
    <div className="admin-dashboard flex flex-col gap-8">
      <div className="admin-metricas grid grid-cols-4 gap-5">
        {metricas.map((m) => (
          <div
            key={m.label}
            className="admin-metrica-card bg-white rounded-2xl p-5 flex flex-col gap-3 border border-brown/10"
          >
            <div className="flex flex-row items-center justify-between">
              <span className="text-body/50 text-sm font-medium">
                {m.label}
              </span>
              <span className="text-2xl">{m.icon}</span>
            </div>
            <span className="font-cmas-play text-brown text-4xl">
              {m.valor}
            </span>
            <span className="text-orange text-xs font-medium">
              {m.variacao}
            </span>
          </div>
        ))}
      </div>

      <div className="admin-tabelas grid grid-cols-2 gap-6">
        <div className="admin-tabela-card bg-white rounded-2xl border border-brown/10 overflow-hidden">
          <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
            <h3 className="font-cmas-play text-brown text-xl">
              Reservas Recentes
            </h3>
            <Link
              to="/admin/reservas"
              className="text-orange text-sm font-medium hover:underline"
            >
              Ver todas
            </Link>
          </div>
          <div className="admin-tabela-body">
            {reservasRecentes.map((r, i) => (
              <div
                key={i}
                className="flex flex-row items-center justify-between px-6 py-3 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-brown font-medium text-sm">
                    {r.cliente}
                  </span>
                  <span className="text-body/50 text-xs">
                    {r.cao} · {r.data}
                  </span>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <span className="text-brown font-semibold text-sm">
                    {r.valor}
                  </span>
                  <span
                    className={`text-xs font-medium py-1 px-2 rounded-full ${statusReservaColor[r.status] || "bg-gray-100 text-gray-700"}`}
                  >
                    {r.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="admin-tabela-card bg-white rounded-2xl border border-brown/10 overflow-hidden">
          <div className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/10">
            <h3 className="font-cmas-play text-brown text-xl">Filhotes</h3>
            <Link
              to="/admin/filhotes"
              className="text-orange text-sm font-medium hover:underline"
            >
              Ver todos
            </Link>
          </div>
          <div className="admin-tabela-body">
            {filhotesRecentes.map((f, i) => (
              <div
                key={i}
                className="flex flex-row items-center justify-between px-6 py-3 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
              >
                <div className="flex flex-row items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brown/10 flex items-center justify-center shrink-0">
                    <span className="text-sm">🐾</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-brown font-medium text-sm">
                      {f.nome}
                    </span>
                    <span className="text-body/50 text-xs">
                      {f.pelo} · {f.tamanho}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-xs font-medium py-1 px-2 rounded-full ${statusFilhoteColor[f.status] || "bg-gray-100 text-gray-700"}`}
                >
                  {f.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
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
            <Route path="/" element={<DashboardPage />} />
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
