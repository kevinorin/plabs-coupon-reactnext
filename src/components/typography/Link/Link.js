import { forwardRef } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
import { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";

// Components
import NextLinkComposed, { Anchor } from "./NextLink";

// Types
import { NextLinkComposedProps } from "./NextLink";

/**
 * An MUI styled version of the Next.js Link component
 */
const Link = forwardRef((props, ref) => {
  const {
    activeClassName = "active",
    as,
    className: classNameProps,
    href,
    linkAs: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    role, // Link don't have roles.
    scroll,
    shallow,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === pathname && activeClassName,
  });

  const isExternal = typeof href === "string" && (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

  if (isExternal) {
    if (noLinkStyle) {
      return <Anchor className={className} href={href} ref={ref} {...other} />;
    }

    return <MuiLink className={className} href={href} ref={ref} {...other} />;
  }

  const linkAs = linkAsProp || as;
  const nextjsProps = { to: href, linkAs, replace, scroll, shallow, prefetch, locale };

  if (noLinkStyle) {
    return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
  }

  return <MuiLink component={NextLinkComposed} className={className} ref={ref} {...nextjsProps} {...other} />;
});

Link.displayName = "Link";

export default Link;
