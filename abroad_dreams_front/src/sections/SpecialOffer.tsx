import Button from "../components/Button";

import { arrowRight } from "../assets/icons";
import { studentsupportImage} from "../assets/images";

const SpecialOffer = () => {
  return (
    <section className="flex justify-wrap items-center max-xl:flex-col-reverse gap-10 max-container">
      <div className="flex-1">
        <img
          src={studentsupportImage}
          alt="Scholarship & Student Support"
          width={773}
          height={687}
          className="object-contain w-full"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          <span className="text-coral-red">Scholarships </span> & Student Support
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          Embark on a journey with Abroad Dreams' scholarships and dedicated student support. Our financial aid and assistance ensure a smooth transition for academic success in your dream educational journey abroad.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          Fulfill your unique desires with our commitment to surpassing the loftiest expectations, ensuring an extraordinary academic experience abroad.
        </p>
        <div className="mt-11 flex flex-wrap gap-4">
          <Button label="Learn More!" iconUrl={arrowRight} />
        </div>
      </div>
    </section>
  )
}

export default SpecialOffer
