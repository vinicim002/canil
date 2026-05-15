import { AnimatePresence, motion } from "motion/react";
import { HeaderAdminCaes } from "../../components/AdminCaesPageComponents/HeaderAdminCaes";
import { FiltroAdminCaes } from "../../components/AdminCaesPageComponents/FiltrosAdminCaes";
import { GridAdminCaes } from "../../components/AdminCaesPageComponents/GridAdminCaes";
import { Modal } from "../../components/Modal";
import { ModalFoto } from "../../components/ModalFoto";
import { useAdminCaes } from "../../hooks/useAdminCaes";

const TIPOS_PELO = ["LISO", "LONGO", "DURO"];
const TAMANHOS = ["KANINCHEN", "MINIATURA", "STANDARD"];
const GENEROS = ["MACHO", "FÊMEA"];
const STATUS = ["DISPONIVEL", "RESERVADO", "VENDIDO"];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

export function AdminFilhotesPage() {
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
    abrirAdicionar,
    abrirEditar,
    abrirFotos,
    fecharModal,
    handleSalvar,
    handleUpload,
    handleDeletarImagem,
    handleDefinirCapa,
    handleDeletar,
  } = useAdminCaes("FILHOTE");

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="admin-caes-page flex flex-col gap-4 p-4 md:gap-6 md:p-8 max-w-[1600px] mx-auto"
    >
      <motion.div variants={itemVariants}>
        <HeaderAdminCaes
          titulo="Filhotes"
          abrirAdicionar={abrirAdicionar}
          quantidadeCaes={caes.length}
          btnName="filhote"
        />
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
          showStatus={true}
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
            TAMANHOS={TAMANHOS}
            GENEROS={GENEROS}
            STATUS={STATUS}
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