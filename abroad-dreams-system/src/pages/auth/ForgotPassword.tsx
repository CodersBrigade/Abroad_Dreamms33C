import { m } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "../../components/Page";
import "../../styles/login.scss";

export default function ForgotPassword() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <Page title="Login" notLogged>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.3 }}
        exit={{ opacity: 0 }}
        className="card"
      >
        <h2 className="title">Forgot Password?</h2>
        <p className="subtitle">Reset password using email</p>
        <input type="email" placeholder="E-mail" />
        <button className="button-primary">Recover Account</button>
        <button className="button-secondary" onClick={() => navigate("/login")}>
          Login
        </button>
      </m.div>
    </Page>
  );
}
