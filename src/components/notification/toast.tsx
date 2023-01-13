import * as ToastPrimitive from "@radix-ui/react-toast";
import * as React from "react";
import create from "zustand";
interface ToastState {
  open: boolean;
  title: string;
  message: string;
  setOpen: (value: boolean) => void;
  showToast: (title: string, message?: string) => void;
}
export const useToast = create<ToastState>((set) => ({
  open: false,
  title: "",
  message: "",
  setOpen: (value) => set(() => ({ open: value })),
  showToast: (title, message) =>
    set(() => ({
      open: true,
      title: title,
      message: message,
    })),
}));
interface ToastProps extends React.PropsWithChildren {}
export const Toast = React.forwardRef<HTMLLIElement, ToastProps>(
  ({ children, ...props }, forwardedRef) => {
    const open = useToast((state) => state.open);
    const setOpen = useToast((state) => state.setOpen);
    const message = useToast((state) => state.message);
    const title = useToast((state) => state.title);
    return (
      <ToastPrimitive.Root
        {...props}
        ref={forwardedRef}
        duration={3000}
        open={open}
        onOpenChange={setOpen}
        className="border-primary flex gap-8 rounded-lg border bg-white p-4"
      >
        <div className="flex flex-col gap-3">
          <ToastPrimitive.Title className="text-lg font-bold">
            {title}
          </ToastPrimitive.Title>
          <ToastPrimitive.Description>{message}</ToastPrimitive.Description>
        </div>
        <ToastPrimitive.Action asChild altText="Dismiss this Notification">
          {children}
        </ToastPrimitive.Action>
        <ToastPrimitive.Close
          aria-label="Close"
          className="h-min rounded bg-rose-500 px-1 text-white hover:bg-rose-400"
        >
          <span aria-hidden>×</span>
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  }
);

export const ToastProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <ToastPrimitive.Provider>
      {children}
      <Toast />
      <ToastPrimitive.Viewport className="fixed bottom-0 right-0 flex flex-col gap-3 p-6 outline-none" />
    </ToastPrimitive.Provider>
  );
};
