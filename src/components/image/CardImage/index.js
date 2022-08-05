import { SxProps } from "@mui/material";
import Image from "next/image";
import { ReactNode } from "react";

// Styles
import * as SC from "./index.styles";


const CardImage = (props) => {
  const { alt, src, width = 300, height = 200, objectFit = "cover", overlay, sx } = props;
  return (
    <SC.CardImage sx={sx}>
      {<Image alt={alt} height={height} objectFit={objectFit} src={src} width={width} />}
      {overlay}
    </SC.CardImage>
  );
};

export default CardImage;
