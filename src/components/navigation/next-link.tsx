import Link from "next/link";
import React, { AnchorHTMLAttributes } from "react";

const NextLink = React.forwardRef<
  HTMLAnchorElement,
  AnchorHTMLAttributes<HTMLAnchorElement>
>(({ children, href, ...props }, forwardedRef) => {
  return (
    // <Link href={href as string} ref={forwardedRef}>
    <a {...props} href={href as string}>
      {children}
    </a>
    // </Link>
  );
});

export default NextLink;
