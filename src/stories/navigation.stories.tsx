import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "tailwindcss/tailwind.css";
import { Navbar } from "../components/navigation";

export const NavbarContainer = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section>the main body of the page</section>
    </div>
  );
};
