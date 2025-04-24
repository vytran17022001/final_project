// Layout.js
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <main lassName="min-h-[50vh]">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
