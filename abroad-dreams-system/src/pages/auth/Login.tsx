import { yupResolver } from "@hookform/resolvers/yup";
import { m } from "framer-motion";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Page } from "../../components/Page";
import { RHFInput } from "../../components/RHFInput";
import useSnackbar from "../../hooks/useSnackbar";
import { validateUser } from "../../redux/slices/user";
import { useDispatch, useSelector } from "../../redux/store";
import "../../styles/login.scss";

type FormValuesProps = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { openSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const { selectedUser, users } = useSelector((state) => state.user);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email("E-mail must be a valid e-mail address")
      .required("E-mail is mandatory"),
    password: Yup.string().required("Password is mandatory"),
  });

  const defaultValues = {
    email: selectedUser?.email || undefined,
    password: undefined,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const { reset, handleSubmit, watch } = methods;
  const values = watch();

  const onSubmit = async () => {
    try {
      dispatch(validateUser(values));
      openSnackbar({ type: "success", message: "Login Successful" });
      navigate("/dashboard");
    } catch (error: any) {
      openSnackbar({
        type: "error",
        message: error?.message || "Login Error",
      });
      reset();
    }
  };

  return (
    <Page title="Login" notLogged>
      <FormProvider {...methods}>
        <m.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeIn", duration: 0.3 }}
          exit={{ opacity: 0 }}
          onSubmit={handleSubmit(onSubmit)}
          className="card login"
        >
          {users.findIndex((user) => user.id === "1") !== -1 &&
          users.length === 1 ? (
            <div
              className="tooltip"
              onClick={() => setShowTooltip(!showTooltip)}
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              ?
              {showTooltip ? (
                <p className="tooltip-text">
                  Use 'admin@gmail.com' as email and 'password' as password, or
                  create a new account
                </p>
              ) : null}
            </div>
          ) : null}
          <h2 className="title">Welcome To Login</h2>
          <RHFInput name="email" placeholder="E-mail" />
          <RHFInput name="password" type="password" placeholder="Password" />
          {/* <p
            className="highlight-text"
            onClick={() => navigate("/forgot-password")}
          >
            Esqueci minha senha
          </p> */}
          <button className="button-primary" type="submit">
            Login
          </button>
          <p>
            <center> Need an account?{" "}
            <b
              className="highlight-text"
              onClick={() => navigate("/create-account")}
            >
              Register
            </b></center>
          </p>
        </m.form>
      </FormProvider>
    </Page>
  );
}
