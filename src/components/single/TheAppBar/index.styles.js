import styled from "@emotion/styled";
import { Avatar } from "@mui/material";

/** App bar logo container */
export const AppBarLogo = styled.div`
  display: flex;
  margin-right: auto;
`;

/** App bar merchant container */
export const AppBarMerchant = styled.div`
  display: flex;
  align-items: center;
  margin-right: 16px;
`;

/** App bar merchant logo */
export const AppBarMerchantAvatar = styled(Avatar)`
  height: 32px;
  width: 32px;
`;
