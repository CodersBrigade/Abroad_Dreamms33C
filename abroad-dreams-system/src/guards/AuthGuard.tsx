import { ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// pages
import Login from "../pages/auth/Login";
import { useSelector } from "../redux/store";

// ----------------------------------------------------------------------

export default function AuthGuard({ children }: { children?: ReactNode }) {
  const { selectedUser } = useSelector((state) => state.user);
  const isAuthenticated = !!selectedUser;
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
