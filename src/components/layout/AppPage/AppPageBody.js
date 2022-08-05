import { Stack, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

/** Full-width page body */
const AppPageBody = (props) => {
  const { centerLayout = false, children, sx = [] } = props;

  return (
    <Stack
      justifyContent={centerLayout ? "center" : "flex-start"}
      alignItems="center"
      sx={[{ flexGrow: 1, width: "100%", p: 4 }, ...(Array.isArray(sx) ? sx : [sx])]}
    >
      {children}
    </Stack>
  );
};

export default AppPageBody;
