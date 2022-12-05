import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import "tailwindcss/tailwind.css";
import { Navbar, NextLink } from "../components/navigation";

export const NavLinks = () => {
  return (
    <div className="grid gap-4">
      <NextLink href="#">Default Link</NextLink>
      <NextLink href="#" title="Icon link" className="bi-link"></NextLink>
      <NextLink
        href="#"
        className="w-min whitespace-nowrap bg-slate-800 px-6 py-3 text-white hover:bg-slate-700"
      >
        Button Link
      </NextLink>
      <NextLink href="#"></NextLink>
      <NextLink href="#"></NextLink>
    </div>
  );
};

export const NavbarContainer = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section>the main body of the page</section>
    </div>
  );
};
