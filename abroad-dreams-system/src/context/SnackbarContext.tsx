import roundClose from "@iconify/icons-ic/round-close";
import roundWarningAmber from "@iconify/icons-ic/round-warning-amber";
import checkCircleOutlineRounded from "@iconify/icons-material-symbols/check-circle-outline-rounded";
import closeCircleLine from "@iconify/icons-mingcute/close-circle-line";
import { Icon } from "@iconify/react";
import { AnimatePresence, m } from "framer-motion";
import { createContext, ReactNode, useState } from "react";
import "../styles/snackbar.scss";

// ----------------------------------------------------------------------

export type SnackbarContextProps = {
  openSnackbar: ({
    type,
    message,
  }: {
    type: "success" | "error" | "warning";
    message?: string | undefined;
  }) => void;
};

const initialState: SnackbarContextProps = {
  openSnackbar: () => {},
};

const SnackbarContext = createContext(initialState);

type SnackbarProviderProps = {
  children: ReactNode;
};

function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [snackbar, setSnackbar] = useState<{
    show: boolean;
    type: "success" | "error" | "warning" | undefined;
    message: string | undefined;
  }>({
    show: false,
    type: undefined,
    message: undefined,
  });

  const openSnackbar = ({
    type,
    message,
  }: {
    type: "success" | "error" | "warning";
    message?: string;
  }) => {
    setSnackbar({ ...snackbar, show: true, type, message });
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <AnimatePresence>
        {snackbar.show ? (
          <m.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.3 }}
            className={`snackbar ${snackbar.type}`}
          >
            <Icon
              icon={
                snackbar.type === "success"
                  ? checkCircleOutlineRounded
                  : "warning"
                  ? roundWarningAmber
                  : closeCircleLine
              }
              height={20}
              width={20}
            />
            <p>
              {snackbar.message ||
                (snackbar.type === "success"
                  ? "Sucesso"
                  : "warning"
                  ? "Cuidado"
                  : "Erro")}
            </p>
            <Icon
              icon={roundClose}
              height={20}
              width={20}
              onClick={() => setSnackbar({ ...snackbar, show: false })}
              style={{ cursor: "pointer" }}
            />
          </m.div>
        ) : null}
      </AnimatePresence>
    </SnackbarContext.Provider>
  );
}

export { SnackbarProvider, SnackbarContext };
