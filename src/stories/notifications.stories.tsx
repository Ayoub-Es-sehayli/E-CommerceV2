import "bootstrap-icons/font/bootstrap-icons.css";
import { useCallback, useState } from "react";
import "tailwindcss/tailwind.css";
import Button from "../components/buttons";
import { Spinner, ToastProvider, useToast } from "../components/notification";

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

export const LoadingPlaceholder = () => {
  const [isLoading, setLoading] = useState(false);
  const toggleLoading = useCallback(() => {
    setLoading(!isLoading);
  }, [isLoading]);
  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        onClick={toggleLoading}
        className="bg-rose-700 py-1 px-3 text-white"
      >
        <Spinner isLoading={isLoading} />
        <span>Click me</span>
      </Button>
    </div>
  );
};
