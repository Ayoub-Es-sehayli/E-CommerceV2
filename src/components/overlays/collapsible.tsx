import * as CollapsiblePrimitive from "@radix-ui/react-collapsible";
import React, { useState } from "react";
import Button from "../buttons";

export interface CollapsibleProps
  extends CollapsiblePrimitive.CollapsibleContentProps {
  triggerButton: ReturnType<typeof Button>;
  closeButton: ReturnType<typeof Button>;
  anchorElement?: HTMLElement;
}
export const Collapsible = React.forwardRef<HTMLDivElement, CollapsibleProps>(
  ({ children, triggerButton, closeButton, ...props }, forwardedRef) => {
    const [open, setOpen] = useState(false);
    return (
      <CollapsiblePrimitive.Root open={open} onOpenChange={setOpen}>
        <CollapsiblePrimitive.Trigger asChild className={open ? "hidden" : ""}>
          {triggerButton}
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.Content
          {...props}
          ref={forwardedRef}
          // className={className}
        >
          {children}
          <CollapsiblePrimitive.Trigger asChild>
            {closeButton}
          </CollapsiblePrimitive.Trigger>
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    );
  }
);
