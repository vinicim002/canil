import { BrowserRouter } from "react-router-dom";
import { MainRouter } from "./routers/MainRouter";
import { MainLayout } from "./template/MainLayout";

export function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <MainRouter />
      </MainLayout>
    </BrowserRouter>
  );
}
