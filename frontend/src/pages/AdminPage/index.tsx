import { useState } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AdminSidebar } from "../../components/admin/AdminSidebar";
import { AdminHeader } from "../../components/admin/AdminHeader";
import { adminPageTitles } from "../../constants/adminMenu";
import { AdminCaesPage } from "../AdminCaesPage";
import { AdminReservasPage } from "../AdminReservasPage";
import { AdminClientesPage } from "../AdminClientesPage";
import { AdminAgendamentosPage } from "../AdminAgendamentosPage";
import { AdminDepoimentosPage } from "../AdminDepoimentosPage";
import { AdminFaqPage } from "../AdminFaqPage";
import { AdminDashboardPage } from "../AdminDashboardPage";
import { AdminFilhotesPage } from "../AdminFilhotesPage";

export function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const titulo = adminPageTitles[location.pathname] || "Painel de Controle";

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="min-h-screen bg-cream flex overflow-x-hidden">
      <AdminSidebar isOpen={sidebarOpen} toggle={toggleSidebar} />

      <div className="flex flex-col flex-1 lg:ml-72 min-w-0">
        <AdminHeader titulo={titulo} toggleSidebar={toggleSidebar} />

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
                <Route path="/filhotes" element={<AdminFilhotesPage />} />
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
