import * as AlertPrimitive from "@radix-ui/react-alert-dialog";
import * as React from "react";
import { useForm } from "react-hook-form";
import { Button } from "../buttons";

interface AlertProps {
  title: string;
  description?: string;
  submitText: string;
  cancelText: string;
  classnames: { submit: string; cancel: string };
  action: () => Promise<void> | void;
  triggerButton: ReturnType<typeof Button>;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      title,
      description,
      submitText,
      cancelText,
      action,
      triggerButton,
      classnames,
    },
    forwardedRef
  ) => {
    const [open, setOpen] = React.useState(false);
    const [submitting, setSubmitting] = React.useState(false);
    const toggleOpen = () => {
      setOpen(!open);
    };
    const { handleSubmit } = useForm();
    const onSubmit = async () => {
      setSubmitting(true);
      await action();
      setSubmitting(false);
      setOpen(false);
    };
    return (
      <AlertPrimitive.Root open={open} onOpenChange={setOpen}>
        <AlertPrimitive.Trigger asChild onClick={toggleOpen}>
          {triggerButton}
        </AlertPrimitive.Trigger>
        <AlertPrimitive.Portal>
          <AlertPrimitive.Overlay />
          <AlertPrimitive.Content
            ref={forwardedRef}
            className="max-w-1/4 fixed top-1/3 left-1/3 rounded-xl border-[3px] border-slate-800 bg-white p-4"
          >
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3"
            >
              <AlertPrimitive.Title className="text-lg font-bold">
                {title}
              </AlertPrimitive.Title>
              <AlertPrimitive.Description>
                {description}
              </AlertPrimitive.Description>
              <span className="flex w-full justify-end gap-2">
                <AlertPrimitive.Cancel asChild onClick={toggleOpen}>
                  <Button
                    className={"px-2 py-1 text-white " + classnames.cancel}
                  >
                    {cancelText}
                  </Button>
                </AlertPrimitive.Cancel>
                <Button
                  type="submit"
                  className={"px-2 py-1 text-white " + classnames.submit}
                >
                  {submitText}
                </Button>
              </span>
            </form>
          </AlertPrimitive.Content>
        </AlertPrimitive.Portal>
      </AlertPrimitive.Root>
    );
  }
);

export default Alert;
