import { navLogo } from "../assets/images/index.ts";
import {arrowRight, hamburger} from "../assets/icons";



import { navLinks } from "../constants";

import type { INavLink } from "../types";
import Button from "./Button.tsx";



const Nav = () => {
  return (
    <header className="padding-x py-8 absolute z-10 w-full">
      <nav className="flex justify-between items-center max-container">
        <a href="/">
          <img src={navLogo} alt="Logo" width={400} height={100} />
        </a>
        <ul className="flex-1 flex justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item: INavLink) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="hidden max-lg:block">
          <img src={hamburger} alt="Hamburger" width={25} height={25} />
        </div>

          <Button label="Login" iconUrl={arrowRight} to={"http://localhost:5173/"} />
      </nav>
    </header>
  );
};

export default Nav;
