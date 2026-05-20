import { BrowserRouter } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthProvider";
import { MainRouter } from "./routers/MainRouter";

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}