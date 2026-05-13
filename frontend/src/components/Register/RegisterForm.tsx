import { useState } from "react";

interface RegisterFormProps {
  onSubmit: (
    nome: string,
    email: string,
    senha: string,
    telefone: string,
  ) => Promise<void>;
  onSwitchToLogin: () => void;
  loading: boolean;
  error: string;
}

export function RegisterForm({
  onSubmit,
  onSwitchToLogin,
  loading,
}: RegisterFormProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    await onSubmit(nome, email, senha, telefone);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Nome */}
      <div className="flex flex-col gap-2">
        <label htmlFor="nome" className="text-brown font-medium text-sm">
          Nome completo
        </label>
        <input
          id="nome"
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={loading}
          className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors disabled:opacity-50"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email-cadastro"
          className="text-brown font-medium text-sm"
        >
          E-mail
        </label>
        <input
          id="email-cadastro"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors disabled:opacity-50"
        />
      </div>

      {/* Telefone */}
      <div className="flex flex-col gap-2">
        <label htmlFor="telefone" className="text-brown font-medium text-sm">
          Telefone
        </label>
        <input
          id="telefone"
          type="tel"
          placeholder="(00) 00000-0000"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          disabled={loading}
          className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors disabled:opacity-50"
        />
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="senha-cadastro"
          className="text-brown font-medium text-sm"
        >
          Senha
        </label>
        <div className="relative">
          <input
            id="senha-cadastro"
            type={mostrarSenha ? "text" : "password"}
            placeholder="Mínimo 6 caracteres"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            disabled={loading}
            className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 pr-12 text-body font-medium text-sm outline-none focus:border-orange transition-colors disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setMostrarSenha(!mostrarSenha)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-body/40 hover:text-brown transition-colors text-sm"
          >
            {mostrarSenha ? "🙈" : "👁️"}
          </button>
        </div>
      </div>

      {/* Confirmar Senha */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="confirmar-senha"
          className="text-brown font-medium text-sm"
        >
          Confirmar senha
        </label>
        <input
          id="confirmar-senha"
          type="password"
          placeholder="Repita a senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          disabled={loading}
          className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors disabled:opacity-50"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-brown text-white font-medium py-3.5 rounded-full cursor-pointer hover:bg-orange transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Criando conta..." : "Criar conta"}
      </button>

      {/* Switch to Login */}
      <p className="text-center text-body/50 text-sm font-medium">
        Já tem conta?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-orange font-semibold hover:underline"
        >
          Fazer login
        </button>
      </p>
    </form>
  );
}
