
import Button from "../components/Button.tsx";
import { arrowRight } from "../assets/icons";
import { homeImage } from "../assets/images";


const Hero = () => {


  return (
    <section
      id="home"
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40  bg-hero bg-cover bg-center">
        <img
            src={homeImage}
            alt="student application"
            width={608}
            height={594}
            className="object-contain relative z-10"
        />

      </div>

      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full max-xl:padding-x pt-28">
        <p className="text-xl font-montserrat text-coral-red">
          Streamlining Your Journey to Study Abroad!
        </p>
        <h1 className="mt-10 font-palanquin text-4xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
            New Platform for
          </span>
          <br />
          <span className="text-coral-red inline-block mt-3">Abroad Studies</span> Application Management
        </h1>
        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-14 sm:max-w-sm">
          A web portal designed to handle activities performed at an educational consultancy, saving all the trouble of organizing and maintaining various kinds of resources from anywhere.
        </p>
        <Button label="Start Your Journey" iconUrl={arrowRight} to={"http://localhost:5173/#/create-account"}/>

      </div>

    </section>
  );
};

export default Hero;
