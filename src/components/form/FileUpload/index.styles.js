import { styled } from '@mui/material/styles';
import { Box } from "@mui/system";

/** Status chip */
export const FileUploadContainer = styled(Box)`
  margin: -0.25px;
  border: 1px dashed #0000003b;
  border-radius: 4px;
  &:hover {
    border: 1px solid black;
  }
`;
