import { AnimatePresence, motion } from "motion/react";
import { HeaderAdminCaes } from "../HeaderAdminCaes";
import { FiltroAdminCaes } from "../FiltrosAdminCaes";
import { GridAdminCaes } from "../GridAdminCaes";
import { Modal } from "../../../Modal";
import { ModalFoto } from "../../../ModalFoto";
import type { TipoCao } from "../../../../services/caoService/caoService";
import { useAdminCaes } from "../../../../hooks/useAdminCaes";
import {
  GENEROS,
  STATUS_FILHOTE,
  TAMANHOS,
  TIPOS_PELO,
} from "../../../../constants/cao";
import {
  staggerContainerVariants,
  staggerItemVariants,
} from "../../../../constants/animations";

export interface AdminCaoAba {
  label: string;
  tipo: TipoCao | "";
}

interface AdminCaoManagementViewProps {
  titulo: string;
  btnName: string;
  tipos: TipoCao | TipoCao[];
  modalTipos: string[];
  showStatus?: boolean;
  showAbas?: boolean;
  abas?: AdminCaoAba[];
}

export function AdminCaoManagementView({
  titulo,
  btnName,
  tipos,
  modalTipos,
  showStatus = false,
  showAbas = false,
  abas = [],
}: AdminCaoManagementViewProps) {
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
  } = useAdminCaes(tipos);

  const statusFiltro = showStatus ? [...STATUS_FILHOTE] : undefined;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainerVariants}
      className="admin-caes-page flex flex-col gap-4 p-4 md:gap-6 md:p-8 max-w-[1600px] mx-auto"
    >
      <motion.div variants={staggerItemVariants}>
        <HeaderAdminCaes
          titulo={titulo}
          abrirAdicionar={abrirAdicionar}
          quantidadeCaes={caes.length}
          btnName={btnName}
        />
      </motion.div>

      {showAbas && abas.length > 0 && (
        <motion.div variants={staggerItemVariants} className="flex gap-2">
          {abas.map((aba) => (
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
      )}

      <motion.div variants={staggerItemVariants}>
        <FiltroAdminCaes
          busca={busca}
          setBusca={setBusca}
          filtroStatus={filtroStatus}
          setFiltroStatus={setFiltroStatus}
          filtroGenero={filtroGenero}
          setFiltroGenero={setFiltroGenero}
          GENEROS={[...GENEROS]}
          STATUS={statusFiltro}
        />
      </motion.div>

      <motion.div variants={staggerItemVariants} className="w-full">
        <GridAdminCaes
          handleDeletar={handleDeletar}
          abrirFotos={abrirFotos}
          abrirEditar={abrirEditar}
          caesFiltrados={caesFiltrados}
          carregando={carregando}
          showStatus={showStatus}
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
            TIPOS_PELO={[...TIPOS_PELO]}
            TIPOS={modalTipos}
            TAMANHOS={[...TAMANHOS]}
            GENEROS={[...GENEROS]}
            STATUS={statusFiltro}
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
