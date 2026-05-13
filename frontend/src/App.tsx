import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routers/MainRouter";
import { AuthProvider } from "./contexts/AuthProvider";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MainRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}