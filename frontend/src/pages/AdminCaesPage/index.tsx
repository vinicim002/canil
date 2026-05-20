import { AdminCaoManagementView } from "../../components/admin/caes/AdminCaoManagementView";
import type { AdminCaoAba } from "../../components/admin/caes/AdminCaoManagementView";

const ABAS: AdminCaoAba[] = [
  { label: "Todos", tipo: "" },
  { label: "Matrizes", tipo: "MATRIZ" },
  { label: "Reprodutores", tipo: "REPRODUTOR" },
];

export function AdminCaesPage() {
  return (
    <AdminCaoManagementView
      titulo="Cães"
      btnName="cão"
      tipos={["MATRIZ", "REPRODUTOR"]}
      modalTipos={["REPRODUTOR", "MATRIZ"]}
      showAbas
      abas={ABAS}
    />
  );
}
