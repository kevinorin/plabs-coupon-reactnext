import { FormHelperText, Stack, SxProps, Theme } from "@mui/material";
import { FieldProps, getIn } from "formik";
import { useState, useCallback, ChangeEvent, KeyboardEvent, ClipboardEvent } from "react";

// Components
import SingleInput from "./SingleOTPInput";


const OTPInput = (props) => {
  const { autoFocus, disabled, field, form, helperText: helperTextProp, length = 6, sx, onEnter } = props;
  const { value = "", onChange: onChangeProp } = field;

  const [activeIndex, setActiveIndex] = useState(autoFocus ? 0 : -1);

  const onChange = onChangeProp(field.name);
  const fieldError = getIn(form.errors, field.name);
  const showError = getIn(form.touched, field.name) && !!fieldError;

  const helperText = showError ? fieldError : helperTextProp;

  /**
   * Transform parent value string into expected internal array (for display/manipulation)
   *
   * NOTE: Asterisks are used to preserve internal spacing between characters when editing
   *         with keyboard arrows (rather pointless, but an edge case), and must be converted
   *         to empty spaces when transforming to internal shape.
   *
   * @param   valueString - Parent value string
   * @returns Internal value array
   */
  const parseValueArray = (valueString = "") => {
    return Array(length)
      .fill("")
      .map((c, idx) => {
        const idxValue = valueString[idx] ?? "";
        return idxValue !== "*" ? idxValue : "";
      });
  };

  /**
   * Transform internal value array (display) into expected parent value string
   *
   * NOTE: Asterisks are used to preserve internal spacing between characters when editing
   *         with keyboard arrows (rather pointless, but an edge case), and must be inserted
   *         instead of empty spaces when passing to parent.
   *
   * @param   valueArray - Internal value array
   * @returns Parent value string
   */
  const parseValueString = useCallback((valueArray) => {
    return valueArray.map((c) => (c !== "" ? c : "*")).join("");
  }, []);

  /** OTP value array used for internal display/manipulation */
  const otpArray = parseValueArray(value);

  /** Change OTP value at focused input */
  const changeCodeAtFocus = useCallback(
    (str) => {
      const newOtp = [...otpArray];
      newOtp[activeIndex] = str[0] || "";
      onChange(parseValueString(newOtp));
    },
    [activeIndex, otpArray, parseValueString, onChange]
  );

  /** Focus on a specific input (by index) */
  const focusInput = useCallback(
    (inputIndex) => {
      const selectedIndex = Math.max(Math.min(length - 1, inputIndex), 0);
      setActiveIndex(selectedIndex);
    },
    [length]
  );

  const focusPrevInput = useCallback(() => {
    focusInput(activeIndex - 1);
  }, [activeIndex, focusInput]);

  const focusNextInput = useCallback(() => {
    focusInput(activeIndex + 1);
  }, [activeIndex, focusInput]);

  /** Handle onChange value for each input */
  const handleChange = useCallback(
    (e) => {
      const val = e.currentTarget.value;
      if (!val) {
        e.preventDefault();
        return;
      }

      changeCodeAtFocus(val);
      focusNextInput();
    },
    [changeCodeAtFocus, focusNextInput]
  );

  /** Handle onBlur input */
  const handleBlur = useCallback(() => {
    setActiveIndex(-1);
  }, []);

  /** Handle onKeyDown input */
  const handleKeyDown = useCallback(
    (e) => {
      const pressedKey = e.key;

      // Entering digits or pasting ('v' char) should always be allowed
      if (pressedKey.match(/^[v0-9]$/)) return;

      e.preventDefault();

      switch (pressedKey) {
        case "Backspace": {
          if (otpArray[activeIndex]) {
            changeCodeAtFocus("");
          } else {
            focusPrevInput();
          }
          break;
        }
        case "Enter": {
          onEnter();
          break;
        }
        case "ArrowLeft": {
          focusPrevInput();
          break;
        }
        case "ArrowRight": {
          focusNextInput();
          break;
        }
        default: {
          break;
        }
      }
    },
    [activeIndex, otpArray, changeCodeAtFocus, focusNextInput, focusPrevInput, onEnter]
  );

  /** Retrieve OTP code from pasted values */
  const handlePaste = useCallback(
    (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData
        .getData("text/plain")
        .trim()
        .slice(0, length - activeIndex)
        .split("");
      if (!pastedData) return;

      let nextFocusIndex = 0;
      const newOtp = [...otpArray];
      newOtp.forEach((val, index) => {
        if (index >= activeIndex) {
          const changedValue = pastedData.shift() || val;
          if (changedValue) {
            newOtp[index] = changedValue;
            nextFocusIndex = index;
          }
        }
      });
      onChange(parseValueString(newOtp));
      focusInput(Math.min(nextFocusIndex + 1, length - 1));
    },
    [activeIndex, otpArray, length, focusInput, parseValueString, onChange]
  );

  return (
    <Stack direction="column" spacing={1} sx={sx}>
      <Stack direction="row">
        {Array(length)
          .fill("")
          .map((_, index) => (
            <SingleInput
              // eslint-disable-next-line react/no-array-index-key
              key={`otp-${index}`}
              autoFocus={autoFocus}
              disabled={disabled || form.isSubmitting}
              error={showError}
              focus={activeIndex === index}
              type="number"
              value={otpArray?.[index] ?? ""}
              onBlur={handleBlur}
              onChange={handleChange}
              onFocus={() => focusInput(index)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
            />
          ))}
      </Stack>
      <FormHelperText error={showError}>{helperText ?? " "}</FormHelperText>
    </Stack>
  );
};

export default OTPInput;
