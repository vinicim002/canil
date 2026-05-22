import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  dataMaximaAgendamento,
  dataMinimaAgendamento,
  formatarDataHoraVisita,
  formatarHorarioSlot,
  useVisitaGestao,
} from "../../hooks/useVisitaGestao";

const inputClass =
  "w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-6 text-brown font-bold text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
} as const;

const statusClass: Record<string, string> = {
  PENDENTE: "bg-amber-50 text-amber-800 border-amber-200",
  CONFIRMADO: "bg-green-50 text-green-800 border-green-200",
  REAGENDADO: "bg-blue-50 text-blue-800 border-blue-200",
  CANCELADO: "bg-red-50 text-red-800 border-red-200",
  REALIZADO: "bg-brown/10 text-brown border-brown/20",
  AUSENTE: "bg-gray-50 text-gray-700 border-gray-200",
};

export function AgendamentoGestaoPage() {
  const { token } = useParams<{ token: string }>();
  const {
    visita,
    carregando,
    erro,
    modo,
    podeAlterar,
    dataSelecionada,
    setDataSelecionada,
    slotSelecionado,
    setSlotSelecionado,
    slots,
    carregandoSlots,
    erroSlots,
    observacoes,
    setObservacoes,
    salvando,
    sucesso,
    statusLabel,
    iniciarReagendamento,
    iniciarCancelamento,
    voltarVisualizar,
    confirmarReagendamento,
    confirmarCancelamento,
  } = useVisitaGestao(token);

  if (carregando) {
    return (
      <main className="pt-32 pb-20 flex justify-center">
        <Loader2 className="animate-spin text-orange" size={40} />
      </main>
    );
  }

  if (!visita) {
    return (
      <main className="pt-32 pb-20 px-4 max-w-lg mx-auto text-center flex flex-col gap-6">
        <AlertCircle className="mx-auto text-red-500" size={48} />
        <p className="text-brown font-medium">{erro || "Agendamento não encontrado."}</p>
        <Link to="/" className="text-orange font-bold uppercase tracking-widest text-sm">
          Voltar ao início
        </Link>
      </main>
    );
  }

  return (
    <main className="agendamento-gestao-page pt-32 pb-20 bg-cream/20">
      <div className="max-w-[700px] mx-auto px-4 md:px-8 flex flex-col gap-8">
        <motion.header {...fadeInUp} className="text-center flex flex-col gap-3">
          <h3 className="font-black tracking-[0.4em] text-orange text-sm uppercase">
            Seu agendamento
          </h3>
          <h1 className="font-cmas-play text-brown text-4xl md:text-5xl font-bold uppercase">
            Gerenciar visita
          </h1>
        </motion.header>

        {sucesso && (
          <motion.div
            {...fadeInUp}
            className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-2xl px-5 py-4 text-sm font-medium"
          >
            <CheckCircle size={20} className="shrink-0" />
            {sucesso}
          </motion.div>
        )}

        {erro && modo !== "visualizar" && (
          <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm font-medium">
            <AlertCircle size={20} className="shrink-0" />
            {erro}
          </div>
        )}

        <motion.div
          {...fadeInUp}
          className="bg-white rounded-[3rem] p-8 md:p-10 shadow-xl shadow-brown/5 flex flex-col gap-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span
              className={`text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full border ${
                statusClass[visita.status] ?? statusClass.PENDENTE
              }`}
            >
              {statusLabel}
            </span>
            {modo !== "visualizar" && (
              <button
                type="button"
                onClick={voltarVisualizar}
                className="text-sm font-bold text-brown/60 hover:text-orange"
              >
                Voltar
              </button>
            )}
          </div>

          {modo === "visualizar" && (
            <>
              <div className="flex flex-col gap-4 text-brown">
                <Info label="Nome" valor={visita.nome} />
                <Info label="Data e horário" valor={formatarDataHoraVisita(visita.dataHora)} />
                <Info label="Telefone" valor={formatarTelefone(visita.telefone)} />
                <Info label="E-mail" valor={visita.email} />
                {visita.observacoes && (
                  <Info label="Observações" valor={visita.observacoes} />
                )}
              </div>

              {podeAlterar && (
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-brown/10">
                  <button
                    type="button"
                    onClick={iniciarReagendamento}
                    className="flex-1 bg-orange hover:bg-brown text-white font-bold py-3 px-6 rounded-full transition-colors"
                  >
                    Reagendar
                  </button>
                  <button
                    type="button"
                    onClick={iniciarCancelamento}
                    className="flex-1 border-2 border-red-200 text-red-700 hover:bg-red-50 font-bold py-3 px-6 rounded-full transition-colors"
                  >
                    Cancelar visita
                  </button>
                </div>
              )}

              {visita.status === "CANCELADO" && (
                <p className="text-sm text-body/60">
                  Este agendamento foi cancelado. Entre em contato pelo WhatsApp se
                  precisar marcar uma nova visita.
                </p>
              )}
            </>
          )}

          {modo === "reagendar" && (
            <div className="flex flex-col gap-6">
              <p className="text-body/70 text-sm">
                Horário atual:{" "}
                <strong className="text-brown">
                  {formatarDataHoraVisita(visita.dataHora)}
                </strong>
              </p>

              <div className="flex flex-col gap-2">
                <label className="text-brown/60 font-black text-[10px] uppercase tracking-widest px-1">
                  Nova data
                </label>
                <input
                  type="date"
                  min={dataMinimaAgendamento()}
                  max={dataMaximaAgendamento()}
                  value={dataSelecionada}
                  onChange={(e) => setDataSelecionada(e.target.value)}
                  className={inputClass}
                />
              </div>

              {dataSelecionada && (
                <div className="flex flex-col gap-3">
                  {carregandoSlots ? (
                    <div className="flex items-center gap-2 text-brown/60 text-sm">
                      <Loader2 size={18} className="animate-spin" />
                      Carregando horários...
                    </div>
                  ) : (
                    <>
                      {erroSlots && (
                        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                          {erroSlots}
                        </p>
                      )}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {slots.map((slot) => {
                          const ativo = slotSelecionado?.horario === slot.horario;
                          return (
                            <button
                              key={slot.horario}
                              type="button"
                              onClick={() => setSlotSelecionado(slot)}
                              className={`py-3 px-4 rounded-2xl font-bold text-sm border-2 transition-all ${
                                ativo
                                  ? "border-orange bg-orange/10 text-brown"
                                  : "border-brown/10 bg-cream/30 text-brown hover:border-orange/50"
                              }`}
                            >
                              <Clock size={14} className="inline mr-1 text-orange" />
                              {formatarHorarioSlot(slot.horario)}
                            </button>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="obs-reagendar"
                  className="text-brown/60 font-black text-[10px] uppercase tracking-widest px-1"
                >
                  Observações (opcional)
                </label>
                <textarea
                  id="obs-reagendar"
                  rows={2}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className={inputClass}
                />
              </div>

              <button
                type="button"
                disabled={salvando || !slotSelecionado}
                onClick={confirmarReagendamento}
                className="bg-orange hover:bg-brown text-white font-bold py-3 px-8 rounded-full disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {salvando ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Salvando...
                  </>
                ) : (
                  "Confirmar novo horário"
                )}
              </button>
            </div>
          )}

          {modo === "cancelar" && (
            <div className="flex flex-col gap-6 text-center">
              <XCircle className="mx-auto text-red-400" size={48} />
              <p className="text-brown font-medium">
                Tem certeza que deseja cancelar a visita em{" "}
                <strong>{formatarDataHoraVisita(visita.dataHora)}</strong>?
              </p>
              <p className="text-sm text-body/60">
                Esta ação libera o horário para outros visitantes.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={voltarVisualizar}
                  className="flex-1 border-2 border-brown/20 text-brown font-bold py-3 rounded-full"
                >
                  Manter agendamento
                </button>
                <button
                  type="button"
                  disabled={salvando}
                  onClick={confirmarCancelamento}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {salvando ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    "Sim, cancelar"
                  )}
                </button>
              </div>
            </div>
          )}
        </motion.div>

        <p className="text-center text-xs text-body/50">
          Guarde este link para acessar seu agendamento a qualquer momento.
        </p>
      </div>
    </main>
  );
}

function Info({ label, valor }: { label: string; valor: string }) {
  return (
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest text-brown/50">
        {label}
      </p>
      <p className="font-semibold text-brown text-lg">{valor}</p>
    </div>
  );
}

function formatarTelefone(tel: string): string {
  const d = tel.replace(/\D/g, "");
  if (d.length === 11) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  }
  if (d.length === 10) {
    return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  }
  return tel;
}
