import styled from "@emotion/styled";

// Utilities
import { palette } from "@theme";

export const Input = styled.input`
  width: 3rem !important;
  height: 3rem;
  margin: 0 0.2rem;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 4px;
  border: 1px solid ${(p) => (p.error ? palette.error.main : "#0000004d")};

  -moz-appearance: textfield;
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  :focus {
    outline: 1px solid ${palette.primary.main};
    border-color: ${palette.primary.main};
  }
`;
