import { Button, ButtonProps as MuiButtonProps } from "@mui/material";
// import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";

// Components
import NextLinkComposed from "./NextLink";

const LinkButton = (props) => {
  // @ts-ignore
  return <Button component={NextLinkComposed} {...props} />;
};

export default LinkButton;
