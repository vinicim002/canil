import { motion } from "framer-motion";
import { MessageCircle, Mail, Music2, Clock, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { useContatoForm } from "../../hooks/useContatoForm";

const inputClass =
  "w-full bg-cream/50 border border-brown/10 rounded-2xl py-4 px-6 text-brown font-bold text-sm outline-none focus:border-orange focus:ring-2 focus:ring-orange/10 transition-all";
const inputErrorClass =
  "w-full bg-cream/50 border border-red-300 rounded-2xl py-4 px-6 text-brown font-bold text-sm outline-none focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all";

export function ContatoPage() {
  const {
    form,
    erros,
    carregando,
    sucesso,
    erroGeral,
    assuntos,
    atualizar,
    enviar,
  } = useContatoForm();

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
  } as const;

  return (
    <main className="contato-page pt-32 pb-20 bg-cream/20">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-20">
        <motion.header
          {...fadeInUp}
          className="contato-header flex flex-col items-center gap-6 text-center"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-black tracking-[0.4em] text-orange text-sm md:text-base uppercase opacity-90">
              Fale Conosco
            </h3>
            <h1 className="font-cmas-play text-brown text-5xl md:text-8xl font-bold uppercase leading-none">
              Contato
            </h1>
          </div>
          <p className="text-body/70 font-medium text-lg md:text-xl max-w-2xl leading-relaxed">
            Tire suas dúvidas, faça sua reserva ou apenas diga olá. Nossa equipe
            está pronta para te atender com toda a atenção que sua família
            merece.
          </p>
        </motion.header>

        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20">
          <motion.form
            {...fadeInUp}
            className="contato-formulario w-full lg:w-1/2 bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-brown/5 flex flex-col gap-8"
            onSubmit={enviar}
            noValidate
          >
            <div className="flex flex-col gap-2">
              <h2 className="font-cmas-play text-brown text-4xl font-bold uppercase">
                Envie uma mensagem
              </h2>
              <div className="h-1 w-20 bg-orange rounded-full" />
            </div>

            {sucesso && (
              <div className="flex items-center gap-3 bg-green-50 border border-green-200 text-green-800 rounded-2xl px-5 py-4 text-sm font-medium">
                <CheckCircle size={20} className="shrink-0" />
                Mensagem enviada com sucesso! Retornaremos em breve.
              </div>
            )}

            {erroGeral && (
              <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl px-5 py-4 text-sm font-medium">
                <AlertCircle size={20} className="shrink-0" />
                {erroGeral}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Campo
                id="nome"
                label="Nome completo"
                erro={erros.nome}
                value={form.nome}
                onChange={(v) => atualizar("nome", v)}
                placeholder="Seu nome"
              />
              <Campo
                id="email"
                label="E-mail"
                tipo="email"
                erro={erros.email}
                value={form.email}
                onChange={(v) => atualizar("email", v)}
                placeholder="seu@email.com"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Campo
                id="telefone"
                label="Telefone"
                tipo="tel"
                value={form.telefone}
                onChange={(v) => atualizar("telefone", v)}
                placeholder="(00) 00000-0000"
              />
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="assunto"
                  className="text-brown/60 font-black text-[10px] uppercase tracking-widest px-1"
                >
                  Assunto
                </label>
                <select
                  id="assunto"
                  value={form.assunto}
                  onChange={(e) => atualizar("assunto", e.target.value)}
                  className={erros.assunto ? inputErrorClass : `${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="">Selecione um assunto</option>
                  {assuntos.map((a) => (
                    <option key={a} value={a}>
                      {a}
                    </option>
                  ))}
                </select>
                {erros.assunto && (
                  <span className="text-red-500 text-xs font-medium px-1">
                    {erros.assunto}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="mensagem"
                className="text-brown/60 font-black text-[10px] uppercase tracking-widest px-1"
              >
                Mensagem
              </label>
              <textarea
                id="mensagem"
                value={form.mensagem}
                onChange={(e) => atualizar("mensagem", e.target.value)}
                placeholder="Escreva sua mensagem aqui..."
                rows={4}
                className={`${erros.mensagem ? inputErrorClass : inputClass} resize-none`}
              />
              {erros.mensagem && (
                <span className="text-red-500 text-xs font-medium px-1">
                  {erros.mensagem}
                </span>
              )}
            </div>

            <motion.button
              whileHover={carregando ? {} : { scale: 1.02 }}
              whileTap={carregando ? {} : { scale: 0.98 }}
              type="submit"
              disabled={carregando}
              className="bg-brown text-white font-black py-5 px-10 rounded-full cursor-pointer hover:bg-orange transition-all w-full flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs shadow-xl shadow-brown/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {carregando ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Enviar mensagem
                </>
              )}
            </motion.button>
          </motion.form>

          <div className="contato-info w-full lg:w-1/2 flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <h2 className="font-cmas-play text-brown text-4xl font-bold uppercase">
                Informacoes
              </h2>
              <div className="h-1 w-20 bg-orange rounded-full" />
            </div>

            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.1 } },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {[
                {
                  icon: <MessageCircle />,
                  title: "WhatsApp",
                  info: "(00) 00000-0000",
                  sub: "Atendimento imediato",
                },
                {
                  icon: <Mail />,
                  title: "E-mail",
                  info: "contato@canilaltabelavista.com",
                  sub: "Resposta em até 24h",
                },
                {
                  icon: <Music2 />,
                  title: "Instagram",
                  info: "@canilaltabelavista",
                  sub: "Novidades diárias",
                },
                {
                  icon: <Music2 />,
                  title: "TikTok",
                  info: "@canilaltabelavista",
                  sub: "Vídeos especiais",
                },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, x: 20 },
                    show: { opacity: 1, x: 0 },
                  }}
                  className="bg-white border border-brown/5 rounded-[2.5rem] p-8 flex flex-col gap-4 shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-brown group-hover:bg-orange flex items-center justify-center text-white transition-colors duration-500">
                    {card.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-cmas-play text-brown text-2xl font-bold">
                      {card.title}
                    </span>
                    <span className="text-body font-bold text-sm mt-1">
                      {card.info}
                    </span>
                    <span className="text-orange text-[10px] font-black uppercase tracking-widest mt-2 opacity-60">
                      {card.sub}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              {...fadeInUp}
              className="bg-brown rounded-[3rem] p-10 flex flex-col gap-6 shadow-2xl text-white"
            >
              <div className="flex items-center gap-4">
                <Clock className="text-orange" size={28} />
                <h3 className="font-cmas-play text-3xl font-bold uppercase tracking-tight">
                  Horario de Atendimento
                </h3>
              </div>

              <div className="flex flex-col gap-4 mt-2">
                {[
                  { day: "Segunda a Sexta", time: "08h às 18h" },
                  { day: "Sábado", time: "08h às 14h" },
                  { day: "Domingo", time: "Fechado", isClosed: true },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-row justify-between items-center border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    <span className="text-white/60 font-bold text-sm uppercase tracking-widest">
                      {item.day}
                    </span>
                    <span
                      className={`font-black text-sm uppercase tracking-widest ${item.isClosed ? "text-white/20" : "text-orange"}`}
                    >
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}

function Campo({
  id,
  label,
  value,
  onChange,
  placeholder,
  tipo = "text",
  erro,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  tipo?: string;
  erro?: string;
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
      {erro && (
        <span className="text-red-500 text-xs font-medium px-1">{erro}</span>
      )}
    </div>
  );
}
