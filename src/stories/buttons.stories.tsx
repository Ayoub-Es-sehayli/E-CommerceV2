import "bootstrap-icons/font/bootstrap-icons.css";
import "tailwindcss/tailwind.css";
import { Button, FAB } from "../components/buttons";

export const Buttons = () => {
  return (
    <div className="flex flex-col gap-4">
      <Button>No Styling</Button>
      <Button className="bg-slate-800 px-6 py-3 text-white">
        Normal Button
      </Button>
      <Button className="border-[3px] border-slate-800 px-6 py-3 text-slate-800">
        Outline button
      </Button>
      <Button
        className="border-[3px] border-slate-800 px-6 py-3"
        minWidth="w-full"
      >
        Full Width
      </Button>
      <Button className="px-6 py-3 text-red-400" icon="bi-airplane">
        With Icon
      </Button>
      <Button className="border-[3px] border-slate-800 px-6 py-3 text-slate-800">
        <i className="bi-airplane" />
      </Button>
    </div>
  );
};
export const FabOverlay = () => {
  return (
    <span>
      <FAB icon="bi-cart" />
    </span>
  );
};
