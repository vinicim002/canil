import { AnimatePresence, motion } from "motion/react";
import { HeaderAdminCaes } from "../../components/AdminCaesPageComponents/HeaderAdminCaes";
import { FiltroAdminCaes } from "../../components/AdminCaesPageComponents/FiltrosAdminCaes";
import { GridAdminCaes } from "../../components/AdminCaesPageComponents/GridAdminCaes";
import { Modal } from "../../components/Modal";
import { ModalFoto } from "../../components/ModalFoto";
import type { TipoCao } from "../../services/caoService/caoService";
import { useAdminCaes } from "../../hooks/useAdminCaes";

const TIPOS_PELO = ["LISO", "LONGO", "DURO"];
const TAMANHOS = ["KANINCHEN", "MINIATURA", "STANDARD"];
const GENEROS = ["MACHO", "FÊMEA"];
const STATUS = ["REPRODUTOR", "MATRIZ"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const ABAS: { label: string; tipo: TipoCao | "" }[] = [
  { label: "Todos", tipo: "" },
  { label: "Matrizes", tipo: "MATRIZ" },
  { label: "Reprodutores", tipo: "REPRODUTOR" },
];

export function AdminCaesPage() {
  const {
    caes,
    caesFiltrados,
    carregando,
    modalTipo,
    caoSelecionado,
    form,
    setForm,
    imagens,
    uploadFile,
    setUploadFile,
    uploadCapa,
    setUploadCapa,
    uploadCarregando,
    salvando,
    erro,
    busca,
    setBusca,
    filtroStatus,
    setFiltroStatus,
    filtroGenero,
    setFiltroGenero,
    filtroTipo,
    setFiltroTipo,
    abrirAdicionar,
    abrirEditar,
    abrirFotos,
    fecharModal,
    handleSalvar,
    handleUpload,
    handleDeletarImagem,
    handleDefinirCapa,
    handleDeletar,
  } = useAdminCaes(["MATRIZ", "REPRODUTOR"]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="admin-caes-page flex flex-col gap-4 p-4 md:gap-6 md:p-8 max-w-[1600px] mx-auto"
    >
      <motion.div variants={itemVariants}>
        <HeaderAdminCaes
          titulo="Cães"
          abrirAdicionar={abrirAdicionar}
          quantidadeCaes={caes.length}
          btnName="cão"
        />
      </motion.div>

      {/* Abas Matriz / Reprodutor */}
      <motion.div variants={itemVariants} className="flex gap-2">
        {ABAS.map((aba) => (
          <button
            key={aba.label}
            onClick={() => setFiltroTipo(aba.tipo as TipoCao | "")}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
              filtroTipo === aba.tipo
                ? "bg-brown text-white shadow"
                : "bg-brown/10 text-brown hover:bg-brown/20"
            }`}
          >
            {aba.label}
            <span
              className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                filtroTipo === aba.tipo ? "bg-white/20" : "bg-brown/10"
              }`}
            >
              {aba.tipo === ""
                ? caes.length
                : caes.filter((c) => c.tipo === aba.tipo).length}
            </span>
          </button>
        ))}
      </motion.div>

      <motion.div variants={itemVariants}>
        <FiltroAdminCaes
          busca={busca}
          setBusca={setBusca}
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
          filtroGenero={filtroGenero}
          setFiltroGenero={setFiltroGenero}
          STATUS={STATUS}
          GENEROS={GENEROS}
        />
      </motion.div>

      <motion.div variants={itemVariants} className="w-full">
        <GridAdminCaes
          handleDeletar={handleDeletar}
          abrirFotos={abrirFotos}
          abrirEditar={abrirEditar}
          caesFiltrados={caesFiltrados}
          carregando={carregando}
          showStatus={false}
        />
      </motion.div>

      <AnimatePresence>
        {(modalTipo === "adicionar" || modalTipo === "editar") && (
          <Modal
            modalTipo={modalTipo}
            handleSalvar={handleSalvar}
            fecharModal={fecharModal}
            form={form}
            setForm={setForm}
            salvando={salvando}
            erro={erro}
            TIPOS_PELO={TIPOS_PELO}
            TIPOS={["REPRODUTOR", "MATRIZ"]}
            TAMANHOS={TAMANHOS}
            GENEROS={GENEROS}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {modalTipo === "fotos" && (
          <ModalFoto
            modalTipo="fotos"
            caoSelecionado={caoSelecionado}
            fecharModal={fecharModal}
            erro={erro}
            imagens={imagens}
            setUploadFile={setUploadFile}
            uploadFile={uploadFile}
            uploadCapa={uploadCapa}
            setUploadCapa={setUploadCapa}
            handleUpload={handleUpload}
            uploadCarregando={uploadCarregando}
            handleDefinirCapa={handleDefinirCapa}
            handleDeletarImagem={handleDeletarImagem}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
