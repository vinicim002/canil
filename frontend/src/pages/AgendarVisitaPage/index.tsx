import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Loader2,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAgendarVisita } from "../../hooks/useAgendarVisita";

const inputClass =
  "w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-6 text-brown font-bold text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all";
const inputErrorClass =
  "w-full bg-cream/50 border border-red-300 rounded-2xl py-4 px-6 text-brown font-bold text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
} as const;

function formatarHorario(horario: string): string {
  const [h, m] = horario.split(":");
  return `${h}h${m !== "00" ? m : ""}`;
}

export function AgendarVisitaPage() {
  const {
    form,
    erros,
    dataSelecionada,
    dataMinima,
    dataMaxima,
    slots,
    slotSelecionado,
    carregandoSlots,
    carregandoEnvio,
    erroSlots,
    erroGeral,
    visitaCriada,
    atualizar,
    selecionarData,
    selecionarSlot,
    enviar,
  } = useAgendarVisita();

  const [linkCopiado, setLinkCopiado] = useState(false);

  async function copiarLink() {
    if (!visitaCriada?.linkGerenciamento) return;
    await navigator.clipboard.writeText(visitaCriada.linkGerenciamento);
    setLinkCopiado(true);
    setTimeout(() => setLinkCopiado(false), 2500);
  }

  return (
    <main className="agendar-visita-page pt-32 pb-20 bg-cream/20">
      <div className="max-w-[900px] mx-auto px-4 md:px-8 flex flex-col gap-12">
        <motion.header {...fadeInUp} className="text-center flex flex-col gap-4">
          <h3 className="font-black tracking-[0.4em] text-orange text-sm uppercase">
            Visite o canil
          </h3>
          <h1 className="font-cmas-play text-brown text-5xl md:text-7xl font-bold uppercase leading-none">
            Agendar visita
          </h1>
          <p className="text-body/70 font-medium text-lg max-w-xl mx-auto">
            Escolha data e horário sem precisar criar conta. Você receberá um
            link exclusivo para gerenciar seu agendamento.
          </p>
        </motion.header>

        {visitaCriada ? (
          <motion.div
            {...fadeInUp}
            className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-brown/5 flex flex-col gap-6"
          >
            <div className="flex items-center gap-3 text-green-800 bg-green-50 border border-green-200 rounded-2xl px-5 py-4">
              <CheckCircle className="shrink-0" />
              <p className="font-medium text-sm">
                Visita agendada com sucesso! Guarde o link abaixo para alterar
                ou cancelar depois.
              </p>
            </div>
            <div className="flex flex-col gap-2 text-brown">
              <p className="text-sm font-bold uppercase tracking-widest text-brown/50">
                Seu link de acesso
              </p>
              <a
                href={visitaCriada.linkGerenciamento}
                className="text-orange font-semibold break-all hover:underline"
              >
                {visitaCriada.linkGerenciamento}
              </a>
            </div>
            <button
              type="button"
              onClick={copiarLink}
              className="inline-flex items-center justify-center gap-2 self-start bg-brown text-white font-bold py-3 px-6 rounded-full hover:bg-orange transition-colors"
            >
              <Copy size={18} />
              {linkCopiado ? "Copiado!" : "Copiar link"}
            </button>
            <p className="text-sm text-body/60">
              Você também receberá confirmação por WhatsApp e e-mail, quando as
              automações estiverem ativas.
            </p>
            <Link
              to="/"
              className="text-orange font-bold text-sm uppercase tracking-widest hover:underline self-start"
            >
              Voltar ao início
            </Link>
          </motion.div>
        ) : (
          <motion.form
            {...fadeInUp}
            onSubmit={enviar}
            noValidate
            className="bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-brown/5 flex flex-col gap-8"
          >
            {erroGeral && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm font-medium">
                <AlertCircle size={20} className="shrink-0" />
                {erroGeral}
              </div>
            )}

            <section className="flex flex-col gap-4">
              <h2 className="font-cmas-play text-brown text-2xl font-bold uppercase flex items-center gap-2">
                <Calendar size={22} className="text-orange" />
                Data e horário
              </h2>
              <label className="text-brown/60 font-black text-[10px] uppercase tracking-widest px-1">
                Data da visita
              </label>
              <input
                type="date"
                min={dataMinima}
                max={dataMaxima}
                value={dataSelecionada}
                onChange={(e) => selecionarData(e.target.value)}
                className={inputClass}
              />
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
                      {slots.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                          {slots.map((slot) => {
                            const ativo =
                              slotSelecionado?.horario === slot.horario;
                            return (
                              <button
                                key={slot.horario}
                                type="button"
                                onClick={() => selecionarSlot(slot)}
                                className={`py-3 px-4 rounded-2xl font-bold text-sm border-2 transition-all ${
                                  ativo
                                    ? "border-orange bg-orange/10 text-brown"
                                    : "border-brown/10 bg-cream/30 text-brown hover:border-orange/50"
                                }`}
                              >
                                <Clock
                                  size={14}
                                  className="inline mr-1 text-orange"
                                />
                                {formatarHorario(slot.horario)}
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}
            </section>

            <section className="flex flex-col gap-6">
              <h2 className="font-cmas-play text-brown text-2xl font-bold uppercase flex items-center gap-2">
                <MapPin size={22} className="text-orange" />
                Seus dados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Campo
                  id="nome"
                  label="Nome completo"
                  value={form.nome}
                  erro={erros.nome}
                  onChange={(v) => atualizar("nome", v)}
                />
                <Campo
                  id="telefone"
                  label="Telefone (WhatsApp)"
                  tipo="tel"
                  value={form.telefone}
                  erro={erros.telefone}
                  onChange={(v) => atualizar("telefone", v)}
                  placeholder="(00) 00000-0000"
                />
              </div>
              <Campo
                id="email"
                label="E-mail"
                tipo="email"
                value={form.email}
                erro={erros.email}
                onChange={(v) => atualizar("email", v)}
              />
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="observacoes"
                  className="text-brown/60 font-black text-[10px] uppercase tracking-widest px-1"
                >
                  Observações (opcional)
                </label>
                <textarea
                  id="observacoes"
                  rows={3}
                  value={form.observacoes}
                  onChange={(e) => atualizar("observacoes", e.target.value)}
                  className={inputClass}
                  placeholder="Ex.: quantas pessoas virão, interesse em alguma raça..."
                />
              </div>
            </section>

            <button
              type="submit"
              disabled={carregandoEnvio}
              className="w-full md:w-auto self-center bg-orange hover:bg-brown text-white font-black uppercase tracking-widest py-4 px-12 rounded-full transition-all disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {carregandoEnvio ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Agendando...
                </>
              ) : (
                "Confirmar agendamento"
              )}
            </button>
          </motion.form>
        )}
      </div>
    </main>
  );
}

function Campo({
  id,
  label,
  value,
  erro,
  onChange,
  tipo = "text",
  placeholder,
}: {
  id: string;
  label: string;
  value: string;
  erro?: string;
  onChange: (v: string) => void;
  tipo?: string;
  placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-brown/60 font-black text-[10px] uppercase tracking-widest px-1"
      >
        {label}
      </label>
      <input
        id={id}
        type={tipo}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={erro ? inputErrorClass : inputClass}
      />
      {erro && <span className="text-red-600 text-xs font-medium px-1">{erro}</span>}
    </div>
  );
}
