import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DogCard } from "../../components/DogCard";
import type { CaoResponse } from "../../services/caoService/caoResponse";
import { caoService } from "../../services/caoService/caoService";

export function NossosCaesPage() {
  const [reprodutores, setReprodutores] = useState<CaoResponse[]>([]);
  const [matrizes, setMatrizes] = useState<CaoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        // Chamada ao service que agora usa fetch internamente
        const data = await caoService.listarTodos();

        // No fetch, se o seu service já retorna o json(), 'data' já é o array
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-cream">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-5xl"
        >
          🐾
        </motion.div>
      </div>
    );
  }

  return (
    <main className="nossos-caes-page pt-32 pb-20 overflow-x-hidden">
      <div className="nossos-caes-page-inner px-6 md:px-12 lg:px-36 flex flex-col gap-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex flex-col items-center gap-4"
        >
          <h3 className="font-cmas-play text-orange text-xl md:text-2xl tracking-widest">
            CONHECA NOSSOS CAES
          </h3>
          <h1 className="font-cmas-play text-brown text-5xl md:text-7xl uppercase">
            Nossos Caes
          </h1>
          <p className="text-body max-w-2xl font-medium">
            Conheça os exemplares que levam a genética e o padrão Alto da Bela
            Vista para todo o Brasil.
          </p>
        </motion.div>

        {/* Reprodutores */}
        {reprodutores.length > 0 && (
          <section className="flex flex-col gap-10">
            <div className="flex items-center gap-6">
              <h2 className="font-cmas-play text-brown text-4xl">
                Reprodutores
              </h2>
              <div className="flex-1 h-px bg-brown/20" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {reprodutores.map((cao) => (
                <DogCard
                  key={cao.id}
                  name={cao.nome}
                  description={`${cao.tipoPelo} • ${cao.tamanho}`}
                />
              ))}
            </motion.div>
          </section>
        )}

        {/* Matrizes */}
        {matrizes.length > 0 && (
          <section className="flex flex-col gap-10">
            <div className="flex items-center gap-6">
              <h2 className="font-cmas-play text-brown text-4xl">Matrizes</h2>
              <div className="flex-1 h-px bg-brown/20" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {matrizes.map((cao) => (
                <DogCard
                  key={cao.id}
                  name={cao.nome}
                  description={`${cao.tipoPelo} • ${cao.tamanho}`}
                />
              ))}
            </motion.div>
          </section>
        )}

        {!loading && reprodutores.length === 0 && matrizes.length === 0 && (
          <div className="text-center py-20">
            <p className="text-brown/50 font-medium italic">
              Nenhum cão cadastrado no momento.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
