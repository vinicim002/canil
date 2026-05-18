import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DogCard } from "../../components/DogCard";
import type { CaoResponse } from "../../services/caoService/caoResponse";
import type { ImagemResponse } from "../../services/imageService/ImagemResponse";
import { caoService } from "../../services/caoService/caoService";
import { MessageCircle } from "lucide-react";

export function FilhotesPage() {
  const [machos, setMachos] = useState<CaoResponse[]>([]);
  const [femeas, setFemeas] = useState<CaoResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilhotes() {
      try {
        const data = await caoService.listarPorTipo("FILHOTE");
        if (Array.isArray(data)) {
          setMachos(data.filter((cao) => cao.genero === "MACHO"));
          setFemeas(data.filter((cao) => cao.genero === "FÊMEA"));
        }
      } catch (error) {
        console.error("Erro ao carregar filhotes:", error);
      } finally {
        setLoading(false);
      }
    }
    loadFilhotes();
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

  // ✅ Função para gerenciar as cores exatas das badges originais
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "DISPONIVEL":
        return "bg-green-500 text-white";
      case "RESERVADO":
        return "bg-yellow-500 text-white";
      case "VENDIDO":
        return "bg-red-500 text-white";
      default:
        return "bg-brown text-white";
    }
  };

  // ✅ Função para traduzir o texto visual da badge de forma amigável
  const getStatusLabel = (status: string) => {
    if (status === "DISPONIVEL") return "Disponível";
    if (status === "RESERVADO") return "Reservado";
    if (status === "VENDIDO") return "Vendido";
    return status;
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

  const renderGridFilhotes = (lista: CaoResponse[]) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10"
    >
      {lista.map((filhote) => {
        const imagemCapa = filhote.imagens?.find(
          (img: ImagemResponse) => img.capa === true,
        );

        const dataFormatada = filhote.dataNascimento
          ? ` • Nasc. ${new Date(filhote.dataNascimento).toLocaleDateString("pt-BR")}`
          : "";

        return (
          <motion.div
            key={filhote.id}
            variants={itemVariants}
            className="relative group"
          >
            {/* 🏷️ Badge Colorida posicionada perfeitamente sobre o topo direito da foto */}
            <div className="absolute top-4 right-4 z-10 pointer-events-none">
              <span
                className={`${getStatusBadgeClass(filhote.status)} text-[10px] font-black py-1.5 px-4 rounded-full shadow-lg uppercase tracking-widest block`}
              >
                {getStatusLabel(filhote.status)}
              </span>
            </div>

            {/* O DogCard original renderiza a foto e os textos normalmente */}
            <DogCard
              name={filhote.nome} // Nome limpo de volta para o título do card
              description={`${filhote.tipoPelo} • ${filhote.tamanho}${dataFormatada}`}
              imageUrl={imagemCapa?.url}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );

  return (
    <main className="filhotes-page pt-32 pb-20 overflow-x-hidden bg-cream/10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 flex flex-col gap-24">
        {/* Header Principal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center flex flex-col items-center gap-6"
        >
          <div className="flex flex-col gap-2">
            <h3 className="font-black tracking-[0.4em] text-orange text-sm md:text-base uppercase opacity-90">
              Disponíveis Agora
            </h3>
            <h1 className="font-cmas-play text-brown text-5xl md:text-8xl font-bold uppercase leading-none">
              Filhotes
            </h1>
          </div>
          <p className="text-body/70 max-w-2xl font-medium text-lg md:text-xl leading-relaxed">
            Todos os filhotes are criados com amor, vacinados e acompanhados por
            veterinário. Reservas sujeitas à disponibilidade.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-brown text-white font-black py-4 px-8 rounded-full cursor-pointer hover:bg-orange transition-all shadow-xl shadow-brown/20 uppercase tracking-widest text-xs mt-2"
          >
            <MessageCircle size={18} />
            Reservar filhote
          </motion.button>
        </motion.div>

        {/* Seção: Machos */}
        {machos.length > 0 && (
          <section className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center text-white shadow-lg font-black text-xs">
                  ♂️
                </div>
                <h2 className="font-cmas-play text-brown text-4xl md:text-5xl font-bold uppercase tracking-tight">
                  Machos
                </h2>
                <span className="bg-brown text-white text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-tighter">
                  {machos.filter((m) => m.status === "DISPONIVEL").length}{" "}
                  disponíveis
                </span>
              </div>
              <div className="flex-1 h-px bg-brown/10" />
            </motion.div>

            {renderGridFilhotes(machos)}
          </section>
        )}

        {/* Seção: Fêmeas */}
        {femeas.length > 0 && (
          <section className="flex flex-col gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-6"
            >
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center text-white shadow-lg font-black text-xs">
                  ♀️
                </div>
                <h2 className="font-cmas-play text-brown text-4xl md:text-5xl font-bold uppercase tracking-tight">
                  Fêmeas
                </h2>
                <span className="bg-brown text-white text-[10px] font-black py-1 px-3 rounded-full uppercase tracking-tighter">
                  {femeas.filter((f) => f.status === "DISPONIVEL").length}{" "}
                  disponíveis
                </span>
              </div>
              <div className="flex-1 h-px bg-brown/10" />
            </motion.div>

            {renderGridFilhotes(femeas)}
          </section>
        )}

        {/* Empty State */}
        {!loading && machos.length === 0 && femeas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32 flex flex-col items-center gap-4"
          >
            <div className="text-6xl opacity-20">🐾</div>
            <p className="text-brown/40 font-bold uppercase tracking-[0.2em] text-sm">
              Não há filhotes disponíveis no momento.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  );
}
