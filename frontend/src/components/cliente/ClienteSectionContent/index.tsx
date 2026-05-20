import type { ReactElement } from "react";
import type { ClienteSecao } from "../../../types/cliente";
import { ClienteSecaoReserva } from "../sections/ClienteSecaoReserva";
import { ClienteSecaoPagamentos } from "../sections/ClienteSecaoPagamentos";
import { ClienteSecaoDocumentos } from "../sections/ClienteSecaoDocumentos";
import { ClienteSecaoVacinacao } from "../sections/ClienteSecaoVacinacao";
import { ClienteSecaoComunicacao } from "../sections/ClienteSecaoComunicacao";

interface ClienteSectionContentProps {
  secaoAtiva: ClienteSecao;
}

const SECAO_COMPONENTS: Record<ClienteSecao, () => ReactElement> = {
  reserva: ClienteSecaoReserva,
  pagamentos: ClienteSecaoPagamentos,
  documentos: ClienteSecaoDocumentos,
  vacinacao: ClienteSecaoVacinacao,
  comunicacao: ClienteSecaoComunicacao,
};

export function ClienteSectionContent({ secaoAtiva }: ClienteSectionContentProps) {
  const Secao = SECAO_COMPONENTS[secaoAtiva];
  return (
    <div className="cliente-conteudo">
      <Secao />
    </div>
  );
}
