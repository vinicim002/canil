import dogImg from "../../assets/img-banner-dachshund.png";
import coracaoImg from "../../assets/coracao.png";

export function Hero() {
  return (
    <section className="hero relative bg-cream flex items-center justify-center flex-col h-screen overflow-hidden">
      <div className="hero-info flex flex-col items-center gap-8 justify-center z-10">
        <h1 className="text-5xl font-bold font-cmas-play text-brown">
          CANIL ALTO DA BELA VISTA
        </h1>
        <h2 className="text-3xl font-semibold">QUALIDADE EM DACHSHUND</h2>
        <p className="text-base font-medium">DESDE 2011</p>
        <button className="bg-brown text-white py-3 px-6 rounded-full cursor-pointer font-medium">
          VER FILHOTES DISPONÍVEIS
        </button>
      </div>

      <div className="hero-imagem absolute bottom-0 left-1/2 -translate-x-1/2">
        <div className="hero-circulos">
          <div className="absolute -z-10 top-[400px] right-[920px] w-[600px] h-[600px] rounded-full bg-orange" />
          <div className="absolute -z-10 top-[280px] left-[720px] w-[600px] h-[600px] rounded-full bg-orange" />
          <div className="absolute -z-10 top-[40px] left-[1080px] w-[600px] h-[600px] rounded-full bg-orange" />
          <div className="absolute -z-10 top-[400px] left-[400px] w-[400px] h-[400px] rounded-full bg-orange" />
        </div>

        <div className="hero-coracoes">
          <img
            id="heart-1"
            src={coracaoImg}
            className="absolute z-10 bottom-[38%] left-[12%] w-[14%]"
            alt=""
          />
          <img
            id="heart-2"
            src={coracaoImg}
            className="absolute z-10 bottom-[38%] left-[36%] w-[12%]"
            alt=""
          />
          <img
            id="heart-3"
            src={coracaoImg}
            className="absolute z-10 bottom-[30%] left-[57%] w-[7%]"
            alt=""
          />
          <img
            id="heart-4"
            src={coracaoImg}
            className="absolute z-10 bottom-[30%] left-[68%] w-[10%]"
            alt=""
          />
        </div>

        <img
          src={dogImg}
          className="relative z-10"
          alt="Dachshund do Canil Alto da Bela Vista"
        />
      </div>
    </section>
  );
}
