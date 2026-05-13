import { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, senha: string) => Promise<void>;
  onForgotPassword: () => void;
  onSwitchToRegister: () => void;
  loading: boolean;
  error: string;
}

export function LoginForm({
  onSubmit,
  onForgotPassword,
  onSwitchToRegister,
  loading,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await onSubmit(email, senha);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-brown font-medium text-sm">
          E-mail
        </label>
        <input
          id="email"
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors disabled:opacity-50"
        />
      </div>

      {/* Senha */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <label htmlFor="senha" className="text-brown font-medium text-sm">
            Senha
          </label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-orange text-xs font-medium hover:underline"
          >
            Esqueci minha senha
          </button>
        </div>
        <div className="relative">
          <input
            id="senha"
            type={mostrarSenha ? "text" : "password"}
            placeholder="••••••••"
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

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-brown text-white font-medium py-3.5 rounded-full cursor-pointer hover:bg-orange transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>

      {/* Divider */}
      <div className="flex flex-row items-center gap-4">
        <div className="flex-1 h-px bg-brown/10" />
        <span className="text-body/40 text-xs font-medium">ou</span>
        <div className="flex-1 h-px bg-brown/10" />
      </div>

      {/* Google Button (futuro) */}
      <button
        type="button"
        disabled
        className="w-full flex flex-row items-center justify-center gap-3 border border-brown/20 rounded-full py-3 text-body/40 text-sm font-medium cursor-not-allowed relative"
        title="Em breve"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continuar com Google
        <span className="absolute -top-2 -right-2 bg-orange text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
          Em breve
        </span>
      </button>

      {/* Switch to Register */}
      <p className="text-center text-body/50 text-sm font-medium">
        Não tem conta?{" "}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-orange font-semibold hover:underline"
        >
          Criar conta
        </button>
      </p>
    </form>
  );
}