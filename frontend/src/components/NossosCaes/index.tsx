import { motion } from "framer-motion";
import { Beef, Syringe, HeartPulse, Dna, Heart, FileCheck } from "lucide-react";

const diferenciais = [
  {
    title: "Alimentacao Premium",
    description:
      "Alimentação com ração Super Premium (Premier) para garantir saúde e vitalidade máxima aos nossos cães.",
    icon: <Beef size={32} />,
    bg: "bg-brown",
    titleColor: "text-white",
    descColor: "text-cream",
    accent: "bg-orange",
    emoji: "🥩",
  },
  {
    title: "Vacinacao em Dia",
    description:
      "Protocolo sanitário rigoroso. Todos os filhotes saem com carteira de vacinação completa e atualizada.",
    icon: <Syringe size={32} />,
    bg: "bg-orange",
    titleColor: "text-white",
    descColor: "text-white",
    accent: "bg-brown",
    emoji: "💉",
  },
  {
    title: "Acompanhamento Veterinario",
    description:
      "Consultas regulares e suporte de especialistas para garantir o desenvolvimento perfeito da raça.",
    icon: <HeartPulse size={32} />,
    bg: "bg-brown",
    titleColor: "text-white",
    descColor: "text-cream",
    accent: "bg-orange",
    emoji: "🩺",
  },
  {
    title: "Selecao Genetica",
    description:
      "Aperfeiçoamento genético rigoroso focado no padrão oficial da raça e longevidade.",
    icon: <Dna size={32} />,
    bg: "bg-orange",
    titleColor: "text-white",
    descColor: "text-white",
    accent: "bg-brown",
    emoji: "🧬",
  },
  {
    title: "Socializacao Familiar",
    description:
      "Nossos cães são criados dentro de casa, garantindo um temperamento dócil, equilibrado e carinhoso.",
    icon: <Heart size={32} />,
    bg: "bg-brown",
    titleColor: "text-white",
    descColor: "text-cream",
    accent: "bg-orange",
    emoji: "❤️",
  },
  {
    title: "Documentacao Completa",
    description:
      "Pedigree, contrato de compra e venda e garantia de saúde para a sua total tranquilidade.",
    icon: <FileCheck size={32} />,
    bg: "bg-orange",
    titleColor: "text-white",
    descColor: "text-white",
    accent: "bg-brown",
    emoji: "📋",
  },
];

export function NossosCaes() {
  return (
    <section className="relative px-6 md:px-12 lg:px-36 py-20">
      {/* Header */}
      <motion.div
        className="flex flex-col items-center gap-4 text-center mb-32"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3
          className="text-sm font-black tracking-[0.3em] text-orange uppercase"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Qualidade e Amor
        </motion.h3>
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl text-brown font-cmas-play font-bold"
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Como cuidamos dos nossos caes
        </motion.h2>
      </motion.div>

      {/* Sticky Cards Container */}
      <div className="relative h-fit">
        {diferenciais.map((item, index) => (
          <motion.div
            key={index}
            className={`group sticky w-full min-h-[350px] md:min-h-[400px] ${item.bg} rounded-[2.5rem] p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-xl border border-white/10 overflow-hidden`}
            style={{
              top: `${80 + index * 20}px`,
              zIndex: index,
            }}
            initial={{ opacity: 0, y: 100, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ margin: "-100px", once: false }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
          >
            {/* Gradient Background Animado */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />

            {/* Decorative Blur Circles */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />

            {/* Content - Texto */}
            <motion.div
              className="flex-1 flex flex-col gap-6 text-center md:text-left relative z-10"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Icon Box com Emoji */}
              <motion.div
                className={`w-16 h-16 md:w-20 md:h-20 ${item.accent} rounded-2xl flex items-center justify-center text-white mx-auto md:mx-0 shadow-lg relative`}
                whileHover={{ scale: 1.15, rotate: 8 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {item.icon}
                <span className="absolute -top-3 -right-3 text-2xl bg-white rounded-full w-8 h-8 flex items-center justify-center">
                  {item.emoji}
                </span>
              </motion.div>

              {/* Text Content */}
              <div className="flex flex-col gap-3">
                <h4
                  className={`font-cmas-play ${item.titleColor} text-3xl md:text-4xl font-bold leading-tight`}
                >
                  {item.title}
                </h4>
                <p
                  className={`${item.descColor} text-sm md:text-base font-medium leading-relaxed max-w-xl`}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>

            {/* Ilustração Decorativa */}
            <motion.div
              className="flex-1 w-full max-w-sm aspect-video bg-black/5 rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group/illustration"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ margin: "-100px", once: false }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Large Number Background */}
              <div className="text-white/8 font-black text-9xl absolute -bottom-6 -right-6 italic select-none group-hover/illustration:text-white/12 transition-colors duration-300">
                0{index + 1}
              </div>

              {/* Content */}
              <motion.div
                className="flex flex-col items-center gap-3 z-10"
                whileHover={{ scale: 1.1, y: -4 }}
              >
                <motion.span
                  className="text-6xl"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🐾
                </motion.span>
                <span className="text-white/80 text-xs font-black tracking-[0.15em] uppercase bg-black/30 px-4 py-2 rounded-full backdrop-blur-md border border-white/20 group-hover/illustration:bg-black/40 transition-colors duration-300">
                  Alto da Bela Vista
                </span>
              </motion.div>
            </motion.div>

            {/* Border Glow on Hover */}
            <div className="absolute inset-0 rounded-[2.5rem] border border-white/0 group-hover:border-white/20 transition-all duration-300 pointer-events-none" />
          </motion.div>
        ))}
      </div>

      {/* Spacing */}
      <div className="h-40" />
    </section>
  );
}
