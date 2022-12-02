import * as PopoverPrimitive from "@radix-ui/react-popover";
import React from "react";
import Button from "../buttons";

export interface PopoverProps extends PopoverPrimitive.PopoverContentProps {
  triggerButton: ReturnType<typeof Button>;
  anchorElement?: HTMLElement;
}
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, triggerButton, className, ...props }, forwardedRef) => (
    <PopoverPrimitive.Root>
      <PopoverPrimitive.Trigger asChild>
        {triggerButton}
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          sideOffset={5}
          {...props}
          ref={forwardedRef}
          className={"rounded-md border-2 " + className}
        >
          {children}
          <PopoverPrimitive.Arrow />
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  )
);
