import { Divider, Stack, SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

/** Dashboard section header */
const SectionHeader = (props) => {
  const { children, sx = [] } = props;

  return (
    <Stack sx={[{ width: "100%", mb: 3 }, ...(Array.isArray(sx) ? sx : [sx])]}>
      <Typography sx={{ color: "GrayText", textTransform: "uppercase" }} variant="subtitle2">
        {children}
      </Typography>
      <Divider />
    </Stack>
  );
};

export default SectionHeader;
