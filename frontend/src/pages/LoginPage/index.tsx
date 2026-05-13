import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { LoginVisual } from "../../components/LoginVisual/LoginVisual";
import { AuthFormHeader } from "../../components/AuthFormHeader/AuthFormHeader";
import { FeedbackMessage } from "../../components/FeedbackMessage/FeedbackMessage";
import { LoginForm } from "../../components/Login/LoginForm";
import { RegisterForm } from "../../components/Register/RegisterForm";
import { ForgotPasswordForm } from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import { LoginPageFooter } from "../../components/LoginPageFooter/LoginPageFooter";

type Tela = "login" | "cadastro" | "esqueci-senha";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [tela, setTela] = useState<Tela>("login");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [carregando, setCarregando] = useState(false);

  // Handle Login
  async function handleLogin(email: string, senha: string) {
    setErro("");
    setCarregando(true);

    try {
      const response = await login({ email, senha });
      if (response.role === "ADMIN") {
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

  // Handle Register
  async function handleRegister(
    nome: string,
    email: string,
    senha: string,
    telefone: string,
  ) {
    setErro("");
    setCarregando(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha, telefone }),
      });

      if (!response.ok) {
        throw new Error("Erro ao registrar");
      }

      setSucesso("Cadastro realizado! Faça login para continuar.");
      setTela("login");
      setErro("");
    } catch {
      setErro("Erro ao criar conta. Tente novamente.");
    } finally {
      setCarregando(false);
    }
  }

  // Handle Forgot Password
  async function handleForgotPassword(email: string) {
    // O parâmetro chega aqui
    setErro("");
    setCarregando(true);

    try {
      // Para o ESLint parar de reclamar, podemos logar o email
      // ou apenas aceitar que ele será usado no futuro.
      console.log("Recuperação para:", email);

      setSucesso(
        "Se este email estiver cadastrado, você receberá as instruções em breve.",
      );
    } finally {
      setCarregando(false);
    }
  }

  // Switch Screen
  function trocarTela(novaTela: Tela) {
    setErro("");
    setSucesso("");
    setTela(novaTela);
  }

  return (
    <main className="login-page min-h-screen bg-cream flex">
      {/* Left Visual Side */}
      <LoginVisual tela={tela} />

      {/* Right Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* Header */}
          <AuthFormHeader tela={tela} />

          {/* Feedback Messages */}
          {erro && <FeedbackMessage type="error" message={erro} />}
          {sucesso && <FeedbackMessage type="success" message={sucesso} />}

          {/* Forms */}
          {tela === "login" && (
            <LoginForm
              onSubmit={handleLogin}
              onForgotPassword={() => trocarTela("esqueci-senha")}
              onSwitchToRegister={() => trocarTela("cadastro")}
              loading={carregando}
              error={erro}
            />
          )}

          {tela === "cadastro" && (
            <RegisterForm
              onSubmit={handleRegister}
              onSwitchToLogin={() => trocarTela("login")}
              loading={carregando}
              error={erro}
            />
          )}

          {tela === "esqueci-senha" && (
            <ForgotPasswordForm
              onSubmit={handleForgotPassword}
              onSwitchToLogin={() => trocarTela("login")}
              loading={carregando}
              error={erro}
            />
          )}

          {/* Footer */}
          <LoginPageFooter />
        </div>
      </div>
    </main>
  );
}
