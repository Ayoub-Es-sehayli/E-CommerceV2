import { ErrorMessage } from "@hookform/error-message";
import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";
import {
  FieldErrorsImpl,
  FieldValues,
  useController,
  UseControllerProps,
} from "react-hook-form";

interface SelectProps<TFieldValues extends FieldValues>
  extends UseControllerProps<TFieldValues> {
  // handleOnChange: UseFormSetValue<TFieldValues>;
  placeholder: string;
  label: string;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  options: {
    label: string;
    value: string | number;
  }[];
}
function Select<TFieldValues extends FieldValues>() {
  return React.forwardRef<HTMLButtonElement, SelectProps<TFieldValues>>(
    ({ label, options, errors, ...props }, forwardedRef) => {
      const { field } = useController(props);
      return (
        <span className="flex flex-col">
          <label
            htmlFor={props.name}
            className="select-none text-lg font-bold text-slate-800"
          >
            {label}
          </label>

          <SelectImpl
            {...props}
            ref={forwardedRef}
            value={field.value}
            handleOnChange={(value) => field.onChange(value)}
          >
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value as string}>
                {option.label}
              </SelectItem>
            ))}
          </SelectImpl>

          <ErrorMessage
            errors={errors}
            name={props.name}
            render={({ message }) => (
              <span className="ml-4 text-xs font-semibold text-rose-600">
                {message}
              </span>
            )}
          />
        </span>
      );
    }
  );
}
const SelectImpl = React.forwardRef<
  HTMLButtonElement,
  SelectPrimitive.SelectProps & {
    placeholder: string;
    handleOnChange?: (value: string) => void;
  }
>(({ children, placeholder, handleOnChange, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Root {...props} onValueChange={handleOnChange}>
      <SelectPrimitive.Trigger
        id={props.name}
        ref={forwardedRef}
        className="flex justify-between rounded-xl border p-3 text-lg text-sky-800 outline-slate-800 focus-within:outline-[3px]"
      >
        <SelectPrimitive.Value
          placeholder={placeholder}
          aria-label={props.value}
        >
          {props.value}
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon />
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal className="w-full rounded-xl border bg-white p-3 text-lg ">
        <SelectPrimitive.Content>
          <SelectPrimitive.ScrollUpButton />
          <SelectPrimitive.Viewport className="outline-slate-800 focus-within:outline-[3px]">
            {children}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton />
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
});

const SelectItem = React.forwardRef<
  HTMLDivElement,
  SelectPrimitive.SelectItemProps
>(({ children, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Item
      {...props}
      ref={forwardedRef}
      className="hover:font-semibold hover:outline-none"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <i className="bi-check"></i>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});
export default Select;
