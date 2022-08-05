import styled from "@emotion/styled";
import { Link, Typography } from "@mui/material";

// Utilities
import { palette } from "@theme";

export const AuthLayoutLogo = styled.div`
  margin-bottom: 8px;
`;

export const AuthLayoutTitle = styled(Typography)`
  margin-bottom: 24px;
`;

/** Auth layout content */
export const AuthLayoutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

/** Auth layout child content wrapper */
export const AuthLayoutContentInner = styled.div`
  width: 100%;
  max-width: ${(p) => p.maxWidth ?? 350}px;
`;

/** Auth layout bottom prompt section */
export const AuthLayoutPrompt = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: stretch;
  width: 100%;
  margin-top: ${(p) => (p.dense ? 16 : 32)}px;
  color: ${palette.text.secondary};
`;

/** Auth layout bottom prompt link (external, not internal!) */
export const AuthLayoutPromptLink = styled(Link)`
  text-decoration: none;
`;
