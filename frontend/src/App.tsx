import { Home } from "./pages/Home";
import { MainLayout } from "./template/MainLayout";

export function App() {
  return (
    <>
      <MainLayout>
        <Home></Home>
      </MainLayout>
    </>
  );
}
