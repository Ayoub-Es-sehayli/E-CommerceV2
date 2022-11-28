import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React from "react";
import {
  FieldErrorsImpl,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface CheckboxProps<TFieldValues extends FieldValues>
  extends UseControllerProps<TFieldValues> {
  label: string;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
}
function Checkbox<TFieldValues extends FieldValues>() {
  return React.forwardRef<HTMLButtonElement, CheckboxProps<TFieldValues>>(
    ({ label, errors, ...inputProps }, forwardedRef) => {
      const { field } = useController(inputProps);
      return (
        <span className="group flex items-center gap-4">
          <CheckboxPrimitive.Root
            {...inputProps}
            ref={forwardedRef}
            id={inputProps.name}
            checked={field.value}
            onCheckedChange={field.onChange}
            className="flex h-5 w-5 items-center justify-center rounded border bg-white group-hover:border-slate-500 data-[state=checked]:bg-slate-800"
          >
            <CheckboxPrimitive.Indicator className="bi-check text-white" />
          </CheckboxPrimitive.Root>
          <label
            htmlFor={inputProps.name}
            className="select-none text-lg font-semibold text-slate-800"
          >
            {label}
          </label>
        </span>
      );
    }
  );
}
export default Checkbox;
