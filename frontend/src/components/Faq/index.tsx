import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import salsichaDeOculos from "../../assets/salsichaDeoculos.png";

const faqs = [
  {
    question: "Com quantas semanas o filhote vai para casa?",
    answer:
      "Nossos filhotes são liberados a partir das 8 a 10 semanas, após receberem as primeiras doses da vacina e passarem por uma avaliação veterinária completa para garantir que estão prontos para o novo lar.",
  },
  {
    question: "O filhote já vai vacinado e vermifugado?",
    answer:
      "Sim! Todos os filhotes são entregues com o ciclo de vermifugação em dia e com as doses da vacina V10 (Importada) correspondentes à idade do animal.",
  },
  {
    question: "Vocês entregam em outros estados?",
    answer:
      "Sim, realizamos entregas em todo o Brasil via transporte aéreo especializado, garantindo que o filhote chegue com segurança e o menor estresse possível.",
  },
  {
    question: "Como funciona a reserva do filhote?",
    answer:
      "A reserva é feita mediante um contrato de compra e venda e um sinal. Assim que o filhote atinge a idade de liberação, o restante do pagamento é efetuado e agendamos a entrega.",
  },
  {
    question: "Os filhotes possuem Pedigree?",
    answer:
      "Com certeza. Todos os nossos exemplares possuem Pedigree, garantindo a pureza da raça e a linhagem de excelência do Canil Alto da Bela Vista.",
  },
];

export function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="section-faq px-6 md:px-12 lg:px-36 py-16 md:py-20 flex flex-col lg:flex-row items-stretch lg:items-start justify-between gap-8 lg:gap-16 overflow-hidden">
      {/* Lado Esquerdo - Header e Imagem */}
      <motion.div
        className="faq-esquerda flex flex-col gap-6 md:gap-8 w-full lg:w-1/2"
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="faq-header flex flex-col gap-3 text-center lg:text-left">
          <motion.h3
            className="text-sm font-black tracking-[0.3em] text-orange uppercase"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            FAQ
          </motion.h3>
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl text-brown font-cmas-play font-bold"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Perguntas Frequentes
          </motion.h2>
          <motion.p
            className="text-body/70 text-sm md:text-base lg:text-lg font-medium max-w-md mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Respondemos com transparência tudo o que você precisa saber antes de
            levar seu novo companheiro para casa.
          </motion.p>
        </div>

        {/* Imagem com Animação - Posicionamento Preciso */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 lg:top-[100px] flex items-end justify-center">
          <motion.img
            src={salsichaDeOculos}
            className="h-full w-auto object-contain max-w-full"
            alt="Dachshund de óculos estiloso"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            animate={{ y: [0, -15, 0] }}
            viewport={{ once: true }}
            transition={{
              scale: { duration: 0.6 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          />
        </div>
      </motion.div>

      {/* Lado Direito - Acordeão */}
      <motion.div
        className="faq-direita w-full lg:w-1/2 flex flex-col gap-3 md:gap-4"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="faq-item flex flex-col group border-b border-orange/20 last:border-b-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <button
              onClick={() =>
                setActiveIndex(activeIndex === index ? null : index)
              }
              className="faq-item-header flex flex-row items-center justify-between gap-3 md:gap-4 py-4 md:py-5 text-left cursor-pointer transition-all hover:opacity-80"
            >
              <p
                className={`font-bold text-sm md:text-base lg:text-lg transition-colors duration-300 flex-1 ${activeIndex === index ? "text-orange" : "text-brown"}`}
              >
                {faq.question}
              </p>
              <motion.div
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${activeIndex === index ? "bg-orange" : "bg-brown/10 group-hover:bg-brown/20"}`}
                animate={{ rotate: activeIndex === index ? 180 : 0 }}
              >
                {activeIndex === index ? (
                  <Minus className="text-white" size={20} />
                ) : (
                  <Plus
                    className={`${activeIndex === index ? "text-white" : "text-brown"}`}
                    size={20}
                  />
                )}
              </motion.div>
            </button>

            {/* Conteúdo Expansível */}
            <AnimatePresence mode="wait">
              {activeIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-4 md:pb-6 text-body/70 text-sm md:text-base leading-relaxed font-medium pr-4 md:pr-10">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
