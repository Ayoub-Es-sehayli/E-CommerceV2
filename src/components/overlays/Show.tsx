import * as React from "react";
export const Show: React.FC<
  React.PropsWithChildren & {
    when: boolean;
    fallback: React.ReactNode;
  }
> = ({ children, when, fallback }) => {
  if (when) {
    return <>{children}</>;
  }
  return <>{fallback}</>;
};
