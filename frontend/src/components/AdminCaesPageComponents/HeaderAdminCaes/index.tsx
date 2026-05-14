interface HeaderAdminCaesProps {
  abrirAdicionar: () => void;
  quantidadeCaes: number;
}

export function HeaderAdminCaes({
  abrirAdicionar,
  quantidadeCaes,
}: HeaderAdminCaesProps) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-1">
        <h1 className="font-cmas-play text-brown text-3xl">Caes</h1>
        <p className="text-body/50 text-sm font-medium">
          {quantidadeCaes} cães cadastrados
        </p>
      </div>
      <button
        onClick={abrirAdicionar}
        className="bg-brown text-white font-medium py-2.5 px-6 rounded-full hover:bg-orange transition-colors cursor-pointer text-sm"
      >
        + Adicionar cão
      </button>
    </div>
  );
}
