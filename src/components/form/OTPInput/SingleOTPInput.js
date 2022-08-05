import { useRef, useEffect, InputHTMLAttributes } from "react";

// Styles
import * as SC from "./index.styles";

// Utilities
import { usePrevious } from "@hooks";


const SingleOTPInput = (props) => {
  const { focus, ...rest } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const prevFocus = usePrevious(!!focus);

  useEffect(() => {
    if (!inputRef.current) return;

    // Apply focus (and optionally select text) to current element when parent indicates focus has shifted
    if (focus) {
      inputRef.current.focus();

      if (focus !== prevFocus) {
        inputRef.current.select();
      }
    }
  }, [focus, prevFocus]);

  return <SC.Input ref={inputRef} {...rest} />;
};

export default SingleOTPInput;
