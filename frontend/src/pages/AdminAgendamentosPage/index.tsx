import { useCallback, useEffect, useState } from "react";
import { Ban, Calendar, Copy, Link2, Trash2 } from "lucide-react";
import {
  adminVisitaService,
  HORARIOS_BLOQUEIO,
  type BloqueioHorarioResponse,
} from "../../services/adminVisitaService";
import type { StatusVisita, VisitaResponse } from "../../types/visita";

const statusColor: Record<string, string> = {
  PENDENTE: "bg-yellow-100 text-yellow-700",
  CONFIRMADO: "bg-green-100 text-green-700",
  REAGENDADO: "bg-blue-100 text-blue-700",
  CANCELADO: "bg-red-100 text-red-700",
  REALIZADO: "bg-blue-100 text-blue-800",
  AUSENTE: "bg-gray-100 text-gray-700",
};

const FILTROS_STATUS: { label: string; value: StatusVisita | "" }[] = [
  { label: "Todos", value: "" },
  { label: "Pendente", value: "PENDENTE" },
  { label: "Confirmado", value: "CONFIRMADO" },
  { label: "Reagendado", value: "REAGENDADO" },
  { label: "Cancelado", value: "CANCELADO" },
  { label: "Realizado", value: "REALIZADO" },
  { label: "Ausente", value: "AUSENTE" },
];

type Aba = "visitas" | "bloqueios";

export function AdminAgendamentosPage() {
  const [aba, setAba] = useState<Aba>("visitas");
  const [visitas, setVisitas] = useState<VisitaResponse[]>([]);
  const [bloqueios, setBloqueios] = useState<BloqueioHorarioResponse[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<StatusVisita | "">("");
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [dataBloqueio, setDataBloqueio] = useState("");
  const [horaBloqueio, setHoraBloqueio] = useState("");
  const [diaInteiro, setDiaInteiro] = useState(false);
  const [motivoBloqueio, setMotivoBloqueio] = useState("");
  const [salvandoBloqueio, setSalvandoBloqueio] = useState(false);

  const carregarVisitas = useCallback(async () => {
    const data = await adminVisitaService.listarVisitas(
      filtroStatus || undefined,
    );
    setVisitas(data);
  }, [filtroStatus]);

  const carregarBloqueios = useCallback(async () => {
    const data = await adminVisitaService.listarBloqueios();
    setBloqueios(data);
  }, []);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro("");
    try {
      await Promise.all([carregarVisitas(), carregarBloqueios()]);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Erro ao carregar dados.");
    } finally {
      setCarregando(false);
    }
  }, [carregarVisitas, carregarBloqueios]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  useEffect(() => {
    if (aba === "visitas") {
      carregarVisitas().catch(() => {});
    }
  }, [filtroStatus, aba, carregarVisitas]);

  async function acaoVisita(
    id: string,
    acao: "confirmar" | "cancelar" | "realizado" | "ausente",
  ) {
    const map = {
      confirmar: adminVisitaService.confirmar,
      cancelar: adminVisitaService.cancelar,
      realizado: adminVisitaService.marcarRealizado,
      ausente: adminVisitaService.marcarAusente,
    };
    await map[acao](id);
    await carregarVisitas();
  }

  async function copiarLink(link: string) {
    await navigator.clipboard.writeText(link);
  }

  async function criarBloqueio(e: React.FormEvent) {
    e.preventDefault();
    if (!dataBloqueio) return;
    setSalvandoBloqueio(true);
    setErro("");
    try {
      await adminVisitaService.criarBloqueio({
        data: dataBloqueio,
        hora: diaInteiro ? null : horaBloqueio || null,
        motivo: motivoBloqueio.trim() || undefined,
      });
      setDataBloqueio("");
      setHoraBloqueio("");
      setDiaInteiro(false);
      setMotivoBloqueio("");
      await carregarBloqueios();
    } catch (err) {
      setErro(err instanceof Error ? err.message : "Erro ao criar bloqueio.");
    } finally {
      setSalvandoBloqueio(false);
    }
  }

  async function removerBloqueio(id: string) {
    await adminVisitaService.removerBloqueio(id);
    await carregarBloqueios();
  }

  function formatarData(dataHora: string) {
    return new Date(dataHora).toLocaleString("pt-BR");
  }

  function formatarDataBloqueio(data: string, hora: string | null, diaInteiro: boolean) {
    const d = new Date(data + "T12:00:00").toLocaleDateString("pt-BR");
    if (diaInteiro || !hora) return `${d} — dia inteiro`;
    const [h, m] = hora.split(":");
    return `${d} às ${h}h${m !== "00" ? m : ""}`;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-cmas-play text-brown text-3xl">Visitas ao canil</h1>
          <p className="text-body/50 text-sm font-medium">
            Agendamentos públicos (sem login) e bloqueio de horários
          </p>
        </div>
        <div className="flex rounded-xl border border-brown/10 overflow-hidden bg-white">
          <button
            type="button"
            onClick={() => setAba("visitas")}
            className={`px-4 py-2 text-sm font-bold flex items-center gap-2 ${
              aba === "visitas"
                ? "bg-orange text-white"
                : "text-brown hover:bg-cream/50"
            }`}
          >
            <Calendar size={16} />
            Visitas ({visitas.length})
          </button>
          <button
            type="button"
            onClick={() => setAba("bloqueios")}
            className={`px-4 py-2 text-sm font-bold flex items-center gap-2 ${
              aba === "bloqueios"
                ? "bg-orange text-white"
                : "text-brown hover:bg-cream/50"
            }`}
          >
            <Ban size={16} />
            Bloqueios ({bloqueios.length})
          </button>
        </div>
      </div>

      {erro && (
        <p className="text-red-600 text-sm font-medium bg-red-50 border border-red-200 rounded-xl px-4 py-3">
          {erro}
        </p>
      )}

      {aba === "visitas" && (
        <>
          <div className="flex flex-wrap gap-2">
            {FILTROS_STATUS.map((f) => (
              <button
                key={f.label}
                type="button"
                onClick={() => setFiltroStatus(f.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                  filtroStatus === f.value
                    ? "bg-brown text-white border-brown"
                    : "border-brown/20 text-brown hover:border-orange"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-brown/10 overflow-x-auto">
            <div className="grid grid-cols-[1.2fr_1fr_1.2fr_0.8fr_1.4fr] min-w-[800px] px-6 py-3 border-b border-brown/10 bg-cream/50">
              <span className="text-body/50 text-xs font-medium">Visitante</span>
              <span className="text-body/50 text-xs font-medium">Contato</span>
              <span className="text-body/50 text-xs font-medium">Data e hora</span>
              <span className="text-body/50 text-xs font-medium">Status</span>
              <span className="text-body/50 text-xs font-medium">Ações</span>
            </div>

            {carregando ? (
              <div className="py-16 text-center text-body/50">Carregando...</div>
            ) : visitas.length === 0 ? (
              <div className="py-16 text-center text-body/50">
                Nenhuma visita encontrada.
              </div>
            ) : (
              visitas.map((v) => (
                <div
                  key={v.id}
                  className="grid grid-cols-[1.2fr_1fr_1.2fr_0.8fr_1.4fr] min-w-[800px] px-6 py-4 border-b border-brown/5 last:border-0 hover:bg-cream/30 items-center gap-2"
                >
                  <span className="text-brown font-medium text-sm">{v.nome}</span>
                  <div className="flex flex-col text-xs text-body">
                    <span>{v.telefone}</span>
                    <span className="truncate max-w-[140px]">{v.email}</span>
                  </div>
                  <span className="text-body text-sm">
                    {formatarData(v.dataHora)}
                  </span>
                  <span
                    className={`text-xs font-medium py-1 px-2 rounded-full w-fit ${statusColor[v.status]}`}
                  >
                    {v.status}
                  </span>
                  <div className="flex flex-wrap gap-2 items-center">
                    <button
                      type="button"
                      title="Copiar link do visitante"
                      onClick={() => copiarLink(v.linkGerenciamento)}
                      className="text-brown/60 hover:text-orange p-1"
                    >
                      <Copy size={14} />
                    </button>
                    <a
                      href={v.linkGerenciamento}
                      target="_blank"
                      rel="noreferrer"
                      className="text-orange text-xs font-medium hover:underline flex items-center gap-1"
                    >
                      <Link2 size={12} />
                      Link
                    </a>
                    {(v.status === "PENDENTE" || v.status === "REAGENDADO") && (
                      <button
                        type="button"
                        onClick={() => acaoVisita(v.id, "confirmar")}
                        className="text-green-600 text-xs font-medium hover:underline"
                      >
                        Confirmar
                      </button>
                    )}
                    {v.status === "CONFIRMADO" && (
                      <>
                        <button
                          type="button"
                          onClick={() => acaoVisita(v.id, "realizado")}
                          className="text-blue-600 text-xs font-medium hover:underline"
                        >
                          Realizado
                        </button>
                        <button
                          type="button"
                          onClick={() => acaoVisita(v.id, "ausente")}
                          className="text-gray-600 text-xs font-medium hover:underline"
                        >
                          Ausente
                        </button>
                      </>
                    )}
                    {v.status !== "CANCELADO" && v.status !== "REALIZADO" && (
                      <button
                        type="button"
                        onClick={() => acaoVisita(v.id, "cancelar")}
                        className="text-red-500 text-xs font-medium hover:underline"
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {aba === "bloqueios" && (
        <div className="flex flex-col lg:flex-row gap-8">
          <form
            onSubmit={criarBloqueio}
            className="lg:w-80 shrink-0 bg-white rounded-2xl border border-brown/10 p-6 flex flex-col gap-4"
          >
            <h2 className="font-bold text-brown text-sm uppercase tracking-widest">
              Novo bloqueio
            </h2>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-body/60 font-medium">Data</label>
              <input
                type="date"
                required
                value={dataBloqueio}
                min={new Date().toISOString().slice(0, 10)}
                onChange={(e) => setDataBloqueio(e.target.value)}
                className="border border-brown/10 rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <label className="flex items-center gap-2 text-sm text-brown cursor-pointer">
              <input
                type="checkbox"
                checked={diaInteiro}
                onChange={(e) => {
                  setDiaInteiro(e.target.checked);
                  if (e.target.checked) setHoraBloqueio("");
                }}
              />
              Bloquear dia inteiro
            </label>
            {!diaInteiro && (
              <div className="flex flex-col gap-1">
                <label className="text-xs text-body/60 font-medium">Horário</label>
                <select
                  value={horaBloqueio}
                  onChange={(e) => setHoraBloqueio(e.target.value)}
                  className="border border-brown/10 rounded-xl px-3 py-2 text-sm"
                >
                  <option value="">Selecione (ou dia inteiro)</option>
                  {HORARIOS_BLOQUEIO.map((h) => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-body/60 font-medium">Motivo (opcional)</label>
              <input
                type="text"
                value={motivoBloqueio}
                onChange={(e) => setMotivoBloqueio(e.target.value)}
                placeholder="Ex.: feriado, manutenção"
                className="border border-brown/10 rounded-xl px-3 py-2 text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={salvandoBloqueio || (!diaInteiro && !horaBloqueio)}
              className="bg-orange hover:bg-brown text-white font-bold py-2 rounded-xl text-sm disabled:opacity-50"
            >
              {salvandoBloqueio ? "Salvando..." : "Bloquear"}
            </button>
            <p className="text-xs text-body/50">
              Horários bloqueados somem da agenda pública automaticamente.
            </p>
          </form>

          <div className="flex-1 bg-white rounded-2xl border border-brown/10 overflow-hidden">
            <div className="px-6 py-3 border-b border-brown/10 bg-cream/50">
              <span className="text-body/50 text-xs font-medium">
                Bloqueios ativos (hoje em diante)
              </span>
            </div>
            {carregando ? (
              <div className="py-12 text-center text-body/50">Carregando...</div>
            ) : bloqueios.length === 0 ? (
              <div className="py-12 text-center text-body/50">
                Nenhum bloqueio cadastrado.
              </div>
            ) : (
              bloqueios.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between px-6 py-4 border-b border-brown/5 last:border-0"
                >
                  <div>
                    <p className="font-medium text-brown text-sm">
                      {formatarDataBloqueio(b.data, b.hora, b.diaInteiro)}
                    </p>
                    {b.motivo && (
                      <p className="text-xs text-body/50 mt-0.5">{b.motivo}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => removerBloqueio(b.id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-lg"
                    title="Remover bloqueio"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
