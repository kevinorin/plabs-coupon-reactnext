import { Typography } from "@mui/material";
import { ReactNode } from "react";

/** Coupon/campaign preview list item label/text */
const PreviewValue = (props) => {
  const { children, label, twoLines = false } = props;

  return (
    <Typography variant="body1" gutterBottom>
      <strong>{label}:&ensp;</strong>
      {twoLines && <br />}
      {children}
    </Typography>
  );
};

export default PreviewValue;
