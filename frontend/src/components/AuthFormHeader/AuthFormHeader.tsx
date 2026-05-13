type Tela = "login" | "cadastro" | "esqueci-senha";

interface AuthFormHeaderProps {
  tela: Tela;
}

export function AuthFormHeader({ tela }: AuthFormHeaderProps) {
  const titles = {
    login: "Bem-vindo",
    cadastro: "Criar conta",
    "esqueci-senha": "Recuperar senha",
  };

  const descriptions = {
    login: "Entre com suas credenciais para acessar.",
    cadastro: "Preencha os dados para criar sua conta.",
    "esqueci-senha": "Informe seu email para recuperar o acesso.",
  };

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-cmas-play text-brown text-4xl">{titles[tela]}</h1>
      <p className="text-body/60 font-medium text-base">{descriptions[tela]}</p>
    </div>
  );
}