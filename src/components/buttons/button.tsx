import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  minWidth?: string;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, icon, minWidth, ...props }, forwardedRef) => {
    let className =
      "flex gap-2 justify-center items-center px-6 py-3 rounded-lg text-lg font-semibold whitespace-nowrap ";
    if (minWidth) className += minWidth + " ";
    else className += " w-min ";
    return (
      <button
        {...props}
        className={className + props.className}
        ref={forwardedRef}
      >
        {icon ? <i className={icon}></i> : null}
        <span>{children}</span>
      </button>
    );
  }
);
export default Button;
