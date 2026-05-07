import salsichasNossoCanilImg from "../../assets/salsichasNossoCanil.png";

export function NossoCanil() {
  return (
    <section className="section-nosso-canil mx-36 py-20 flex items-center justify-between gap-5 mb-20">
      <div className="nosso-canil-info w-1/2 flex flex-col gap-6">
        <h2 className="font-cmas-play text-4xl text-brown">NOSSO CANIL</h2>
        <h3 className="font-cmas-play text-3xl text-orange">
          CANIL ALTO DA BELA VISTA
        </h3>

        <p className="text-base font-medium">
          Desde 2011, o Canil Alto da Bela Vista tem levado alegria e
          companheirismo a inúmeras famílias, oferecendo filhotes lindos,
          saudáveis e com temperamento excepcional.
          <br /> <br />
          Nosso compromisso é com a saúde, o bem-estar, o aperfeiçoamento
          genético e a seleção comportamental de cada exemplar.
          <br /> <br />
          Criamos cães pelo longo, pelo curto, miniatura e kaninchen.
        </p>

        <div className="nosso-canil-tags flex gap-4">
          <span className="bg-brown text-white font-medium rounded-2xl py-2 px-4">
            Pelo curto
          </span>
          <span className="bg-brown text-white font-medium rounded-2xl py-2 px-4">
            Pelo longo
          </span>
          <span className="bg-brown text-white font-medium rounded-2xl py-2 px-4">
            Miniatura
          </span>
          <span className="bg-brown text-white font-medium rounded-2xl py-2 px-4">
            Kaninchen
          </span>
        </div>
      </div>

      <div className="nosso-canil-imagem w-1/2">
        <img
          src={salsichasNossoCanilImg}
          className="w-full object-cover"
          alt="Dachshunds do Canil Alto da Bela Vista"
        />
      </div>
    </section>
  );
}
