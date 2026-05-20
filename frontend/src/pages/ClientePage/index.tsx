import { useState } from "react";
import { ClientePageHeader } from "../../components/cliente/ClientePageHeader";
import { ClienteFilhoteCard } from "../../components/cliente/ClienteFilhoteCard";
import { ClienteSectionNav } from "../../components/cliente/ClienteSectionNav";
import { ClienteSectionContent } from "../../components/cliente/ClienteSectionContent";
import type { ClienteSecao } from "../../types/cliente";

export function ClientePage() {
  const [secaoAtiva, setSecaoAtiva] = useState<ClienteSecao>("reserva");

  return (
    <main className="cliente-page pt-32 pb-20 min-h-screen">
      <div className="cliente-page-inner mx-36 flex flex-col gap-10">
        <ClientePageHeader />
        <ClienteFilhoteCard />
        <ClienteSectionNav
          secaoAtiva={secaoAtiva}
          onSecaoChange={setSecaoAtiva}
        />
        <ClienteSectionContent secaoAtiva={secaoAtiva} />
      </div>
    </main>
  );
}
