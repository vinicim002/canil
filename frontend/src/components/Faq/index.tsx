import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { faqService } from "../../services/faqService/faqService"; // ✅ Atualizado para o serviço em fetch
import type { FaqResponse } from "../../services/faqService/faqResponse"; // ✅ Tipagem importada
import salsichaDeOculos from "../../assets/salsichaDeoculos.png";

export function Faq() {
  const [faqs, setFaqs] = useState<FaqResponse[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Alterado de number para string para usar o ID estável do banco de dados
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    async function carregarFaqsPublicas() {
      try {
        setLoading(true);
        // ✅ Consome a rota nativa de ativos que criamos no fetchService
        const data = await faqService.listarAtivos();

        if (Array.isArray(data)) {
          // Apenas ordena pelo critério definido no painel do administrador
          const faqsOrdenadas = data.sort((a, b) => a.ordem - b.ordem);
          setFaqs(faqsOrdenadas);
        }
      } catch (error) {
        console.error("Erro ao carregar o FAQ na Home:", error);
      } finally {
        setLoading(false);
      }
    }

    carregarFaqsPublicas();
  }, []);

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

        {/* Imagem com Animação */}
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

      {/* Lado Direito - Acordeão Dinâmico */}
      <motion.div
        className="faq-direita w-full lg:w-1/2 flex flex-col gap-3 md:gap-4 justify-center"
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        {loading ? (
          <div className="text-center py-10 text-brown/40 font-bold uppercase tracking-widest text-xs">
            🐾 Carregando perguntas...
          </div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-10 text-brown/40 font-bold uppercase tracking-widest text-xs">
            Nenhuma pergunta disponível.
          </div>
        ) : (
          faqs.map((faq, index) => {
            const isOpen = activeId === faq.id;

            return (
              <motion.div
                key={faq.id}
                className="faq-item flex flex-col group border-b border-orange/20 last:border-b-0"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? null : faq.id)}
                  className="faq-item-header flex flex-row items-center justify-between gap-3 md:gap-4 py-4 md:py-5 text-left cursor-pointer transition-all hover:opacity-80"
                >
                  <p
                    className={`font-bold text-sm md:text-base lg:text-lg transition-colors duration-300 flex-1 ${
                      isOpen ? "text-orange" : "text-brown"
                    }`}
                  >
                    {faq.pergunta}
                  </p>
                  <motion.div
                    className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-orange"
                        : "bg-brown/10 group-hover:bg-brown/20"
                    }`}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                  >
                    {isOpen ? (
                      <Minus className="text-white" size={20} />
                    ) : (
                      <Plus
                        className={`${isOpen ? "text-white" : "text-brown"}`}
                        size={20}
                      />
                    )}
                  </motion.div>
                </button>

                {/* Conteúdo Expansível controlado pelo ID único */}
                <AnimatePresence mode="wait">
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-4 md:pb-6 text-body/70 text-sm md:text-base leading-relaxed font-medium pr-4 md:pr-10">
                        {faq.resposta}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </motion.div>
    </section>
  );
}
