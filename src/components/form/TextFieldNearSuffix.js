import { InputAdornment } from "@mui/material";

// Utilities
import config from "@config";

/** Common end adornment for text fields */
const TextFieldNearSuffix = () => {
  return <InputAdornment position="end">.{config.api.walletSuffix}</InputAdornment>;
};

export default TextFieldNearSuffix;
