import React from "react";
import { Collapsible } from "../overlays";
import NextLink from "./next-link";

const Navbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <nav className="flex w-full flex-col rounded-b-lg bg-slate-800 from-current">
      <header className="flex items-center justify-between px-4 py-2 text-white">
        <NextLink href="/" className="text-3xl font-semibold">
          Logo
        </NextLink>
        <span className="flex items-center gap-2 font-semibold">
          <NextLink
            href="/"
            className="rounded p-1 hover:bg-slate-700 hover:underline"
          >
            Nos produits
          </NextLink>
          <NextLink
            href="/"
            className="rounded p-1 hover:bg-slate-700 hover:underline"
          >
            À propos
          </NextLink>
          <NextLink
            href="/"
            className="rounded border border-white px-2 py-0.5 hover:bg-white hover:text-slate-900"
          >
            Se Connecter
          </NextLink>
        </span>
      </header>

      <Collapsible
        triggerButton={
          <div className="flex justify-center rounded-b-lg hover:cursor-pointer hover:bg-slate-700">
            <i className="bi-chevron-down text-white" />
          </div>
        }
        closeButton={
          <div className="flex w-full justify-center rounded-b-lg hover:cursor-pointer">
            <i className="bi-chevron-up text-white" />
          </div>
        }
        className="rounded-b-lg bg-slate-700 text-white"
      >
        <div className="grid place-items-center gap-2 pt-0.5">
          {/* Catalog grid goes here */}
          {children}
        </div>
      </Collapsible>
    </nav>
  );
};

export default Navbar;
