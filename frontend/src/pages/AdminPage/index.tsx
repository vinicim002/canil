import { useState } from "react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  PawPrint,
  Baby,
  ClipboardList,
  Users,
  Calendar,
  Star,
  MessageCircle,
  Settings,
  Menu,
  X,
  Bell,
  Globe,
  LogOut,
} from "lucide-react";

// Suas importações de páginas (mantenha-as)
import { AdminCaesPage } from "../AdminCaesPage";
import { AdminReservasPage } from "../AdminReservasPage";
import { AdminClientesPage } from "../AdminClientesPage";
import { AdminAgendamentosPage } from "../AdminAgendamentosPage";
import { AdminDepoimentosPage } from "../AdminDepoimentosPage";
import { AdminFaqPage } from "../AdminFaqPage";
import { AdminDashboardPage } from "../AdminDashboardPage";

type MenuItem = {
  label: string;
  icon: React.ReactNode;
  path: string;
};

const menuItems: MenuItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
  { label: "Cães", icon: <PawPrint size={20} />, path: "/admin/caes" },
  { label: "Filhotes", icon: <Baby size={20} />, path: "/admin/filhotes" },
  {
    label: "Reservas",
    icon: <ClipboardList size={20} />,
    path: "/admin/reservas",
  },
  { label: "Clientes", icon: <Users size={20} />, path: "/admin/clientes" },
  {
    label: "Agendamentos",
    icon: <Calendar size={20} />,
    path: "/admin/agendamentos",
  },
  {
    label: "Depoimentos",
    icon: <Star size={20} />,
    path: "/admin/depoimentos",
  },
  { label: "FAQ", icon: <MessageCircle size={20} />, path: "/admin/faq" },
  {
    label: "Configurações",
    icon: <Settings size={20} />,
    path: "/admin/configuracoes",
  },
];

const titulos: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/caes": "Gestão de Cães",
  "/admin/filhotes": "Ninhadas e Filhotes",
  "/admin/reservas": "Controle de Reservas",
  "/admin/clientes": "Base de Clientes",
  "/admin/agendamentos": "Agenda de Visitas",
  "/admin/depoimentos": "Depoimentos",
  "/admin/faq": "Dúvidas Frequentes",
  "/admin/configuracoes": "Configurações do Sistema",
};

function AdminSidebar({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  const location = useLocation();

  return (
    <>
      {/* Overlay para Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggle}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
          />
        )}
      </AnimatePresence>

      <aside
        className={`fixed top-0 left-0 h-screen w-72 bg-brown flex flex-col z-[70] transition-transform duration-300 lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-6 py-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange flex items-center justify-center shadow-lg shadow-orange/20">
              <PawPrint className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-cmas-play text-white text-base font-bold leading-none">
                Alto da
              </span>
              <span className="font-cmas-play text-orange text-base font-bold">
                Bela Vista
              </span>
            </div>
          </div>
          <button
            onClick={toggle}
            className="lg:hidden text-white/50 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar flex flex-col gap-1">
          <span className="text-white/20 text-[10px] font-black tracking-[0.2em] px-4 mb-2">
            SISTEMA
          </span>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={toggle}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${
                  isActive
                    ? "bg-orange text-white shadow-lg shadow-orange/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  className={`${isActive ? "text-white" : "text-orange group-hover:scale-110 transition-transform"}`}
                >
                  {item.icon}
                </span>
                <span className="text-sm font-bold tracking-wide">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-white/5 bg-black/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange/20 border border-orange/20 flex items-center justify-center text-orange font-bold">
              V
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-bold">Vinícius</span>
              <span className="text-white/30 text-[10px]">Administrador</span>
            </div>
          </div>
          <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 text-white/60 text-xs font-bold hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut size={14} /> Sair do Painel
          </button>
        </div>
      </aside>
    </>
  );
}

function AdminHeader({
  titulo,
  toggleSidebar,
}: {
  titulo: string;
  toggleSidebar: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8 py-4 bg-cream/80 backdrop-blur-md border-b border-brown/5">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-brown hover:bg-brown/5 rounded-xl"
        >
          <Menu size={24} />
        </button>
        <h1 className="font-cmas-play text-brown text-xl lg:text-2xl font-bold">
          {titulo}
        </h1>
      </div>

      <div className="flex items-center gap-2 lg:gap-4">
        <button className="p-2 text-brown/40 hover:text-orange transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-orange rounded-full border-2 border-cream" />
        </button>
        <Link
          to="/"
          className="hidden sm:flex items-center gap-2 bg-brown text-white text-xs font-bold py-2.5 px-5 rounded-full hover:bg-orange transition-all shadow-sm"
        >
          <Globe size={14} /> Ver Site
        </Link>
      </div>
    </header>
  );
}

export function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const titulo = titulos[location.pathname] || "Painel de Controle";

  return (
    <div className="min-h-screen bg-cream flex overflow-x-hidden">
      <AdminSidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div className="flex flex-col flex-1 lg:ml-72 min-w-0">
        <AdminHeader
          titulo={titulo}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />

        <main className="flex-1 p-4 lg:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Routes>
                <Route path="/" element={<AdminDashboardPage />} />
                <Route path="/caes" element={<AdminCaesPage />} />
                <Route path="/reservas" element={<AdminReservasPage />} />
                <Route path="/clientes" element={<AdminClientesPage />} />
                <Route
                  path="/agendamentos"
                  element={<AdminAgendamentosPage />}
                />
                <Route path="/depoimentos" element={<AdminDepoimentosPage />} />
                <Route path="/faq" element={<AdminFaqPage />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
