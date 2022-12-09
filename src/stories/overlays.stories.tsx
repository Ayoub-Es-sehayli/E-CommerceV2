import "bootstrap-icons/font/bootstrap-icons.css";
import "tailwindcss/tailwind.css";
import { Button, FAB } from "../components/buttons";
import { Popover } from "../components/overlays";
import Sidebar from "../components/overlays/sidebar";

export const PopoverOverlay = () => {
  return (
    <Popover
      triggerButton={
        <Button className="bg-slate-800 text-white hover:bg-slate-700">
          Show Sidebar
        </Button>
      }
      className="grid place-items-center gap-2 border-slate-800 p-2"
    >
      Hello from popover
    </Popover>
  );
};

export const SidebarOverlay = () => {
  return <Sidebar triggerButton={<FAB icon="bi-cart" />} />;
};
