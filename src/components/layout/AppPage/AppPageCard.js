import { Close as BackIcon } from "@mui/icons-material";
import { Box, Divider, IconButton, Paper } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { ReactNode } from "react";

// Styles
import * as SC from "./index.styles";

const CARD_VARIANT_SIZE_MAP = {
  content: 0,
  constrained: 600,
  form: 800,
};

/**
 * Page card size variant
 *
 * Default behavior is to have max width of 600px, constrained.
 */
const AppPageCard = (props) => {
  const { children, contentSx, hideBack = false, wrapperSx = {}, title, variant = "constrained" } = props;

  const router = useRouter();

  const maxWidth = CARD_VARIANT_SIZE_MAP[variant];

  const maxWidthStyle = maxWidth ? { maxWidth, width: "100%" } : {};

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, ...maxWidthStyle, ...wrapperSx }}>
      <Paper>
        <SC.PageCardTitle variant="h3">
          {!hideBack && (
            <IconButton size="small" sx={{ position: "absolute", left: 16 }} onClick={router.back}>
              <BackIcon />
            </IconButton>
          )}
          {title}
        </SC.PageCardTitle>
        {title && <Divider />}
        {/* @ts-ignore */}
        <SC.PageCardContent sx={contentSx}>{children}</SC.PageCardContent>
      </Paper>
    </Box>
  );
};

export default AppPageCard;
