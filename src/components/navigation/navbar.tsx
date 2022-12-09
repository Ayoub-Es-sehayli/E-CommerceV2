import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "../form-controls";
import { Collapsible } from "../overlays";

const Navbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{ search: string }>({});
  const onSubmit = handleSubmit(({ search }) => {
    // Index Refinment goes here
  });
  return (
    <nav className="flex w-full flex-col whitespace-nowrap rounded-b-lg bg-slate-800 from-current">
      <header className="flex flex-wrap items-center justify-between gap-x-12 gap-y-3 px-4 py-2 text-white lg:flex-nowrap">
        <a href="/" className="order-1 text-3xl font-semibold">
          Logo
        </a>
        <form
          onSubmit={onSubmit}
          className="order-3 flex w-full justify-center justify-items-stretch lg:order-2 lg:w-3/4"
        >
          <Input
            className="text-black"
            placeholder="Rechercher un produit"
            errors={errors}
            width="w-2/3 lg:w-5/6"
            {...register("search")}
          />
        </form>
        <span className="order-2 flex items-center gap-2 font-semibold lg:order-3">
          <a
            href="/"
            className="rounded p-1 hover:bg-slate-700 hover:underline"
          >
            À propos
          </a>
          <a
            href="/"
            className="rounded border-2 border-white px-2 py-0.5 hover:bg-white hover:text-slate-900"
          >
            Se Connecter
          </a>
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
