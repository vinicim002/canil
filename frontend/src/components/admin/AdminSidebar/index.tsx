import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { PawPrint, X, LogOut } from "lucide-react";
import { adminMenuItems } from "../../../constants/adminMenu";

interface AdminSidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export function AdminSidebar({ isOpen, toggle }: AdminSidebarProps) {
  const location = useLocation();

  return (
    <>
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

        <nav className="flex-1 px-4 py-6 overflow-y-auto custom-scrollbar flex flex-col gap-1">
          <span className="text-white/20 text-[10px] font-black tracking-[0.2em] px-4 mb-2">
            SISTEMA
          </span>
          {adminMenuItems.map((item) => {
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
