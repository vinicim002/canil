import { Depoimentos } from "./components/Depoimentos";
import { Entrega } from "./components/Entrega";
import { Faq } from "./components/Faq";
import { NossoCanil } from "./components/NossoCanil";
import { NossosCaes } from "./components/NossosCaes";
import { ProximoPasso } from "./components/ProximoPasso";
import { Home } from "./pages/Home";

export function App() {
  return (
    <>
      <Home></Home>
      <NossoCanil></NossoCanil>
      <NossosCaes></NossosCaes>
      <Entrega></Entrega>
      <Depoimentos></Depoimentos>
      <Faq></Faq>
      <ProximoPasso></ProximoPasso>
    </>
  );
}
