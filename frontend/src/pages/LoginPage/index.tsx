import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type Tela = "login" | "cadastro" | "esqueci-senha";

export function LoginPage() {
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [tela, setTela] = useState<Tela>("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);

    try {
      await login({ email, senha });
      if (isAdmin) {
        navigate("/admin");
      } else {
        navigate("/cliente");
      }
    } catch {
      setErro("Email ou senha incorretos.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setErro("");

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    try {
      await fetch("http://localhost:8080/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, telefone }),
      });
      setSucesso("Cadastro realizado! Faça login para continuar.");
      setTela("login");
    } catch {
      setErro("Erro ao criar conta. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  async function handleEsqueciSenha(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      // TODO: implementar endpoint de recuperação de senha
      setSucesso(
        "Se este email estiver cadastrado, você receberá as instruções em breve.",
      );
    } finally {
      setCarregando(false);
    }
  }

  function trocarTela(novaTela: Tela) {
    setErro("");
    setSucesso("");
    setTela(novaTela);
  }

  return (
    <main className="login-page min-h-screen bg-cream flex">
      {/* Lado esquerdo — visual */}
      <div className="login-visual hidden lg:flex w-1/2 bg-gradient-brown flex-col items-center justify-between p-16 relative overflow-hidden">
        <div className="absolute top-[-60px] left-[-60px] w-[300px] h-[300px] rounded-full bg-white/5" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[350px] h-[350px] rounded-full bg-white/5" />

        <Link to="/" className="flex flex-row items-center gap-3 z-10">
          <div className="w-10 h-10 rounded-full bg-orange flex items-center justify-center shrink-0">
            <span className="text-white font-bold text-sm">C</span>
          </div>
          <span className="font-cmas-play text-white text-lg">
            Canil Alto da Bela Vista
          </span>
        </Link>

        <div className="flex flex-col items-center gap-6 z-10 text-center">
          <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center">
            <span className="text-6xl">🐾</span>
          </div>
          <h2 className="font-cmas-play text-white text-4xl leading-tight">
            {tela === "login" && (
              <>
                Bem-vindo <br /> de volta
              </>
            )}
            {tela === "cadastro" && (
              <>
                Crie sua <br /> conta
              </>
            )}
            {tela === "esqueci-senha" && (
              <>
                Recupere <br /> seu acesso
              </>
            )}
          </h2>
          <p className="text-white/60 font-medium text-base max-w-xs">
            Gerencie suas reservas, acompanhe seu filhote e muito mais.
          </p>
        </div>

        <div className="flex flex-row items-center gap-6 z-10">
          <div className="flex flex-col items-center gap-1">
            <span className="font-cmas-play text-white text-2xl">47+</span>
            <span className="text-white/50 text-xs font-medium">Clientes</span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-cmas-play text-white text-2xl">8</span>
            <span className="text-white/50 text-xs font-medium">
              Disponíveis
            </span>
          </div>
          <div className="w-px h-8 bg-white/20" />
          <div className="flex flex-col items-center gap-1">
            <span className="font-cmas-play text-white text-2xl">13+</span>
            <span className="text-white/50 text-xs font-medium">Anos</span>
          </div>
        </div>
      </div>

      {/* Lado direito — formulário */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="font-cmas-play text-brown text-4xl">
              {tela === "login" && "Bem-vindo"}
              {tela === "cadastro" && "Criar conta"}
              {tela === "esqueci-senha" && "Recuperar senha"}
            </h1>
            <p className="text-body/60 font-medium text-base">
              {tela === "login" && "Entre com suas credenciais para acessar."}
              {tela === "cadastro" && "Preencha os dados para criar sua conta."}
              {tela === "esqueci-senha" &&
                "Informe seu email para recuperar o acesso."}
            </p>
          </div>

          {/* Feedback */}
          {erro && (
            <p className="text-red-500 text-sm font-medium bg-red-50 px-4 py-3 rounded-xl">
              {erro}
            </p>
          )}
          {sucesso && (
            <p className="text-green-600 text-sm font-medium bg-green-50 px-4 py-3 rounded-xl">
              {sucesso}
            </p>
          )}

          {/* Tela Login */}
          {tela === "login" && (
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-brown font-medium text-sm"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={carregando}
                  className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between">
                  <label
                    htmlFor="senha"
                    className="text-brown font-medium text-sm"
                  >
                    Senha
                  </label>
                  <button
                    type="button"
                    onClick={() => trocarTela("esqueci-senha")}
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
                    disabled={carregando}
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

              <button
                type="submit"
                disabled={carregando}
                className="bg-brown text-white font-medium py-3.5 rounded-full cursor-pointer hover:bg-orange transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Entrando..." : "Entrar"}
              </button>

              <div className="flex flex-row items-center gap-4">
                <div className="flex-1 h-px bg-brown/10" />
                <span className="text-body/40 text-xs font-medium">ou</span>
                <div className="flex-1 h-px bg-brown/10" />
              </div>

              {/* Google — preparado para implementação futura */}
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

              <p className="text-center text-body/50 text-sm font-medium">
                Não tem conta?{" "}
                <button
                  type="button"
                  onClick={() => trocarTela("cadastro")}
                  className="text-orange font-semibold hover:underline"
                >
                  Criar conta
                </button>
              </p>
            </form>
          )}

          {/* Tela Cadastro */}
          {tela === "cadastro" && (
            <form onSubmit={handleCadastro} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="nome"
                  className="text-brown font-medium text-sm"
                >
                  Nome completo
                </label>
                <input
                  id="nome"
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={carregando}
                  className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
                />
              </div>

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
                  disabled={carregando}
                  className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="telefone"
                  className="text-brown font-medium text-sm"
                >
                  Telefone
                </label>
                <input
                  id="telefone"
                  type="tel"
                  placeholder="(00) 00000-0000"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  disabled={carregando}
                  className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
                />
              </div>

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
                    disabled={carregando}
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
                  disabled={carregando}
                  className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="bg-brown text-white font-medium py-3.5 rounded-full cursor-pointer hover:bg-orange transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Criando conta..." : "Criar conta"}
              </button>

              <p className="text-center text-body/50 text-sm font-medium">
                Já tem conta?{" "}
                <button
                  type="button"
                  onClick={() => trocarTela("login")}
                  className="text-orange font-semibold hover:underline"
                >
                  Fazer login
                </button>
              </p>
            </form>
          )}

          {/* Tela Esqueci Senha */}
          {tela === "esqueci-senha" && (
            <form onSubmit={handleEsqueciSenha} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email-recuperacao"
                  className="text-brown font-medium text-sm"
                >
                  E-mail cadastrado
                </label>
                <input
                  id="email-recuperacao"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={carregando}
                  className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={carregando}
                className="bg-brown text-white font-medium py-3.5 rounded-full cursor-pointer hover:bg-orange transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {carregando ? "Enviando..." : "Enviar instruções"}
              </button>

              <p className="text-center text-body/50 text-sm font-medium">
                Lembrou a senha?{" "}
                <button
                  type="button"
                  onClick={() => trocarTela("login")}
                  className="text-orange font-semibold hover:underline"
                >
                  Voltar ao login
                </button>
              </p>
            </form>
          )}

          <div className="flex flex-row items-center gap-4">
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
