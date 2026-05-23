import { useState } from "react";
import { ClientePageHeader } from "../../components/cliente/ClientePageHeader";
import { ClienteFilhoteCard } from "../../components/cliente/ClienteFilhoteCard";
import { ClienteSectionNav } from "../../components/cliente/ClienteSectionNav";
import { ClienteSectionContent } from "../../components/cliente/ClienteSectionContent";
import { AuthLoading } from "../../components/AuthLoading";
import { useClientePortal } from "../../hooks/useClientePortal";
import type { ClienteSecao } from "../../types/cliente";

export function ClientePage() {
  const [secaoAtiva, setSecaoAtiva] = useState<ClienteSecao>("reserva");
  const portal = useClientePortal();

  if (portal.loading) {
    return (
      <main className="cliente-page pt-32 pb-20 min-h-screen">
        <AuthLoading />
      </main>
    );
  }

  return (
    <main className="cliente-page pt-32 pb-20 min-h-screen">
      <div className="cliente-page-inner mx-36 flex flex-col gap-10">
        <ClientePageHeader />
        {portal.erro && (
          <p className="text-red-600 text-sm font-medium">{portal.erro}</p>
        )}
        {!portal.reserva && !portal.erro && (
          <div className="bg-white rounded-2xl p-8 border border-brown/10 text-center">
            <p className="text-body/70">
              Você ainda não possui reservas ativas. Explore nossos filhotes e
              faça sua solicitação.
            </p>
          </div>
        )}
        {portal.reserva && (
          <>
            <ClienteFilhoteCard reserva={portal.reserva} />
            <ClienteSectionNav
              secaoAtiva={secaoAtiva}
              onSecaoChange={setSecaoAtiva}
            />
            <ClienteSectionContent secaoAtiva={secaoAtiva} portal={portal} />
          </>
        )}
      </div>
    </main>
  );
}
