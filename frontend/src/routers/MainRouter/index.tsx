import { Route, Routes } from "react-router-dom";
import { Home } from "../../pages/Home";
import { SobrePage } from "../../pages/SobrePage";
import { NossosCaesPage } from "../../pages/NossosCaesPage";
import { FilhotesPage } from "../../pages/FilhotesPage";
import { ContatoPage } from "../../pages/ContatoPage";
import { NotFound } from "../../pages/NotFound";

export function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/sobre" element={<SobrePage />} />
      <Route path="/nossos-caes" element={<NossosCaesPage />} />
      <Route path="/filhotes" element={<FilhotesPage />} />
      <Route path="/contato" element={<ContatoPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
