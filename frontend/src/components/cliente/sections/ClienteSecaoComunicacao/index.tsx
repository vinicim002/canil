import { WHATSAPP_CANIL_NUMERO } from "../../../../constants/whatsapp";
import type { ClientePortalData } from "../../ClienteSectionContent";

interface Props {
  portal: ClientePortalData;
}

export function ClienteSecaoComunicacao({ portal: _portal }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Comunicação</h2>

      <div className="grid grid-cols-2 gap-5">
        <a
          href={`https://wa.me/${WHATSAPP_CANIL_NUMERO}`}
          target="_blank"
          rel="noreferrer"
          className="bg-green-500 rounded-2xl p-6 flex flex-row items-center gap-4 hover:bg-green-600 transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="text-2xl">📱</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-cmas-play text-white text-xl">WhatsApp</span>
            <span className="text-white/70 text-sm font-medium">
              Fale diretamente conosco
            </span>
          </div>
        </a>

        <a
          href="mailto:contato@canilaltabelavista.com.br"
          className="bg-brown rounded-2xl p-6 flex flex-row items-center gap-4 hover:bg-orange transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <span className="text-2xl">📧</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-cmas-play text-white text-xl">E-mail</span>
            <span className="text-white/70 text-sm font-medium">
              contato@canilaltabelavista.com.br
            </span>
          </div>
        </a>
      </div>

      <p className="text-body/60 text-sm bg-cream rounded-xl p-4 border border-brown/10">
        Mensagens automáticas do canil aparecerão aqui em uma próxima versão.
        Por enquanto, use WhatsApp ou e-mail para falar conosco.
      </p>
    </div>
  );
}
