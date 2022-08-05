import { Box, Card, Typography } from "@mui/material";
import Image from "next/image";

/** Coupon/campaign preview image card */
const PreviewImage = (props) => {
  const { code, imageUrl, maxWidth = 400, label } = props;

  const maxHeight = (maxWidth * 2) / 3;

  return (
    <Card variant="outlined">
      {imageUrl && <Image alt="Preview image" height={maxHeight} src={imageUrl} objectFit="cover" width={maxWidth} />}
      <Box sx={{ display: "flex", alignItems: "center", p: 1, pt: 0.5 }}>
        <Typography variant="body1">{label}</Typography>
        {code && (
          <Typography fontFamily="monospace" sx={{ ml: "auto" }} variant="body1">
            {code}
          </Typography>
        )}
      </Box>
    </Card>
  );
};

export default PreviewImage;
