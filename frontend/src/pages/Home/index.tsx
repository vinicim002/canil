import { BeneficiosBanner } from "../../components/BeneficiosBanner";
import { Depoimentos } from "../../components/Depoimentos";
import { Entrega } from "../../components/Entrega";
import { Estatisticas } from "../../components/Estatisticas";
import { Faq } from "../../components/Faq";
import { Hero } from "../../components/Hero";
import { NossoCanil } from "../../components/NossoCanil";
import { NossosCaes } from "../../components/NossosCaes";
import { ProximoPasso } from "../../components/ProximoPasso";

export function Home() {
  return (
    <>
      <Hero></Hero>
      <BeneficiosBanner></BeneficiosBanner>
      <NossoCanil></NossoCanil>
      <Estatisticas></Estatisticas>
      <NossosCaes></NossosCaes>
      <Entrega></Entrega>
      <Depoimentos></Depoimentos>
      <Faq></Faq>
      <ProximoPasso></ProximoPasso>
    </>
  );
}
