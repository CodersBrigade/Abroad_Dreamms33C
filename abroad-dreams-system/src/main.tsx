import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/lib/integration/react";
import MotionLazyContainer from "./components/animate/MotionLazyContainer";
import { SnackbarProvider } from "./context/SnackbarContext";
import Loading from "./pages/Loading";
import { persistor, store } from "./redux/store";
import { router } from "./routes";
import "./styles/global.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<Loading />}>
        <MotionLazyContainer>
          <SnackbarProvider>
            <ReduxProvider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
              </PersistGate>
            </ReduxProvider>
          </SnackbarProvider>
        </MotionLazyContainer>
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);
