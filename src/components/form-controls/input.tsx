import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { FieldErrorsImpl, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends UseFormRegisterReturn {
  placeholder?: string;
  label?: string;
  className?: string;
  width?: string;
  type?: string;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, errors, className, width, ...inputProps }, forwardedRef) => {
    return (
      <span className={"flex flex-col gap-1 " + width}>
        {label && (
          <label
            htmlFor={inputProps.name}
            className="select-none text-lg font-bold text-slate-800"
          >
            {label}
          </label>
        )}
        <input
          {...inputProps}
          ref={forwardedRef}
          className={
            "rounded-xl px-2 py-1.5 text-lg placeholder:text-sm placeholder:text-sky-800 " +
            className
          }
        />
        <ErrorMessage
          errors={errors}
          name={inputProps.name}
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

export default Input;
