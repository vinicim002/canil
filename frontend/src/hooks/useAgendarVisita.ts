import { useCallback, useEffect, useState } from "react";
import { visitaService } from "../services/visitaService";
import type { SlotDisponivel, VisitaResponse } from "../types/visita";

interface FormState {
  nome: string;
  email: string;
  telefone: string;
  observacoes: string;
}

const formInicial: FormState = {
  nome: "",
  email: "",
  telefone: "",
  observacoes: "",
};

function dataMinima(): string {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function dataMaxima(): string {
  const d = new Date();
  d.setDate(d.getDate() + 60);
  return d.toISOString().slice(0, 10);
}

function formatarDataHoraApi(data: string, slot: SlotDisponivel): string {
  if (slot.dataHora) return slot.dataHora;
  return `${data}T${slot.horario}:00`;
}

export function useAgendarVisita() {
  const [form, setForm] = useState<FormState>(formInicial);
  const [dataSelecionada, setDataSelecionada] = useState("");
  const [slotSelecionado, setSlotSelecionado] = useState<SlotDisponivel | null>(
    null,
  );
  const [slots, setSlots] = useState<SlotDisponivel[]>([]);
  const [carregandoSlots, setCarregandoSlots] = useState(false);
  const [carregandoEnvio, setCarregandoEnvio] = useState(false);
  const [erroSlots, setErroSlots] = useState("");
  const [erroGeral, setErroGeral] = useState("");
  const [erros, setErros] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [visitaCriada, setVisitaCriada] = useState<VisitaResponse | null>(null);

  const carregarSlots = useCallback(async (data: string) => {
    if (!data) return;
    setCarregandoSlots(true);
    setErroSlots("");
    setSlotSelecionado(null);
    try {
      const resposta = await visitaService.listarSlots(data);
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
  }, []);

  useEffect(() => {
    if (dataSelecionada) {
      carregarSlots(dataSelecionada);
    }
  }, [dataSelecionada, carregarSlots]);

  function atualizar(campo: keyof FormState, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: undefined }));
    setErroGeral("");
  }

  function selecionarData(data: string) {
    setDataSelecionada(data);
    setErroGeral("");
  }

  function selecionarSlot(slot: SlotDisponivel) {
    setSlotSelecionado(slot);
    setErroGeral("");
  }

  function validar(): boolean {
    const novos: Partial<Record<keyof FormState, string>> = {};
    if (!form.nome.trim()) novos.nome = "Informe seu nome.";
    if (!form.email.trim()) {
      novos.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      novos.email = "E-mail inválido.";
    }
    if (!form.telefone.trim()) {
      novos.telefone = "Informe seu telefone.";
    } else if (form.telefone.replace(/\D/g, "").length < 10) {
      novos.telefone = "Telefone inválido.";
    }
    setErros(novos);
    if (Object.keys(novos).length > 0) return false;
    if (!dataSelecionada) {
      setErroGeral("Selecione uma data.");
      return false;
    }
    if (!slotSelecionado) {
      setErroGeral("Selecione um horário.");
      return false;
    }
    return true;
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setVisitaCriada(null);
    if (!validar()) return;

    setCarregandoEnvio(true);
    setErroGeral("");
    try {
      const visita = await visitaService.criar({
        nome: form.nome.trim(),
        email: form.email.trim(),
        telefone: form.telefone.trim(),
        dataHora: formatarDataHoraApi(dataSelecionada, slotSelecionado!),
        observacoes: form.observacoes.trim() || undefined,
      });
      setVisitaCriada(visita);
      setForm(formInicial);
      setDataSelecionada("");
      setSlotSelecionado(null);
      setSlots([]);
    } catch (err) {
      setErroGeral(
        err instanceof Error ? err.message : "Não foi possível agendar.",
      );
    } finally {
      setCarregandoEnvio(false);
    }
  }

  return {
    form,
    erros,
    dataSelecionada,
    dataMinima: dataMinima(),
    dataMaxima: dataMaxima(),
    slots,
    slotSelecionado,
    carregandoSlots,
    carregandoEnvio,
    erroSlots,
    erroGeral,
    visitaCriada,
    atualizar,
    selecionarData,
    selecionarSlot,
    enviar,
  };
}
