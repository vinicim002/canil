import { useState } from "react";
import { contatoService, type ContatoRequest } from "../services/contatoService";

const ASSUNTOS_VALIDOS = [
  "Reservar filhote",
  "Dúvidas gerais",
  "Entrega e logística",
  "Política de garantia",
];

interface FormState {
  nome: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
}

const estadoInicial: FormState = {
  nome: "",
  email: "",
  telefone: "",
  assunto: "",
  mensagem: "",
};

export function useContatoForm() {
  const [form, setForm] = useState<FormState>(estadoInicial);
  const [erros, setErros] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erroGeral, setErroGeral] = useState("");

  function atualizar(campo: keyof FormState, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    setErros((prev) => ({ ...prev, [campo]: undefined }));
    setSucesso(false);
    setErroGeral("");
  }

  function validar(): boolean {
    const novosErros: Partial<Record<keyof FormState, string>> = {};

    if (!form.nome.trim()) novosErros.nome = "Informe seu nome.";
    if (!form.email.trim()) {
      novosErros.email = "Informe seu e-mail.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      novosErros.email = "E-mail inválido.";
    }
    if (!form.assunto.trim()) novosErros.assunto = "Selecione um assunto.";
    if (!form.mensagem.trim()) {
      novosErros.mensagem = "Escreva sua mensagem.";
    } else if (form.mensagem.trim().length < 10) {
      novosErros.mensagem = "Mensagem muito curta (mín. 10 caracteres).";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setSucesso(false);
    setErroGeral("");

    if (!validar()) return;

    const payload: ContatoRequest = {
      nome: form.nome.trim(),
      email: form.email.trim(),
      telefone: form.telefone.trim() || undefined,
      assunto: form.assunto,
      mensagem: form.mensagem.trim(),
    };

    setCarregando(true);
    try {
      await contatoService.enviar(payload);
      setSucesso(true);
      setForm(estadoInicial);
    } catch {
      setErroGeral(
        "Não foi possível enviar sua mensagem. Tente novamente em instantes.",
      );
    } finally {
      setCarregando(false);
    }
  }

  return {
    form,
    erros,
    carregando,
    sucesso,
    erroGeral,
    assuntos: ASSUNTOS_VALIDOS,
    atualizar,
    enviar,
  };
}
