import { Button, Divider, Typography } from "@mui/material";
import { ReactNode } from "react";

// Components
// import { LinkButton } from "@components/typography";
import { LinkButton } from "../../../../src/components/typography";

// Styles
import * as SC from "./AuthLayout.styles";

const AuthLayoutPrompt = (props) => {
  const { actionText, actionTo, children, disabled = false, promptText, onAction } = props;

  return (
    <SC.AuthLayoutPrompt dense={!children}>
      {children}
      <Divider sx={{ my: 2, width: "90%" }} />
      <Typography sx={{ mb: 0.5 }} variant="body1">
        {promptText}
      </Typography>
      {actionTo ? (
        <LinkButton to={actionTo} variant="text">
          {actionText}
        </LinkButton>
      ) : (
        <Button disabled={disabled} variant="text" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </SC.AuthLayoutPrompt>
  );
};

export default AuthLayoutPrompt;
