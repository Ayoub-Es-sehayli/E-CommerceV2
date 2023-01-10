import Link from "next/link";
import React from "react";
import { Button } from "../buttons";

const NavItem: React.FC<{
  label: string;
  target: string;
  icon: string;
}> = ({ label, target, icon }) => (
  <li className="hover:underline">
    <Link
      className="flex gap-x-2 rounded p-2 font-semibold hover:bg-slate-700"
      href={target}
    >
      <i className={icon}></i>
      {label}
    </Link>
  </li>
);
const AdminLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-nowrap">
      <aside className="flex min-h-screen w-1/6 flex-col gap-4 bg-slate-800 py-2 px-4 text-white shadow">
        <header className="mt-4 text-4xl font-bold">
          <Link href="/admin">Logo</Link>
        </header>
        <nav className="grow">
          <ul className="flex flex-col gap-3">
            <NavItem target="/admin/orders" label="Orders" icon="bi-truck" />
            <NavItem
              target="/admin/categories"
              label="Categories"
              icon="bi-tag"
            />
            <NavItem
              target="/admin/products"
              label="Products"
              icon="bi-boxes"
            />
            <NavItem
              target="/admin/settings"
              label="Configuration"
              icon="bi-gear"
            />
          </ul>
        </nav>
        <footer className="flex">
          <Button className="grow py-2 text-white hover:bg-slate-700">
            Disconnect
          </Button>
        </footer>
      </aside>
      <main className="w-full overflow-y-auto px-4 pt-5 pb-6">{children}</main>
    </div>
  );
};

export default AdminLayout;
