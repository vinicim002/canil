import { filhoteService } from "../services/filhoteService";

/** Número do canil (DDI + DDD + número, só dígitos). */
export const WHATSAPP_CANIL_NUMERO = "5521982521511";

export const MENSAGEM_RESERVAR_FILHOTE =
  "Olá! Gostaria de reservar um filhote 🐶";

export function abrirWhatsAppReservarFilhote(): void {
  const texto = encodeURIComponent(MENSAGEM_RESERVAR_FILHOTE);
  window.open(
    `https://wa.me/${WHATSAPP_CANIL_NUMERO}?text=${texto}`,
    "_blank",
    "noopener,noreferrer",
  );
}

/** Clique em Reservar filhote: dispara resposta automática e abre o WhatsApp. */
export async function reservarFilhoteNoClique(): Promise<void> {
  await filhoteService.solicitarReserva(WHATSAPP_CANIL_NUMERO);
  abrirWhatsAppReservarFilhote();
}
