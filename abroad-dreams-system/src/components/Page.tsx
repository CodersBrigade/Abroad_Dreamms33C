import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

export function Page({
  title,
  children,
  notLogged,
}: {
  title: string;
  children: ReactNode;
  notLogged?: boolean;
}) {
  return (
    <div className={`page${notLogged ? " darker-background" : ""}`}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </div>
  );
}
