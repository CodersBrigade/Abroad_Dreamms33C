import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import studentImage from '../../../assets/images/students-homepage.png';

const AboutUs = () => {
  return (
      <section id="about-us" className="container d-flex justify-content-between align-items-center flex-lg-row-reverse gap-10">
        <div className="flex-1 flex-lg-col">
          <h2 className="font-palanquin text-4xl capitalize font-bold">
            We Are
            <span className="text-success"> Professionals </span>
            <span className="text-success">Fulfilling Abroad</span> Study Dreams
          </h2>
          <p className="mt-4 info-text">
            Abroad Dreams, your go-to education consultancy platform, simplifies the journey to study abroad. With a wealth of experience, we've assisted over a thousand students and parents in selecting the ideal program, navigating applications, securing admissions, and managing travel logistics.
          </p>
          <p className="mt-6 info-text">
            As your trusted portal, we work with renowned language tutors and over 300 universities worldwide. Let Abroad Dreams turn your study abroad aspirations into reality seamlessly.
          </p>
          <div className="mt-11">
            <Button variant="primary">Visit Us</Button>
          </div>
        </div>

        <div className="flex-1 d-flex justify-content-center align-items-center">
          <img
              src={studentImage}
              alt="Students"
              className="img-fluid"
          />
        </div>
      </section>
  );
}

export default AboutUs;
