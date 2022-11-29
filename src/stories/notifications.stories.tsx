import "bootstrap-icons/font/bootstrap-icons.css";
import "tailwindcss/tailwind.css";
import Button from "../components/buttons";
import { ToastProvider, useToast } from "../components/notification";

export const NotificationSystem = () => {
  const showToast = useToast((state) => state.showToast);
  const handleOnClick = () =>
    showToast("Notification System", "Notification full description");
  return (
    <ToastProvider>
      <Button className="border-[3px] border-slate-800" onClick={handleOnClick}>
        Do Something
      </Button>
    </ToastProvider>
  );
};
