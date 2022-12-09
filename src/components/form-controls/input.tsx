import { ErrorMessage } from "@hookform/error-message";
import React, { forwardRef } from "react";
import { FieldErrorsImpl, UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends UseFormRegisterReturn {
  placeholder: string;
  label?: string;
  className?: string;
  width?: string;
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any;
    }>
  >;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, placeholder, errors, className, width, ...inputProps },
    forwardedRef
  ) => {
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
          placeholder={placeholder}
          className={
            "rounded-xl border px-2 py-0.5 text-lg outline-slate-800 placeholder:text-sm placeholder:text-sky-800 focus-within:outline-[3px] " +
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
