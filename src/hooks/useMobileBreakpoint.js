import { useMediaQuery, useTheme } from "@mui/material";

/**
 * Expose mobile breakpoint as hook
 *
 * @returns breakpoint boolean
 */
const useMobileBreakpoint = () => {
  const theme = useTheme();

  return useMediaQuery(theme.breakpoints.down("md"));
};

export { useMobileBreakpoint };
