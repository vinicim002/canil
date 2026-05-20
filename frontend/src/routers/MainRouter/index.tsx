import { Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home";
import { SobrePage } from "../../pages/SobrePage";
import { NossosCaesPage } from "../../pages/NossosCaesPage";
import { MainLayout } from "../../layouts/MainLayout";
import { ContatoPage } from "../../pages/ContatoPage";
import { FilhotesPage } from "../../pages/FilhotesPage";
import { LoginPage } from "../../pages/LoginPage";
import { ProtectedRoute } from "../../components/ProtectedRoute";
import { ClientePage } from "../../pages/ClientePage";
import { AdminPage } from "../../pages/AdminPage";
import { NotFound } from "../../pages/NotFound";
// imports das páginas...

export function MainRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<SobrePage />} />
        <Route path="/nossos-caes" element={<NossosCaesPage />} />
        <Route path="/filhotes" element={<FilhotesPage />} />
        <Route path="/contato" element={<ContatoPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/cliente"
          element={
            <ProtectedRoute>
              <ClientePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}
