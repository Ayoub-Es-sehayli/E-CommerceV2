import * as DialogPrimitive from "@radix-ui/react-dialog";
import * as React from "react";
import { Button } from "../buttons";

interface DialogProps {
  title: string;
  description?: string;
  triggerButton: ReturnType<typeof Button>;
}
const Dialog = React.forwardRef<
  HTMLDivElement,
  DialogProps & React.PropsWithChildren & DialogPrimitive.DialogProps
>(({ title, description, triggerButton, children, ...props }, forwardedRef) => {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Trigger asChild>{triggerButton}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 grid place-items-center overflow-y-scroll">
          <DialogPrimitive.Content
            ref={forwardedRef}
            className="flex flex-col items-center rounded-xl border-[3px] border-slate-800 bg-white p-4"
          >
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
});
const DialogClose = DialogPrimitive.Close;

export { Dialog, DialogClose };
