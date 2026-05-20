import { useLocation } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";

export function MainLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const isLogin = location.pathname === "/login";
  const isClienteArea = location.pathname === "/cliente";
  const esconderLayout = isAdmin || isLogin || isClienteArea;

  return (
    <div className="main-layout">
      {!esconderLayout && <Navbar />}
      {children}
      {!esconderLayout && <Footer />}
    </div>
  );
}
