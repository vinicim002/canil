import { Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home";
import { SobrePage } from "../../pages/SobrePage";
import { NossosCaesPage } from "../../pages/NossosCaesPage";
import { FilhotesPage } from "../../pages/FilhotesPage";
import { ContatoPage } from "../../pages/ContatoPage";
import { NotFound } from "../../pages/NotFound";
import { AdminPage } from "../../pages/AdminPage";
import { LoginPage } from "../../pages/LoginPage";
import { ClientePage } from "../../pages/ClientePage";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<SobrePage />} />
      <Route path="/nossos-caes" element={<NossosCaesPage />} />
      <Route path="/filhotes" element={<FilhotesPage />} />
      <Route path="/contato" element={<ContatoPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin/*" element={<AdminPage />} />
      <Route path="/cliente" element={<ClientePage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
