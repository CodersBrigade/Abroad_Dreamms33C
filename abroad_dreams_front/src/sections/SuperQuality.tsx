import Button from "../components/Button";

import {studentImage} from "../assets/images";

const SuperQuality = () => {
  return (
    <section
      id="about-us"
      className="flex justify-between items-center max-lg:flex-col gap-10 w-full max-container"
    >
      <div className="flex flex-1 flex-col">
        <h2 className="font-palanquin text-4xl capitalize font-bold lg:max-w-lg">
          We Are
          <span className="text-coral-red"> Professionals </span>
          <span className="text-coral-red">Fulfilling Abroad</span> Study Dreams
        </h2>
        <p className="mt-4 lg:max-w-lg info-text">
          Abroad Dreams, your go-to education consultancy platform, simplifies the journey to study abroad. With a wealth of experience, we've assisted over a thousand students and parents in selecting the ideal program, navigating applications, securing admissions, and managing travel logistics.
        </p>
        <p className="mt-6 lg:max-w-lg info-text">
          As your trusted portal, we work with renowned language tutors and over 300 universities worldwide. Let Abroad Dreams turn your study abroad aspirations into reality seamlessly.
        </p>
        <div className="mt-11">
          <Button label="Visit Us" />
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center">
        <img
          src={studentImage}
          alt="Students"
          width={650}
          height={529}
          className="object-contain"
        />
      </div>
    </section>
  )
}

export default SuperQuality
