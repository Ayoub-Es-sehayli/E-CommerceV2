import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  minWidth?: string;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, icon, minWidth, ...props }, forwardedRef) => {
    let className =
      "rounded-lg text-lg font-semibold whitespace-nowrap cursor-pointer ";
    if (minWidth) className += minWidth + " ";
    else className += " w-min ";
    return (
      <button
        {...props}
        className={className + props.className}
        ref={forwardedRef}
      >
        <span className="flex items-center justify-center gap-2">
          {icon ? <i className={icon}></i> : null}
          {children}
        </span>
      </button>
    );
  }
);
export const FAB = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    return (
      <div className="fixed inset-0">
        <Button
          {...props}
          ref={forwardedRef}
          className="fixed bottom-6 right-6 rounded-full bg-slate-800 px-3 py-2 text-white hover:bg-slate-700 focus:bg-slate-700"
        ></Button>
      </div>
    );
  }
);
export default Button;
