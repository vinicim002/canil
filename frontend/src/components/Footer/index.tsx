import { motion } from "framer-motion";
import logoBrancaImg from "../../assets/logoBranca.png";

export function Footer() {
  // Variantes para animação de entrada
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="section-footer relative py-12 md:py-20 overflow-hidden bg-brown border-t border-white/5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="footer-inner px-6 md:px-12 lg:px-36 flex flex-col md:flex-row items-start justify-between gap-12 md:gap-8 lg:gap-12"
      >
        {/* Marca / Sobre */}
        <motion.div
          variants={itemVariants}
          className="footer-marca flex flex-col gap-4 w-full md:w-1/3"
        >
          <div className="footer-marca-header flex flex-row items-center gap-3">
            <div className="footer-logo w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange shrink-0 overflow-hidden flex items-center justify-center">
              <img
                src={logoBrancaImg}
                alt="Logo Canil"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-cmas-play text-white text-lg md:text-xl">
              Canil Alto da Bela Vista
            </span>
          </div>
          <p className="text-white/70 text-sm font-medium leading-relaxed">
            Canil especializado em Dachshunds desde 2011. Criamos com amor,
            responsabilidade e total transparência para famílias que merecem o
            melhor.
          </p>
        </motion.div>

        {/* Links: Navegar */}
        <motion.div
          variants={itemVariants}
          className="footer-navegar flex flex-col gap-4 min-w-[120px]"
        >
          <h4 className="font-cmas-play text-orange text-lg md:text-xl uppercase tracking-wider">
            Navegar
          </h4>
          <ul className="flex flex-col gap-2">
            {["Sobre o canil", "Nossos cães", "Cuidados", "Entrega"].map(
              (item) => (
                <li
                  key={item}
                  className="text-white/60 text-sm font-medium cursor-pointer hover:text-orange hover:translate-x-1 transition-all duration-300"
                >
                  {item}
                </li>
              ),
            )}
          </ul>
        </motion.div>

        {/* Links: Informações */}
        <motion.div
          variants={itemVariants}
          className="footer-informacoes flex flex-col gap-4 min-w-[150px]"
        >
          <h4 className="font-cmas-play text-orange text-lg md:text-xl uppercase tracking-wider">
            Informações
          </h4>
          <ul className="flex flex-col gap-2">
            {[
              "Perguntas Frequentes",
              "Reservar filhote",
              "Política de garantia",
              "Contrato de compra",
            ].map((item) => (
              <li
                key={item}
                className="text-white/60 text-sm font-medium cursor-pointer hover:text-orange hover:translate-x-1 transition-all duration-300"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Contato */}
        <motion.div
          variants={itemVariants}
          className="footer-contato flex flex-col gap-4"
        >
          <h4 className="font-cmas-play text-orange text-lg md:text-xl uppercase tracking-wider">
            Contato
          </h4>
          <ul className="flex flex-col gap-3">
            <li className="text-white/70 text-sm font-medium flex flex-col">
              <span className="text-[10px] text-orange/50 uppercase">
                E-mail
              </span>
              contato@canilaltabelavista.com.br
            </li>
            <li className="text-white/70 text-sm font-medium flex flex-col">
              <span className="text-[10px] text-orange/50 uppercase">
                Telefone
              </span>
              (11) 99999-9999
            </li>
            <li className="flex gap-4 mt-1">
              {/* Espaço para ícones sociais se desejar */}
              <span className="text-white/60 text-sm font-medium cursor-pointer hover:text-white transition-colors">
                @canilaltabelavista
              </span>
            </li>
          </ul>
        </motion.div>
      </motion.div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="footer-rodape px-6 md:px-36 mt-12 md:mt-16 pt-6 border-t border-white/10"
      >
        <p className="text-white/30 text-[12px] md:text-sm text-center font-medium tracking-wide">
          © 2026 CANIL ALTO DA BELA VISTA. TODOS OS DIREITOS RESERVADOS.
        </p>
      </motion.div>
    </footer>
  );
}
