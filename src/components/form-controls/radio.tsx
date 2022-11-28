import * as RadioPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
import {
  FieldValues,
  useController,
  UseControllerProps,
  UseFormRegisterReturn,
} from "react-hook-form";

interface RadioGroupProps<TFieldValues extends FieldValues>
  extends UseControllerProps<TFieldValues> {
  options: { label: string; value: string }[];
}
export function RadioGroup<TFieldValues extends FieldValues>() {
  return React.forwardRef<HTMLDivElement, RadioGroupProps<TFieldValues>>(
    ({ options, ...props }, forwardedRef) => {
      const { field } = useController(props);

      return (
        <RadioPrimitive.Root
          value={field.value}
          onValueChange={field.onChange}
          className="flex flex-col gap-3 text-slate-800"
          ref={forwardedRef}
        >
          {options.map((option, i) => (
            <RadioItem key={i} {...option} name={props.name} />
          ))}
        </RadioPrimitive.Root>
      );
    }
  );
}

export const RadioItem = React.forwardRef<
  HTMLButtonElement,
  RadioPrimitive.RadioGroupItemProps & {
    name: string;
    label: string;
  }
>(({ label, ...props }, forwardedRef) => {
  return (
    <span className="group flex items-center gap-4">
      <RadioPrimitive.Item
        {...props}
        ref={forwardedRef}
        id={props.name + "-" + props.value}
        className="flex h-5 w-5 items-center justify-center rounded-full border group-hover:border-slate-800 data-[state=checked]:bg-slate-800"
      >
        <RadioPrimitive.Indicator className="bi-circle-full text-white" />
      </RadioPrimitive.Item>
      <label
        htmlFor={props.name + "-" + props.value}
        className="select-none text-lg font-semibold capitalize text-slate-800"
      >
        {label}
      </label>
    </span>
  );
});
