import { Transition } from "@headlessui/react";
import * as Dialog from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { Button } from "../buttons";

interface DialogProps extends Dialog.DialogProps {
  triggerButton: ReturnType<typeof Button>;
}
const Sidebar = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ triggerButton, children, ...props }, forwardedRef) => {
    const [open, setOpen] = useState(false);
    return (
      <Dialog.Root {...props} open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>{triggerButton}</Dialog.Trigger>
        <Transition.Root as="div" show={open} className="fixed inset-0 z-40">
          <Transition.Child
            as={React.Fragment}
            enter="transition ease-in-out duration-200"
            enterFrom="translate-x-full"
            enterTo="-translate-x-0"
            leave="transition ease-in-out duration-200"
            leaveFrom="-translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Content
              forceMount
              ref={forwardedRef}
              className="fixed right-0 z-10 h-full w-2/3 bg-white md:w-1/4"
            >
              {children}
            </Dialog.Content>
          </Transition.Child>
          <Dialog.Overlay
            forceMount
            className="fixed inset-0 bg-gray-300 bg-opacity-50"
          ></Dialog.Overlay>
        </Transition.Root>
      </Dialog.Root>
    );
  }
);

export default Sidebar;
