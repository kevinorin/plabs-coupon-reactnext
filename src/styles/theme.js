import { Components, createTheme, Theme } from "@mui/material/styles";

const buttonOverrides = {
  defaultProps: {
    variant: "contained",
  },
  styleOverrides: {
    root: {
      borderRadius: 10,
    },
  },
};

const theme = createTheme({
  typography: {
    fontFamily: "Manrope,sans-serif",
    h1: {
      fontSize: "2rem",
    },
    h2: {
      fontSize: "1.75rem",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.25rem",
    },
    h5: {
      fontSize: "1.125rem",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 700,
    },
    body1: {
      fontSize: "1rem",
    },
    body2: {
      fontSize: "0.875rem",
    },
  },
  components: {
    MuiButton: {
      ...buttonOverrides,
    },
    MuiLoadingButton: {
      ...buttonOverrides,
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        helperText: " ",
      },
    },
    MuiCardActionArea: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
  },
  // TODO: Determine what theme properties need to be customized
  palette: {
    background: {
      default: "#f5f5f5",
    },
    primary: {
      main: "#715aff",
    },
    secondary: {
      main: "#2C9AFF",
    },
  },
  shape: {
    // TODO: Determine if increasing this makes sense
    // borderRadius: 8,
  },
});

const themePalette = theme.palette;

export default theme;
export { themePalette as palette };
