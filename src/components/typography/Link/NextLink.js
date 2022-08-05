import { forwardRef } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { styled } from "@mui/material/styles";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});


/** Unstyled wrapper for NextJS Link */
const NextLinkComposed = forwardRef((props, ref) => {
  const { to, linkAs, replace, scroll, shallow, prefetch, locale, ...other } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
    >
      <Anchor ref={ref} {...other} />
    </NextLink>
  );
});

NextLinkComposed.displayName = "NextLinkComposed";

export default NextLinkComposed;

export { Anchor };
