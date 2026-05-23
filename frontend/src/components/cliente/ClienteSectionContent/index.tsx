import type { ReactElement } from "react";
import type { ClienteSecao } from "../../../types/cliente";
import type { useClientePortal } from "../../../hooks/useClientePortal";
import { ClienteSecaoReserva } from "../sections/ClienteSecaoReserva";
import { ClienteSecaoPagamentos } from "../sections/ClienteSecaoPagamentos";
import { ClienteSecaoDocumentos } from "../sections/ClienteSecaoDocumentos";
import { ClienteSecaoVacinacao } from "../sections/ClienteSecaoVacinacao";
import { ClienteSecaoComunicacao } from "../sections/ClienteSecaoComunicacao";

export type ClientePortalData = ReturnType<typeof useClientePortal>;

interface ClienteSectionContentProps {
  secaoAtiva: ClienteSecao;
  portal: ClientePortalData;
}

const SECAO_COMPONENTS: Record<
  ClienteSecao,
  (props: { portal: ClientePortalData }) => ReactElement
> = {
  reserva: ClienteSecaoReserva,
  pagamentos: ClienteSecaoPagamentos,
  documentos: ClienteSecaoDocumentos,
  vacinacao: ClienteSecaoVacinacao,
  comunicacao: ClienteSecaoComunicacao,
};

export function ClienteSectionContent({
  secaoAtiva,
  portal,
}: ClienteSectionContentProps) {
  const Secao = SECAO_COMPONENTS[secaoAtiva];
  return (
    <div className="cliente-conteudo">
      <Secao portal={portal} />
    </div>
  );
}
