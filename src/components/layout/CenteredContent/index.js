import { ReactNode } from "react";

// Styles
import * as SC from "./index.styles";

/** Center child content (horizontally/vertically) */
const CenteredContent = (props) => {
  const { children } = props;

  return <SC.Container>{children}</SC.Container>;
};

export default CenteredContent;
