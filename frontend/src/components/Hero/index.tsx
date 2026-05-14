import { motion } from "framer-motion";
import dogImg from "../../assets/img-banner-dachshund.png";
import coracaoImg from "../../assets/coracao.png";

export function Hero() {
  return (
    <section className="hero relative bg-cream h-screen flex flex-col items-center justify-start pt-20 md:justify-center md:pt-0 overflow-hidden">
      
      {/* Informações de Texto */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hero-info relative flex flex-col items-center gap-4 md:gap-6 text-center z-30 px-4"
      >
        <span className="text-orange font-bold tracking-[0.3em] text-xs md:text-sm uppercase">
          Desde 2011
        </span>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-cmas-play text-brown leading-tight">
          CANIL ALTO DA <br className="hidden md:block" /> BELA VISTA
        </h1>
        <h2 className="text-xl md:text-3xl font-medium text-brown/80 tracking-wide">
          Excelência na criação de Dachshund
        </h2>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 bg-brown text-white py-4 px-10 rounded-full cursor-pointer font-bold text-sm md:text-base shadow-xl shadow-brown/20 hover:bg-orange transition-all duration-300"
        >
          VER FILHOTES DISPONÍVEIS
        </motion.button>
      </motion.div>

      {/* Container da Imagem e Elementos Flutuantes */}
      <div className="absolute bottom-0 w-full max-w-[1200px] aspect-[16/9] flex justify-center items-end">
        
        {/* Círculos de Fundo (Abstratos) */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[20%] -left-[10%] w-[40vw] h-[40vw] max-w-[500px] rounded-full bg-orange/20 blur-3xl" 
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
            className="absolute top-[10%] -right-[5%] w-[35vw] h-[35vw] max-w-[450px] rounded-full bg-orange/30 blur-3xl" 
          />
        </div>

        {/* Corações Animados */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          {[
            { id: 1, bottom: "45%", left: "15%", size: "8%", delay: 0 },
            { id: 2, bottom: "55%", left: "30%", size: "6%", delay: 0.5 },
            { id: 3, bottom: "40%", left: "70%", size: "7%", delay: 1 },
            { id: 4, bottom: "60%", left: "85%", size: "5%", delay: 1.5 },
          ].map((heart) => (
            <motion.img
              key={heart.id}
              src={coracaoImg}
              style={{ bottom: heart.bottom, left: heart.left, width: heart.size }}
              className="absolute drop-shadow-md"
              animate={{ 
                y: [0, -20, 0],
                rotate: [-5, 5, -5]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                delay: heart.delay,
                ease: "easeInOut" 
              }}
            />
          ))}
        </div>

        {/* Cachorro Principal */}
        <motion.img
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          src={dogImg}
          className="relative z-10 w-[90%] md:w-full max-h-[70vh] object-contain select-none pointer-events-none"
          alt="Dachshund do Canil Alto da Bela Vista"
        />
      </div>

      {/* Overlay de gradiente para suavizar a base */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-cream to-transparent z-20" />
    </section>
  );
}