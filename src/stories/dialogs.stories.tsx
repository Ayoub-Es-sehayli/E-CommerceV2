import "bootstrap-icons/font/bootstrap-icons.css";
import React from "react";
import { useForm } from "react-hook-form";
import "tailwindcss/tailwind.css";
import Button from "../components/buttons";
import { Alert, Dialog, DialogClose } from "../components/dialogs";
import { Input } from "../components/form-controls";

export const AlertDialog = () => {
  const action = () => console.log("Got Ok");
  return (
    <Alert
      action={action}
      cancelText="Annuler"
      submitText="Ok"
      title="Action Title"
      description="Are you sure about this?"
      triggerButton={<Button>Open Alert</Button>}
    />
  );
};

export const DefaultDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const onSubmit = async () => {
    setSubmitting(true);
    console.log("Got Ok");
    setSubmitting(false);
    setOpen(false);
  };
  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      title="Dialog Title"
      description="Please fill this form"
      triggerButton={<Button onClick={toggleOpen}>Open Dialog</Button>}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <Input
          label="Hello"
          placeholder="Input name here"
          errors={errors}
          {...register("name")}
        />
        <span className="flex gap-2">
          <DialogClose asChild onClick={toggleOpen}>
            <Button className="bg-rose-600 text-white hover:bg-rose-500 ">
              Annuler
            </Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-emerald-700 text-white hover:bg-emerald-600"
          >
            Sauvegarder
          </Button>
        </span>
      </form>
    </Dialog>
  );
};
