import Typography from "@mui/material/Typography";

// Utilities
// import config from "@config";

// Styles
import * as SC from "./AuthLayout.styles";

/** Links to Terms & Conditions and Privacy Policy documents */
const AuthLayoutPromptConditions = () => {
  /** Shared external link component */
  const createLink = (text, link) => (
    <SC.AuthLayoutPromptLink dangerouslySetInnerHTML={{ __html: text }} href={link} target="_blank" />
  );

  return (
    <Typography sx={{ textAlign: "center", pt: 2 }} variant="body1">
      By continuing you agree to PrimeLab {createLink("Terms&nbsp;&amp;&nbsp;Conditions", config.links.primeLabHome)}{" "}
      and {createLink("Privacy&nbsp;Policy", '')}.
    </Typography>
  );
};

export default AuthLayoutPromptConditions;
