export function ContatoPage() {
  return (
    <main className="contato-page pt-32 pb-20 mb-20">
      <div className="contato-page-inner mx-36 flex flex-col gap-20">
        {/* Header */}
        <div className="contato-header flex flex-col items-center gap-4 text-center">
          <h3 className="font-cmas-play text-orange text-2xl">FALE CONOSCO</h3>
          <h1 className="font-cmas-play text-brown text-5xl">CONTATO</h1>
          <p className="text-body font-medium text-base max-w-lg">
            Tire suas dúvidas, faça sua reserva ou apenas diga olá. Respondemos
            rapidamente pelo WhatsApp.
          </p>
        </div>

        {/* Conteudo */}
        <div className="contato-conteudo flex flex-row items-start gap-16">
          {/* Formulario */}
          <form
            className="contato-formulario w-1/2 flex flex-col gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="font-cmas-play text-brown text-3xl">
              Envie uma mensagem
            </h2>

            <div className="contato-campo flex flex-col gap-2">
              <label htmlFor="nome" className="text-brown font-medium text-sm">
                Nome completo
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Seu nome"
                className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
              />
            </div>

            <div className="contato-campo flex flex-col gap-2">
              <label htmlFor="email" className="text-brown font-medium text-sm">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
              />
            </div>

            <div className="contato-campo flex flex-col gap-2">
              <label
                htmlFor="telefone"
                className="text-brown font-medium text-sm"
              >
                Telefone
              </label>
              <input
                id="telefone"
                type="tel"
                placeholder="(00) 00000-0000"
                className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
              />
            </div>

            <div className="contato-campo flex flex-col gap-2">
              <label
                htmlFor="assunto"
                className="text-brown font-medium text-sm"
              >
                Assunto
              </label>
              <select
                id="assunto"
                className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
              >
                <option value="">Selecione um assunto</option>
                <option value="reserva">Reservar filhote</option>
                <option value="duvida">Dúvidas gerais</option>
                <option value="entrega">Entrega e logística</option>
                <option value="garantia">Política de garantia</option>
              </select>
            </div>

            <div className="contato-campo flex flex-col gap-2">
              <label
                htmlFor="mensagem"
                className="text-brown font-medium text-sm"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                placeholder="Escreva sua mensagem..."
                rows={5}
                className="w-full bg-cream border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="bg-brown text-white font-medium py-4 px-8 rounded-full cursor-pointer hover:bg-orange transition-colors w-full"
            >
              Enviar mensagem
            </button>
          </form>

          {/* Info */}
          <div className="contato-info w-1/2 flex flex-col gap-8">
            <h2 className="font-cmas-play text-brown text-3xl">Informacoes</h2>

            <div className="contato-info-cards flex flex-col gap-4">
              <div className="contato-info-card glass-brown rounded-2xl p-6 flex flex-row items-center gap-5">
                <div className="contato-info-icone w-12 h-12 rounded-full bg-orange flex items-center justify-center shrink-0">
                  <span className="text-xl">📱</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-cmas-play text-brown text-lg">
                    WhatsApp
                  </span>
                  <span className="text-body font-medium text-sm">
                    (00) 00000-0000
                  </span>
                  <span className="text-body/50 text-xs font-medium">
                    Respondemos em até 1 hora
                  </span>
                </div>
              </div>

              <div className="contato-info-card glass-brown rounded-2xl p-6 flex flex-row items-center gap-5">
                <div className="contato-info-icone w-12 h-12 rounded-full bg-orange flex items-center justify-center shrink-0">
                  <span className="text-xl">📧</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-cmas-play text-brown text-lg">
                    E-mail
                  </span>
                  <span className="text-body font-medium text-sm">
                    contato@canilaltabelavista.com.br
                  </span>
                  <span className="text-body/50 text-xs font-medium">
                    Respondemos em até 24 horas
                  </span>
                </div>
              </div>

              <div className="contato-info-card glass-brown rounded-2xl p-6 flex flex-row items-center gap-5">
                <div className="contato-info-icone w-12 h-12 rounded-full bg-orange flex items-center justify-center shrink-0">
                  <span className="text-xl">📸</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-cmas-play text-brown text-lg">
                    Instagram
                  </span>
                  <span className="text-body font-medium text-sm">
                    @canilaltabelavista
                  </span>
                  <span className="text-body/50 text-xs font-medium">
                    Fotos e novidades dos filhotes
                  </span>
                </div>
              </div>

              <div className="contato-info-card glass-brown rounded-2xl p-6 flex flex-row items-center gap-5">
                <div className="contato-info-icone w-12 h-12 rounded-full bg-orange flex items-center justify-center shrink-0">
                  <span className="text-xl">🎵</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="font-cmas-play text-brown text-lg">
                    TikTok
                  </span>
                  <span className="text-body font-medium text-sm">
                    @canilaltabelavista
                  </span>
                  <span className="text-body/50 text-xs font-medium">
                    Vídeos e momentos especiais
                  </span>
                </div>
              </div>
            </div>

            <div className="contato-horario glass-brown rounded-2xl p-6 flex flex-col gap-3">
              <h3 className="font-cmas-play text-brown text-xl">
                Horario de atendimento
              </h3>
              <div className="flex flex-row justify-between">
                <span className="text-body font-medium text-sm">
                  Segunda a Sexta
                </span>
                <span className="text-orange font-semibold text-sm">
                  08h às 18h
                </span>
              </div>
              <div className="border-t border-brown/10"></div>
              <div className="flex flex-row justify-between">
                <span className="text-body font-medium text-sm">Sábado</span>
                <span className="text-orange font-semibold text-sm">
                  08h às 14h
                </span>
              </div>
              <div className="border-t border-brown/10"></div>
              <div className="flex flex-row justify-between">
                <span className="text-body font-medium text-sm">Domingo</span>
                <span className="text-orange font-semibold text-sm">
                  Fechado
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
