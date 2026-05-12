import { useState } from "react";
import { Link } from "react-router-dom";

type Secao =
  | "reserva"
  | "pagamentos"
  | "documentos"
  | "vacinacao"
  | "comunicacao";

export function ClientePage() {
  const [secaoAtiva, setSecaoAtiva] = useState<Secao>("reserva");

  const secoes = [
    { id: "reserva", label: "Minha Reserva", icon: "📋" },
    { id: "pagamentos", label: "Pagamentos", icon: "💳" },
    { id: "documentos", label: "Documentos", icon: "📄" },
    { id: "vacinacao", label: "Vacinação", icon: "💉" },
    { id: "comunicacao", label: "Comunicação", icon: "💬" },
  ] as const;

  return (
    <main className="cliente-page pt-32 pb-20 min-h-screen">
      <div className="cliente-page-inner mx-36 flex flex-col gap-10">
        {/* Header */}
        <div className="cliente-header flex flex-row items-center justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-cmas-play text-orange text-xl">
              BEM-VINDO DE VOLTA
            </h3>
            <h1 className="font-cmas-play text-brown text-4xl">
              Olá, Maria Silva 👋
            </h1>
            <p className="text-body/60 font-medium text-sm">
              Acompanhe sua reserva e todas as informações do seu filhote aqui.
            </p>
          </div>
          <Link
            to="/"
            className="text-body/50 text-sm font-medium hover:text-brown transition-colors flex items-center gap-2"
          >
            <span>←</span> Voltar ao site
          </Link>
        </div>

        {/* Card do filhote */}
        <div className="cliente-filhote-card bg-brown rounded-2xl p-8 flex flex-row items-center gap-8">
          <div className="w-24 h-24 rounded-2xl bg-orange/30 flex items-center justify-center shrink-0">
            <span className="text-5xl">🐾</span>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-row items-center gap-3">
              <h2 className="font-cmas-play text-white text-3xl">Thor</h2>
              <span className="bg-green-500 text-white text-xs font-medium py-1 px-3 rounded-full">
                Reservado
              </span>
            </div>
            <p className="text-white/60 font-medium text-sm">
              Pelo curto • Miniatura • Nascido em 01/03/2026
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-white/40 text-xs font-medium">
              Reserva #0042
            </span>
            <span className="text-white/40 text-xs font-medium">
              desde 05/05/2026
            </span>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noreferrer"
              className="bg-green-500 text-white font-medium text-sm py-2 px-5 rounded-full hover:bg-green-600 transition-colors mt-1"
            >
              📱 WhatsApp
            </a>
          </div>
        </div>

        {/* Menu de seções */}
        <div className="cliente-menu flex flex-row gap-2 border-b border-brown/10 pb-0">
          {secoes.map((s) => (
            <button
              key={s.id}
              onClick={() => setSecaoAtiva(s.id)}
              className={`flex flex-row items-center gap-2 px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${
                secaoAtiva === s.id
                  ? "border-orange text-brown"
                  : "border-transparent text-body/50 hover:text-brown"
              }`}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>

        {/* Conteúdo das seções */}
        <div className="cliente-conteudo">
          {/* Reserva */}
          {secaoAtiva === "reserva" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-cmas-play text-brown text-2xl">
                Minha Reserva
              </h2>

              <div className="grid grid-cols-3 gap-5">
                {[
                  {
                    label: "Status da reserva",
                    valor: "Confirmada",
                    icon: "✅",
                  },
                  { label: "Valor do sinal", valor: "R$ 500,00", icon: "💰" },
                  { label: "Valor restante", valor: "R$ 2.300,00", icon: "💳" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-white rounded-2xl p-5 border border-brown/10 flex flex-col gap-2"
                  >
                    <span className="text-body/50 text-sm font-medium">
                      {item.label}
                    </span>
                    <div className="flex flex-row items-center gap-2">
                      <span className="text-xl">{item.icon}</span>
                      <span className="font-cmas-play text-brown text-2xl">
                        {item.valor}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-brown/10">
                  <h3 className="font-cmas-play text-brown text-xl">
                    Linha do Tempo
                  </h3>
                </div>
                <div className="px-6 py-4 flex flex-col gap-4">
                  {[
                    {
                      label: "Reserva realizada",
                      data: "05/05/2026",
                      feito: true,
                    },
                    { label: "Sinal pago", data: "05/05/2026", feito: true },
                    {
                      label: "Visita agendada",
                      data: "15/05/2026",
                      feito: false,
                    },
                    {
                      label: "Pagamento final",
                      data: "20/05/2026",
                      feito: false,
                    },
                    {
                      label: "Entrega do filhote",
                      data: "25/05/2026",
                      feito: false,
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-row items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.feito ? "bg-green-500" : "bg-brown/10"}`}
                      >
                        <span className="text-xs">
                          {item.feito ? "✓" : "○"}
                        </span>
                      </div>
                      <div className="flex flex-row items-center justify-between flex-1">
                        <span
                          className={`text-sm font-medium ${item.feito ? "text-brown" : "text-body/50"}`}
                        >
                          {item.label}
                        </span>
                        <span className="text-body/40 text-xs font-medium">
                          {item.data}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Pagamentos */}
          {secaoAtiva === "pagamentos" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-cmas-play text-brown text-2xl">Pagamentos</h2>

              <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-brown/10 flex flex-row justify-between items-center">
                  <h3 className="font-cmas-play text-brown text-xl">
                    Histórico
                  </h3>
                  <span className="text-body/50 text-sm font-medium">
                    Total: R$ 2.800,00
                  </span>
                </div>
                <div className="flex flex-col">
                  {[
                    {
                      descricao: "Sinal de reserva",
                      valor: "R$ 500,00",
                      status: "PAGO",
                      data: "05/05/2026",
                      tipo: "PIX",
                    },
                    {
                      descricao: "Pagamento complementar",
                      valor: "R$ 2.300,00",
                      status: "PENDENTE",
                      data: "20/05/2026",
                      tipo: "—",
                    },
                  ].map((p, i) => (
                    <div
                      key={i}
                      className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
                    >
                      <div className="flex flex-col gap-0.5">
                        <span className="text-brown font-medium text-sm">
                          {p.descricao}
                        </span>
                        <span className="text-body/50 text-xs">
                          {p.data} · {p.tipo}
                        </span>
                      </div>
                      <div className="flex flex-row items-center gap-4">
                        <span className="font-cmas-play text-brown text-lg">
                          {p.valor}
                        </span>
                        <span
                          className={`text-xs font-medium py-1 px-3 rounded-full ${p.status === "PAGO" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-brown rounded-2xl p-6 flex flex-row items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-cmas-play text-brown text-xl">
                    Pagar saldo restante
                  </span>
                  <span className="text-body/60 text-sm font-medium">
                    R$ 2.300,00 — vencimento 20/05/2026
                  </span>
                </div>
                <button className="bg-brown text-white font-medium py-3 px-6 rounded-full hover:bg-orange transition-colors cursor-pointer">
                  Pagar agora
                </button>
              </div>
            </div>
          )}

          {/* Documentos */}
          {secaoAtiva === "documentos" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-cmas-play text-brown text-2xl">Documentos</h2>

              <div className="grid grid-cols-3 gap-5">
                {[
                  {
                    nome: "Contrato de compra",
                    status: "Disponível",
                    icon: "📄",
                  },
                  {
                    nome: "Pedigree",
                    status: "Disponível após pagamento",
                    icon: "🏅",
                  },
                  {
                    nome: "Carteira de vacinação",
                    status: "Disponível",
                    icon: "💉",
                  },
                  {
                    nome: "Termo de garantia",
                    status: "Disponível",
                    icon: "✅",
                  },
                  {
                    nome: "Orientações pós-venda",
                    status: "Disponível",
                    icon: "📘",
                  },
                  {
                    nome: "Nota fiscal",
                    status: "Disponível após pagamento",
                    icon: "🧾",
                  },
                ].map((doc) => (
                  <div
                    key={doc.nome}
                    className="bg-white rounded-2xl p-5 border border-brown/10 flex flex-col gap-4"
                  >
                    <div className="flex flex-row items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-brown/10 flex items-center justify-center shrink-0">
                        <span className="text-xl">{doc.icon}</span>
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-brown font-medium text-sm">
                          {doc.nome}
                        </span>
                        <span className="text-body/50 text-xs">
                          {doc.status}
                        </span>
                      </div>
                    </div>
                    <button
                      disabled={doc.status !== "Disponível"}
                      className={`w-full py-2 rounded-full text-sm font-medium transition-colors ${
                        doc.status === "Disponível"
                          ? "bg-brown text-white hover:bg-orange cursor-pointer"
                          : "bg-brown/10 text-brown/30 cursor-not-allowed"
                      }`}
                    >
                      {doc.status === "Disponível" ? "Baixar" : "Indisponível"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Vacinação */}
          {secaoAtiva === "vacinacao" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-cmas-play text-brown text-2xl">
                Carteira de Vacinação
              </h2>

              <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-brown/10">
                  <h3 className="font-cmas-play text-brown text-xl">
                    Vacinas de Thor
                  </h3>
                </div>
                <div className="flex flex-col">
                  {[
                    {
                      vacina: "V10 — Múltipla",
                      data: "15/03/2026",
                      proxima: "15/06/2026",
                      lote: "A123",
                      status: "OK",
                    },
                    {
                      vacina: "Antirrábica",
                      data: "15/03/2026",
                      proxima: "15/03/2027",
                      lote: "B456",
                      status: "OK",
                    },
                    {
                      vacina: "Giárdia",
                      data: "20/03/2026",
                      proxima: "20/06/2026",
                      lote: "C789",
                      status: "OK",
                    },
                    {
                      vacina: "V10 — Reforço",
                      data: "—",
                      proxima: "15/06/2026",
                      lote: "—",
                      status: "PENDENTE",
                    },
                  ].map((v, i) => (
                    <div
                      key={i}
                      className="flex flex-row items-center justify-between px-6 py-4 border-b border-brown/5 last:border-0 hover:bg-cream/50 transition-colors"
                    >
                      <div className="flex flex-row items-center gap-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${v.status === "OK" ? "bg-green-100" : "bg-yellow-100"}`}
                        >
                          <span className="text-sm">
                            {v.status === "OK" ? "✓" : "!"}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-brown font-medium text-sm">
                            {v.vacina}
                          </span>
                          <span className="text-body/50 text-xs">
                            Lote: {v.lote}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-row items-center gap-8">
                        <div className="flex flex-col gap-0.5 text-right">
                          <span className="text-body/50 text-xs">
                            Aplicada em
                          </span>
                          <span className="text-brown font-medium text-sm">
                            {v.data}
                          </span>
                        </div>
                        <div className="flex flex-col gap-0.5 text-right">
                          <span className="text-body/50 text-xs">
                            Próxima dose
                          </span>
                          <span className="text-orange font-medium text-sm">
                            {v.proxima}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Comunicação */}
          {secaoAtiva === "comunicacao" && (
            <div className="flex flex-col gap-6">
              <h2 className="font-cmas-play text-brown text-2xl">
                Comunicação
              </h2>

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
                    <span className="font-cmas-play text-white text-xl">
                      WhatsApp
                    </span>
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
                    <span className="font-cmas-play text-white text-xl">
                      E-mail
                    </span>
                    <span className="text-white/70 text-sm font-medium">
                      contato@canilaltabelavista.com.br
                    </span>
                  </div>
                </a>
              </div>

              <div className="bg-white rounded-2xl border border-brown/10 overflow-hidden">
                <div className="px-6 py-4 border-b border-brown/10">
                  <h3 className="font-cmas-play text-brown text-xl">
                    Mensagens
                  </h3>
                </div>
                <div className="flex flex-col gap-4 p-6">
                  {[
                    {
                      de: "Canil",
                      mensagem:
                        "Olá Maria! O Thor está se desenvolvendo muito bem. Segue foto atualizada 🐾",
                      data: "05/05/2026",
                    },
                    {
                      de: "Canil",
                      mensagem:
                        "Sua reserva foi confirmada com sucesso! Qualquer dúvida estamos à disposição.",
                      data: "05/05/2026",
                    },
                  ].map((msg, i) => (
                    <div key={i} className="flex flex-col gap-1">
                      <div className="flex flex-row items-center justify-between">
                        <span className="text-orange font-semibold text-xs">
                          {msg.de}
                        </span>
                        <span className="text-body/40 text-xs">{msg.data}</span>
                      </div>
                      <div className="bg-cream rounded-xl px-4 py-3">
                        <p className="text-body font-medium text-sm">
                          {msg.mensagem}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
