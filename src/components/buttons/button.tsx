import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  minWidth?: string;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, icon, minWidth, ...props }, forwardedRef) => {
    let className = "rounded-lg text-lg font-semibold whitespace-nowrap";
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
export default Button;
