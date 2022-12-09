import "bootstrap-icons/font/bootstrap-icons.css";
import "tailwindcss/tailwind.css";
import { Button } from "../components/buttons";
import { Popover } from "../components/overlays";

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
