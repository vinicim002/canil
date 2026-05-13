interface ForgotPasswordFormProps {
  onSubmit: (email: string) => Promise<void>;
  onSwitchToLogin: () => void;
  loading: boolean;
  error: string;
}

export function ForgotPasswordForm({
  onSubmit,
  onSwitchToLogin,
  loading,
}: ForgotPasswordFormProps) {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    await onSubmit(email);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Email */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="email-recuperacao"
          className="text-brown font-medium text-sm"
        >
          E-mail cadastrado
        </label>
        <input
          id="email-recuperacao"
          name="email"
          type="email"
          placeholder="seu@email.com"
          disabled={loading}
          required
          className="w-full bg-white border border-brown/20 rounded-xl py-3 px-4 text-body font-medium text-sm outline-none focus:border-orange transition-colors disabled:opacity-50"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-brown text-white font-medium py-3.5 rounded-full cursor-pointer hover:bg-orange transition-colors w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Enviando..." : "Enviar instruções"}
      </button>

      {/* Switch to Login */}
      <p className="text-center text-body/50 text-sm font-medium">
        Lembrou a senha?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-orange font-semibold hover:underline"
        >
          Voltar ao login
        </button>
      </p>
    </form>
  );
}
