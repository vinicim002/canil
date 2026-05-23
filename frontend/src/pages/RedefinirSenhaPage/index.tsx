import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { authService } from "../../services/authService";
import { LoginVisual } from "../../components/LoginVisual/LoginVisual";
import { FeedbackMessage } from "../../components/FeedbackMessage/FeedbackMessage";

export function RedefinirSenhaPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token") ?? "";

  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso("");

    if (!token) {
      setErro("Link inválido. Solicite uma nova recuperação de senha.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres.");
      return;
    }
    if (senha !== confirmar) {
      setErro("As senhas não coincidem.");
      return;
    }

    setCarregando(true);
    try {
      const res = await authService.resetPassword(token, senha);
      setSucesso(res.mensagem);
      setTimeout(() => navigate("/login"), 2500);
    } catch {
      setErro("Link inválido ou expirado. Solicite uma nova recuperação.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="login-page min-h-screen bg-cream flex">
      <LoginVisual tela="esqueci-senha" />
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md flex flex-col gap-6">
          <h1 className="font-cmas-play text-brown text-3xl">Nova senha</h1>
          <p className="text-body/70 text-sm">
            Defina uma nova senha para acessar sua conta.
          </p>

          {erro && <FeedbackMessage type="error" message={erro} />}
          {sucesso && <FeedbackMessage type="success" message={sucesso} />}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col gap-1 text-sm font-medium text-brown">
              Nova senha
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="rounded-xl border border-brown/20 px-4 py-3"
                minLength={6}
                required
              />
            </label>
            <label className="flex flex-col gap-1 text-sm font-medium text-brown">
              Confirmar senha
              <input
                type="password"
                value={confirmar}
                onChange={(e) => setConfirmar(e.target.value)}
                className="rounded-xl border border-brown/20 px-4 py-3"
                minLength={6}
                required
              />
            </label>
            <button
              type="submit"
              disabled={carregando}
              className="bg-brown text-white font-medium py-3 rounded-full hover:bg-orange transition-colors disabled:opacity-60"
            >
              {carregando ? "Salvando…" : "Redefinir senha"}
            </button>
          </form>

          <Link to="/login" className="text-orange text-sm font-medium hover:underline">
            Voltar ao login
          </Link>
        </div>
      </div>
    </main>
  );
}
