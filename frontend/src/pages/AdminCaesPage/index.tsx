import { useState, useEffect } from "react";

import { HeaderAdminCaes } from "../../components/AdminCaesPageComponents/HeaderAdminCaes";
import { FiltroAdminCaes } from "../../components/AdminCaesPageComponents/FiltrosAdminCaes";
import { GridAdminCaes } from "../../components/AdminCaesPageComponents/GridAdminCaes";
import { Modal } from "../../components/Modal";
import { ModalFoto } from "../../components/ModalFoto";
import type { CaoRequest } from "../../services/caoService/caoRequest";
import type { CaoResponse } from "../../services/caoService/caoResponse";
import type { ImagemResponse } from "../../services/imageService/ImagemResponse";
import { caoService } from "../../services/caoService/caoService";
import { imagemService } from "../../services/imageService/imagemService";

type ModalTipo = "adicionar" | "editar" | "fotos" | null;

const TIPOS_PELO = ["LISO", "LONGO", "DURO"];
const TAMANHOS = ["KANINCHEN", "MINIATURA", "STANDARD"];
const GENEROS = ["MACHO", "FÊMEA"];
const STATUS = ["REPRODUTOR", "MATRIZ"];
const formInicial: CaoRequest = {
  nome: "",
  tipoPelo: "",
  tamanho: "",
  genero: "",
  status: "REPRODUTOR",
  cor: "",
  descricao: "",
  destaque: false,
};

export function AdminCaesPage() {
  const [caes, setCaes] = useState<CaoResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalTipo, setModalTipo] = useState<ModalTipo>(null);
  const [caoSelecionado, setCaoSelecionado] = useState<CaoResponse | null>(
    null,
  );
  const [form, setForm] = useState<CaoRequest>(formInicial);
  const [imagens, setImagens] = useState<ImagemResponse[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCapa, setUploadCapa] = useState(false);
  const [uploadCarregando, setUploadCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");

  useEffect(() => {
    carregarCaes();
  }, []);

  const caesFiltrados = caes.filter((c) => {
    const buscaOk =
      busca === "" || c.nome.toLowerCase().includes(busca.toLowerCase());
    const statusOk = filtroStatus === "" || c.status === filtroStatus;
    const generoOk = filtroGenero === "" || c.genero === filtroGenero;
    return buscaOk && statusOk && generoOk;
  });

  async function carregarCaes() {
    try {
      setCarregando(true);
      const data = await caoService.listarTodos();
      setCaes(data);
    } catch {
      setErro("Erro ao carregar cães.");
    } finally {
      setCarregando(false);
    }
  }

  async function carregarImagens(caoId: string) {
    try {
      const data = await imagemService.listarPorCao(caoId);
      setImagens(data);
    } catch {
      setImagens([]);
    }
  }

  function abrirAdicionar() {
    setForm(formInicial);
    setErro("");
    setModalTipo("adicionar");
  }

  function abrirEditar(cao: CaoResponse) {
    setCaoSelecionado(cao);
    setForm({
      nome: cao.nome,
      tipoPelo: cao.tipoPelo,
      tamanho: cao.tamanho,
      genero: cao.genero,
      status: cao.status,
      cor: cao.cor || "",
      descricao: cao.descricao || "",
      destaque: cao.destaque,
    });
    setErro("");
    setModalTipo("editar");
  }

  async function abrirFotos(cao: CaoResponse) {
    setCaoSelecionado(cao);
    await carregarImagens(cao.id);
    setModalTipo("fotos");
  }

  function fecharModal() {
    setModalTipo(null);
    setCaoSelecionado(null);
    setForm(formInicial);
    setImagens([]);
    setUploadFile(null);
    setErro("");
  }

  async function handleSalvar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSalvando(true);
    try {
      if (modalTipo === "adicionar") {
        await caoService.criar(form);
      } else if (modalTipo === "editar" && caoSelecionado) {
        await caoService.atualizar(caoSelecionado.id, form);
      }
      await carregarCaes();
      fecharModal();
    } catch {
      setErro("Erro ao salvar. Verifique os campos.");
    } finally {
      setSalvando(false);
    }
  }

  async function handleUpload() {
    if (!uploadFile || !caoSelecionado) return;
    setUploadCarregando(true);
    try {
      await imagemService.upload(caoSelecionado.id, uploadFile, uploadCapa);
      await carregarImagens(caoSelecionado.id);
      setUploadFile(null);
      setUploadCapa(false);
    } catch {
      setErro("Erro ao fazer upload da imagem.");
    } finally {
      setUploadCarregando(false);
    }
  }

  async function handleDeletarImagem(imagemId: string) {
    if (!caoSelecionado) return;
    try {
      await imagemService.deletar(imagemId);
      await carregarImagens(caoSelecionado.id);
    } catch {
      setErro("Erro ao deletar imagem.");
    }
  }

  async function handleDefinirCapa(imagemId: string) {
    if (!caoSelecionado) return;
    try {
      await imagemService.definirCapa(caoSelecionado.id, imagemId);
      await carregarImagens(caoSelecionado.id);
    } catch {
      setErro("Erro ao definir capa.");
    }
  }

  async function handleDeletar(id: string) {
    if (!confirm("Tem certeza que deseja deletar este cão?")) return;
    try {
      await caoService.deletar(id);
      await carregarCaes();
    } catch {
      setErro("Erro ao deletar.");
    }
  }

  return (
    <div className="admin-caes-page flex flex-col gap-6">
      {/* Header */}
      <HeaderAdminCaes
        abrirAdicionar={abrirAdicionar}
        quantidadeCaes={caes.length}
      />

      {/* Filtros */}
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

      {/* Grid de cães */}
      <GridAdminCaes
        handleDeletar={handleDeletar}
        abrirFotos={abrirFotos}
        abrirEditar={abrirEditar}
        caesFiltrados={caesFiltrados}
        carregando={carregando}
      />

      {/* Modal Adicionar/Editar */}
      <Modal
        modalTipo={
          modalTipo === "adicionar" || modalTipo === "editar" ? modalTipo : null
        }
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

      {/* Modal Fotos */}
      <ModalFoto
        modalTipo={modalTipo === "fotos" ? "fotos" : null}
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
        handleDefinirCapa={(imagemId) => handleDefinirCapa(imagemId)}
        handleDeletarImagem={(imagemId) => handleDeletarImagem(imagemId)}
      />
    </div>
  );
}
