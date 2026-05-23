import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ClientePendingPage } from "../../pages/ClientePendingPage";
import { AuthLoading } from "../AuthLoading";

interface ClienteRouteProps {
  children: React.ReactNode;
}

export function ClienteRoute({ children }: ClienteRouteProps) {
  const { isAuthenticated, isAdmin, isClienteAprovado, loading } = useAuth();

  if (loading) return <AuthLoading />;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (isAdmin) return <Navigate to="/admin" replace />;

  if (!isClienteAprovado) return <ClientePendingPage />;

  return <>{children}</>;
}
