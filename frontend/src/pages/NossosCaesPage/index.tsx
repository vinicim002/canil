import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DogCard } from "../../components/DogCard";
import type { CaoResponse } from "../../services/caoService/caoResponse";
import { caoService } from "../../services/caoService/caoService";
import type { ImagemResponse } from "../../services/imageService/ImagemResponse";
import { PawPrint, Calendar } from "lucide-react";

export function NossosCaesPage() {
  const [reprodutores, setReprodutores] = useState<CaoResponse[]>([]);
  const [matrizes, setMatrizes] = useState<CaoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await caoService.listarTodos();
        if (Array.isArray(data)) {
          setReprodutores(data.filter((cao) => cao.genero === "MACHO"));
          setMatrizes(data.filter((cao) => cao.genero === "FÊMEA"));
        }
      } catch (error) {
        console.error("Erro ao carregar cães:", error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-cream/20">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, -15, 0],
            y: [0, -10, 0],
          }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="text-6xl"
        >
          🐾
        </motion.div>
      </div>
    );
  }

  return (
    <main className="nossos-caes-page pt-32 pb-20 overflow-x-hidden bg-cream/10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-24">
        {/* Header Principal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex flex-col items-center gap-6"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-black tracking-[0.4em] text-orange text-sm md:text-base uppercase opacity-90">
              Excelência Genética
            </h3>
            <h1 className="font-cmas-play text-brown text-5xl md:text-8xl font-bold uppercase leading-none">
              Nossos Caes
            </h1>
          </div>
          <p className="text-body/70 max-w-2xl font-medium text-lg md:text-xl leading-relaxed">
            Conheça os exemplares que levam o padrão Alto da Bela Vista para
            todo o Brasil através de uma linhagem selecionada.
          </p>
        </motion.div>

        {/* Seção: Reprodutores */}
        {reprodutores.length > 0 && (
          <section className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <PawPrint size={24} />
                </div>
                <h2 className="font-cmas-play text-brown text-4xl md:text-5xl font-bold uppercase tracking-tight">
                  Reprodutores
                </h2>
              </div>
              <div className="flex-1 h-px bg-brown/10" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
            >
              {reprodutores.map((cao) => {
                const imagemCapa = cao.imagens?.find(
                  (img: ImagemResponse) => img.capa === true,
                );

                return (
                  <motion.div key={cao.id} variants={itemVariants}>
                    <DogCard
                      name={cao.nome}
                      description={`${cao.tipoPelo} • ${cao.tamanho}`}
                      imageUrl={imagemCapa?.url}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        )}

        {/* Seção: Matrizes */}
        {matrizes.length > 0 && (
          <section className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center text-white shadow-lg">
                  <PawPrint size={24} />
                </div>
                <h2 className="font-cmas-play text-brown text-4xl md:text-5xl font-bold uppercase tracking-tight">
                  Matrizes
                </h2>
              </div>
              <div className="flex-1 h-px bg-brown/10" />
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
            >
              {matrizes.map((cao) => {
                const imagemCapa = cao.imagens?.find(
                  (img: ImagemResponse) => img.capa === true,
                );

                return (
                  <motion.div key={cao.id} variants={itemVariants}>
                    <DogCard
                      name={cao.nome}
                      description={`${cao.tipoPelo} • ${cao.tamanho}`}
                      imageUrl={imagemCapa?.url}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        )}

        {/* Empty State */}
        {!loading && reprodutores.length === 0 && matrizes.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 flex flex-col items-center gap-4"
          >
            <div className="text-6xl opacity-20">🐕</div>
            <p className="text-brown/40 font-bold uppercase tracking-[0.2em] text-sm">
              Nenhum cão cadastrado no momento.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
