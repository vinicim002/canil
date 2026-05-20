import { AdminCaoManagementView } from "../../components/admin/caes/AdminCaoManagementView";

export function AdminFilhotesPage() {
  return (
    <AdminCaoManagementView
      titulo="Filhotes"
      btnName="filhote"
      tipos="FILHOTE"
      modalTipos={["FILHOTE"]}
      showStatus
    />
  );
}
