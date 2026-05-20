import { CLIENTE_MENSAGENS } from "../../../../constants/cliente";

export function ClienteSecaoComunicacao() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-cmas-play text-brown text-2xl">Comunicação</h2>

      <div className="grid grid-cols-2 gap-5">
        <a
          href="https://wa.me/5500000000000"
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

      <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-brown/10">
          <h3 className="font-cmas-play text-brown text-xl">Mensagens</h3>
        </div>
        <div className="flex flex-col gap-4 p-6">
          {CLIENTE_MENSAGENS.map((msg, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="flex flex-row items-center justify-between">
                <span className="text-orange font-semibold text-xs">{msg.de}</span>
                <span className="text-body/40 text-xs">{msg.data}</span>
              </div>
              <div className="bg-cream rounded-xl px-4 py-3">
                <p className="text-body font-medium text-sm">{msg.mensagem}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
