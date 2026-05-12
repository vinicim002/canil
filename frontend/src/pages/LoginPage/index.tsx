import { useState } from "react";
import { Link } from "react-router-dom";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ email, senha });
  }

  return (
    <main className="login-page min-h-screen bg-cream flex">

      {/* Lado esquerdo — visual */}
      <div className="login-visual hidden lg:flex w-1/2 bg-gradient-brown flex-col items-center justify-between p-16 relative overflow-hidden">

        <div className="login-visual-decoracao-topo absolute top-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-white/5" />
        <div className="login-visual-decoracao-base absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-white/5" />

        <Link to="/" className="login-visual-logo flex flex-row items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-cmas-play text-white text-lg">Canil Alto da Bela Vista</span>
        </Link>

        <div className="login-visual-centro flex flex-col items-center gap-6 z-10 text-center">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-6xl">🐾</span>
          </div>
          <h2 className="font-cmas-play text-white text-4xl leading-tight">
            Area <br /> Administrativa
          </h2>
          <p className="text-white/60 font-medium text-base max-w-xs">
            Gerencie seus cães, reservas, clientes e muito mais em um só lugar.
          </p>
        </div>

        <div className="login-visual-rodape flex flex-row items-center gap-6 z-10">
          <div className="flex flex-col items-center gap-1">
            <span className="font-cmas-play text-white text-2xl">47+</span>
            <span className="text-white/50 text-xs font-medium">Clientes</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-cmas-play text-white text-2xl">8</span>
            <span className="text-white/50 text-xs font-medium">Disponíveis</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-cmas-play text-white text-2xl">13+</span>
            <span className="text-white/50 text-xs font-medium">Anos</span>
          </div>
        </div>

      </div>

      {/* Lado direito — formulário */}
      <div className="login-formulario w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md flex flex-col gap-8">

          <div className="login-header flex flex-col gap-2">
            <h1 className="font-cmas-play text-brown text-4xl">Bem-vindo</h1>
            <p className="text-body/60 font-medium text-base">
              Entre com suas credenciais para acessar o painel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form flex flex-col gap-5">

            <div className="login-campo flex flex-col gap-2">
              <label htmlFor="email" className="text-brown font-medium text-sm">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
              />
            </div>

            <div className="login-campo flex flex-col gap-2">
              <div className="flex flex-row items-center justify-between">
                <label htmlFor="senha" className="text-brown font-medium text-sm">
                  Senha
                </label>
                <button
                  type="button"
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
                  className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 pr-12 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
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

            <button
              type="submit"
              className="bg-brown text-white font-medium py-3.5 px-8 rounded-full cursor-pointer hover:bg-orange transition-colors w-full mt-2"
            >
              Entrar
            </button>

          </form>

          <div className="login-divider flex flex-row items-center gap-4">
            <div className="flex-1 h-px bg-brown/10" />
            <span className="text-body/40 text-xs font-medium">ou</span>
            <div className="flex-1 h-px bg-brown/10" />
          </div>

          <Link
            to="/"
            className="flex flex-row items-center justify-center gap-2 text-body/50 text-sm font-medium hover:text-brown transition-colors"
          >
            <span>←</span>
            <span>Voltar para o site</span>
          </Link>

        </div>
      </div>

    </main>
  );
}