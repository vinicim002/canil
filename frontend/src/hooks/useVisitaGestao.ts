import { useCallback, useEffect, useState } from "react";
import { visitaService } from "../services/visitaService";
import type { SlotDisponivel, StatusVisita, VisitaResponse } from "../types/visita";

export type ModoGestao = "visualizar" | "reagendar" | "cancelar";

const STATUS_LABEL: Record<StatusVisita, string> = {
  PENDENTE: "Pendente",
  CONFIRMADO: "Confirmado",
  REAGENDADO: "Reagendado",
  CANCELADO: "Cancelado",
  REALIZADO: "Realizado",
  AUSENTE: "Ausente",
};

export function useVisitaGestao(token: string | undefined) {
  const [visita, setVisita] = useState<VisitaResponse | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [modo, setModo] = useState<ModoGestao>("visualizar");
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [slotSelecionado, setSlotSelecionado] = useState<SlotDisponivel | null>(null);
  const [slots, setSlots] = useState<SlotDisponivel[]>([]);
  const [carregandoSlots, setCarregandoSlots] = useState(false);
  const [erroSlots, setErroSlots] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState("");

  const podeAlterar =
    visita &&
    visita.status !== "CANCELADO" &&
    visita.status !== "REALIZADO" &&
    visita.status !== "AUSENTE" &&
    new Date(visita.dataHora) > new Date();

  const carregarVisita = useCallback(async () => {
    if (!token) {
      setErro("Link inválido.");
      setCarregando(false);
      return;
    }
    setCarregando(true);
    setErro("");
    try {
      const dados = await visitaService.buscarPorToken(token);
      setVisita(dados);
      setObservacoes(dados.observacoes ?? "");
    } catch (e) {
      setErro(
        e instanceof Error ? e.message : "Não foi possível carregar o agendamento.",
      );
    } finally {
      setCarregando(false);
    }
  }, [token]);

  useEffect(() => {
    carregarVisita();
  }, [carregarVisita]);

  const carregarSlots = useCallback(
    async (data: string) => {
      if (!token || !data) return;
      setCarregandoSlots(true);
      setErroSlots("");
      setSlotSelecionado(null);
      try {
        const resposta = await visitaService.listarSlots(data, token);
        setSlots(resposta.slots);
        if (resposta.slots.length === 0) {
          setErroSlots("Nenhum horário disponível nesta data.");
        }
      } catch (e) {
        setSlots([]);
        setErroSlots(
          e instanceof Error ? e.message : "Não foi possível carregar horários.",
        );
      } finally {
        setCarregandoSlots(false);
      }
    },
    [token],
  );

  useEffect(() => {
    if (modo === "reagendar" && dataSelecionada) {
      carregarSlots(dataSelecionada);
    }
  }, [modo, dataSelecionada, carregarSlots]);

  function iniciarReagendamento() {
    if (!visita) return;
    setModo("reagendar");
    setSucesso("");
    setDataSelecionada(visita.dataHora.slice(0, 10));
    setSlotSelecionado(null);
  }

  function iniciarCancelamento() {
    setModo("cancelar");
    setSucesso("");
  }

  function voltarVisualizar() {
    setModo("visualizar");
    setSucesso("");
    setDataSelecionada("");
    setSlotSelecionado(null);
    setSlots([]);
  }

  async function confirmarReagendamento() {
    if (!token || !slotSelecionado || !dataSelecionada) return;
    setSalvando(true);
    setErro("");
    try {
      const dataHora =
        slotSelecionado.dataHora ||
        `${dataSelecionada}T${slotSelecionado.horario.slice(0, 5)}:00`;
      const atualizada = await visitaService.reagendar(token, {
        dataHora,
        observacoes: observacoes.trim() || undefined,
      });
      setVisita(atualizada);
      setModo("visualizar");
      setSucesso("Visita reagendada com sucesso!");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível reagendar.");
    } finally {
      setSalvando(false);
    }
  }

  async function confirmarCancelamento() {
    if (!token) return;
    setSalvando(true);
    setErro("");
    try {
      const atualizada = await visitaService.cancelar(token);
      setVisita(atualizada);
      setModo("visualizar");
      setSucesso("Agendamento cancelado.");
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível cancelar.");
    } finally {
      setSalvando(false);
    }
  }

  return {
    visita,
    carregando,
    erro,
    setErro,
    modo,
    podeAlterar,
    dataSelecionada,
    setDataSelecionada,
    slotSelecionado,
    setSlotSelecionado,
    slots,
    carregandoSlots,
    erroSlots,
    observacoes,
    setObservacoes,
    salvando,
    sucesso,
    statusLabel: visita ? STATUS_LABEL[visita.status] : "",
    iniciarReagendamento,
    iniciarCancelamento,
    voltarVisualizar,
    confirmarReagendamento,
    confirmarCancelamento,
  };
}

export function formatarDataHoraVisita(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function dataMinimaAgendamento(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

export function dataMaximaAgendamento(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().slice(0, 10);
}

export function formatarHorarioSlot(horario: string): string {
  const [h, m] = horario.split(":");
  return `${h}h${m !== "00" ? m : ""}`;
}
