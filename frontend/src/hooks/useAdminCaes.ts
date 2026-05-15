import { useEffect, useState } from "react";
import type { CaoResponse } from "../services/caoService/caoResponse";
import type { CaoRequest } from "../services/caoService/caoRequest";
import type { ImagemResponse } from "../services/imageService/ImagemResponse";
import type { TipoCao } from "../services/caoService/caoService";
import { caoService } from "../services/caoService/caoService";
import { imagemService } from "../services/imageService/imagemService";

type ModalTipo = "adicionar" | "editar" | "fotos" | null;

function formInicial(tipo: TipoCao): CaoRequest {
  return {
    nome: "",
    tipo,
    tipoPelo: "",
    tamanho: "",
    genero: "",
    status: tipo === "FILHOTE" ? "DISPONIVEL" : tipo,
    cor: "",
    descricao: "",
    destaque: false,
  };
}

export function useAdminCaes(tipos: TipoCao | TipoCao[]) {
  const tiposArray = Array.isArray(tipos) ? tipos : [tipos];
  const tipoPrincipal = tiposArray[0];

  const [caes, setCaes] = useState<CaoResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [modalTipo, setModalTipo] = useState<ModalTipo>(null);
  const [caoSelecionado, setCaoSelecionado] = useState<CaoResponse | null>(
    null,
  );
  const [form, setForm] = useState<CaoRequest>(formInicial(tipoPrincipal));
  const [imagens, setImagens] = useState<ImagemResponse[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadCapa, setUploadCapa] = useState(false);
  const [uploadCarregando, setUploadCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroGenero, setFiltroGenero] = useState("");
  const [filtroTipo, setFiltroTipo] = useState<TipoCao | "">("");

  useEffect(() => {
    carregarCaes();
  }, []);

  const caesFiltrados = caes.filter((c) => {
    const buscaOk =
      busca === "" || c.nome.toLowerCase().includes(busca.toLowerCase());
    const statusOk = filtroStatus === "" || c.status === filtroStatus;
    const generoOk = filtroGenero === "" || c.genero === filtroGenero;
    const tipoOk = filtroTipo === "" || c.tipo === filtroTipo;
    return buscaOk && statusOk && generoOk && tipoOk;
  });

  async function carregarCaes() {
    try {
      setCarregando(true);
      const resultados = await Promise.all(
        tiposArray.map((t) => caoService.listarPorTipo(t)),
      );
      setCaes(resultados.flat());
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

  function abrirAdicionar(tipo?: TipoCao) {
    setForm(formInicial(tipo ?? tipoPrincipal));
    setErro("");
    setModalTipo("adicionar");
  }

  function abrirEditar(cao: CaoResponse) {
    setCaoSelecionado(cao);
    setForm({
      nome: cao.nome,
      tipo: cao.tipo,
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
    setForm(formInicial(tipoPrincipal));
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

  return {
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
    temMultiplosTipos: tiposArray.length > 1,
    abrirAdicionar,
    abrirEditar,
    abrirFotos,
    fecharModal,
    handleSalvar,
    handleUpload,
    handleDeletarImagem,
    handleDefinirCapa,
    handleDeletar,
  };
}
