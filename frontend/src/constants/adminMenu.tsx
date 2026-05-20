import type { ReactNode } from "react";
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
} from "lucide-react";

export type AdminMenuItem = {
  label: string;
  icon: ReactNode;
  path: string;
};

export const adminMenuItems: AdminMenuItem[] = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    path: "/admin",
  },
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

export const adminPageTitles: Record<string, string> = {
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
