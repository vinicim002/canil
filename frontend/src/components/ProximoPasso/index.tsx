import { motion } from "framer-motion";
import pataImg from "../../assets/pata.png";

export function ProximoPasso() {
  return (
    <section className="section-proximo-passo relative bg-gradient-brown py-16 md:py-20 lg:py-28 overflow-hidden">
      {/* Decorative Patas */}
      <motion.div
        className="proximo-passo-decoracao-pata-topo absolute right-[5%] md:right-[3%] lg:right-[5%] -top-[10%] md:-top-[8%] lg:-top-[5%] w-[250px] md:w-[350px] lg:w-[400px] h-[250px] md:h-[350px] lg:h-[400px] z-0"
        initial={{ opacity: 0, scale: 0.8, rotate: 280 }}
        whileInView={{ opacity: 0.8, scale: 1, rotate: 320 }}
        animate={{ y: [0, 20, 0] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          default: { duration: 0.8 },
          y: {
            duration: 4,
            repeat: Infinity,
          },
        }}
      >
        <img
          src={pataImg}
          className="w-full h-full object-contain"
          alt="Pata decorativa"
        />
      </motion.div>

      <motion.div
        className="proximo-passo-decoracao-pata-base absolute right-[-5%] md:right-[-8%] lg:right-[-8%] -bottom-[15%] md:-bottom-[18%] lg:-bottom-[20%] w-[250px] md:w-[350px] lg:w-[400px] h-[250px] md:h-[350px] lg:h-[400px] z-0"
        initial={{ opacity: 0, scale: 0.8, rotate: 280 }}
        whileInView={{ opacity: 0.8, scale: 1, rotate: 320 }}
        animate={{ y: [0, 20, 0] }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          default: { duration: 0.8 },
          y: {
            duration: 4,
            delay: 0.3,
            repeat: Infinity,
          },
        }}
      >
        <img
          src={pataImg}
          className="w-full h-full object-contain"
          alt="Pata decorativa"
        />
      </motion.div>

      {/* Content */}
      <motion.div
        className="proximo-passo-inner px-6 md:px-12 lg:px-36 flex flex-col items-center justify-center gap-6 md:gap-8 relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <div className="proximo-passo-header flex flex-col justify-center items-center gap-4 text-center">
          <motion.h3
            className="font-cmas-play text-orange text-2xl md:text-3xl lg:text-3xl font-bold uppercase tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Pronto para dar o proximo passo?
          </motion.h3>

          <motion.h2
            className="font-cmas-play text-white text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Seu novo <br className="hidden md:block" /> melhor amigo{" "}
            <br className="hidden md:block" /> esta{" "}
            <span className="text-orange">esperando por voce</span>
          </motion.h2>

          <motion.p
            className="proximo-passo-descricao text-white/90 w-full md:w-3/4 lg:w-1/2 text-sm md:text-base font-medium leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Entre em contato agora e descubra o filhote perfeito para sua
            família. Respondemos rapidamente pelo WhatsApp.
          </motion.p>
        </div>

        {/* Actions */}
        <motion.div
          className="proximo-passo-acoes flex flex-col sm:flex-row items-center gap-4 md:gap-6 mt-8 md:mt-12 w-full sm:w-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.a
            href="https://wa.me/YOUR_PHONE_NUMBER"
            target="_blank"
            rel="noopener noreferrer"
            className="proximo-passo-btn-whatsapp w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-full cursor-pointer text-center transition-colors duration-300 shadow-lg flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span>💬</span>
            <span>WhatsApp</span>
          </motion.a>

          <motion.button
            className="proximo-passo-btn-filhotes w-full sm:w-auto bg-white hover:bg-orange/10 text-brown font-bold py-3 md:py-4 px-6 md:px-8 rounded-full cursor-pointer border-2 border-white transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            🐾 Ver Filhotes
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
