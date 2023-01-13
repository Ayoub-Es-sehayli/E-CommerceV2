import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { Button } from "../buttons";

interface DialogProps {
  title: string;
  description?: string;
  triggerButton: ReturnType<typeof Button>;
  closeButton: React.ReactNode;
}
export const useDialog = (
  props: Omit<DialogProps, "triggerButton" | "closeButton">
) => {
  const [open, setOpen] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  return { open, setOpen, toggleOpen, ...props };
};
const DialogClose = DialogPrimitive.Close;
const Dialog = React.forwardRef<
  HTMLDivElement,
  DialogProps & React.PropsWithChildren & DialogPrimitive.DialogProps
>(
  (
    { title, description, triggerButton, closeButton, children, ...props },
    forwardedRef
  ) => {
    return (
      <DialogPrimitive.Root {...props}>
        <DialogPrimitive.Trigger asChild>
          {triggerButton}
        </DialogPrimitive.Trigger>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 grid place-items-center overflow-y-scroll">
            <DialogPrimitive.Content
              ref={forwardedRef}
              className="relative flex flex-col items-center rounded-xl border-[3px] border-slate-800 bg-white p-4"
            >
              <DialogPrimitive.Close aria-label="Close" asChild>
                {closeButton}
              </DialogPrimitive.Close>
              <DialogPrimitive.Title className="text-lg font-semibold">
                {title}
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="w-full text-left">
                {description}
              </DialogPrimitive.Description>
              {children}
            </DialogPrimitive.Content>
          </DialogPrimitive.Overlay>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    );
  }
);

export { Dialog, DialogClose };
