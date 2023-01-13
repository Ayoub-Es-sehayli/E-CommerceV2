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
  label: string;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
  options: {
    label: string;
    value: number;
  }[];
}
function SelectFn<TFieldValues extends FieldValues>(
  refProps: SelectProps<TFieldValues>,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>
) {
  const { label, options, errors, ...props } = refProps;
  const { field } = useController(props);
  const [selectedLabel, setSelected] = React.useState("");
  React.useEffect(() => {
    options.map((o) => {
      if (o.value === field.value) {
        setSelected(o.label);
      }
    });
  }, [field.value]);
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
        selectedLabel={selectedLabel}
        handleOnChange={(value) => field.onChange(Number.parseInt(value))}
      >
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value.toString()}>
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

const SelectImpl = React.forwardRef<
  HTMLButtonElement,
  SelectPrimitive.SelectProps & {
    selectedLabel: string;
    handleOnChange?: (value: string) => void;
  }
>(({ children, handleOnChange, selectedLabel, ...props }, forwardedRef) => {
  return (
    <SelectPrimitive.Root {...props} onValueChange={handleOnChange}>
      <SelectPrimitive.Trigger
        id={props.name}
        ref={forwardedRef}
        className="flex justify-between rounded-xl border p-3 text-lg text-sky-800 outline-slate-800 focus-within:outline-[3px]"
      >
        <SelectPrimitive.Value className="text-lg font-semibold text-slate-800">
          {selectedLabel}
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
      className="hover:font-semibold hover:outline-none data-[checked=true]:bg-slate-800 data-[checked=true]:font-semibold data-[checked=true]:text-white"
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <i className="bi-check"></i>
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
});

const Select = React.forwardRef(SelectFn) as typeof SelectFn;
export default Select;
