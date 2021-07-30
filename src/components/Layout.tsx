import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./Layout.css";

export const Layout = (props) => {
  return (
    <>
      <Header />
      <main className="layout-main">{props.children}</main>
      <Footer />
    </>
  );
};
