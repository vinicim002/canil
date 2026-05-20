import { Link } from "react-router-dom";
import { Menu, Bell, Globe } from "lucide-react";

interface AdminHeaderProps {
  titulo: string;
  toggleSidebar: () => void;
}

export function AdminHeader({ titulo, toggleSidebar }: AdminHeaderProps) {
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
