import { AlertColor, Snackbar, SnackbarContent, useTheme } from "@mui/material";
import React, { ReactElement, ReactNode, useReducer } from "react";

// Delay snackbar slightly to allow previous snackbars to close (animate) properly
const SNACKBAR_DELAY = 200;


const initialState = {
  duration: 4000,
  permanent: false,
  message: "",
  open: false,
  type: "info",
  onDismiss: () => null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "close":
      // NOTE: Resetting all state will cause visual bugs while the snackbar closes!
      return {
        ...state,
        open: false,
      };
    case "open":
      return {
        ...initialState,
        ...action.payload,
        open: true,
      };
    default:
      return state;
  }
};

// @ts-ignore - Will be set by context provider
const SnackbarContext = React.createContext({});

const SnackbarProvider = (props) => {
  const { children } = props;
  const [snackbar, snackbarDispatch] = useReducer(reducer, initialState);

  const { palette } = useTheme();

  let contentStyle = {};
  switch (snackbar.type) {
    case "error":
      contentStyle = {
        backgroundColor: palette.error.main,
      };
      break;
    case "warning":
      contentStyle = {
        backgroundColor: palette.warning.main,
      };
      break;
    default:
      break;
  }

  /**
   * Handle closing the snackbar
   */
  const onDismiss = () => {
    closeNotification();

    snackbar?.onDismiss();
  };

  /**
   * Close the notification
   */
  const closeNotification = () => snackbarDispatch({ type: "close" });

  /**
   * Open a notification
   *
   * @param message - Notification message
   * @param options - Snackbar options
   */
  const notify = (message, options = {}) => {
    // Close the previous notification
    closeNotification();

    // Use short timeout to allow close animation to finish
    setTimeout(() => {
      snackbarDispatch({ type: "open", payload: { ...options, message } });
    }, SNACKBAR_DELAY);
  };

  /**
   * Open an error notification
   *
   * @param message - Notification message
   * @param options - Snackbar options
   */
  const notifyError = (message, options = {}) => {
    notify(message, { ...options, type: "error" });
  };

  /**
   * Open a warning notification
   *
   * @param message - Notification message
   * @param options - Snackbar options
   */
  const notifyWarning = (message, options = {}) => {
    notify(message, { ...options, type: "warning" });
  };

  return (
    <SnackbarContext.Provider value={{ closeNotification, notify, notifyError, notifyWarning, snackbar }}>
      {children}
      <Snackbar
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        autoHideDuration={snackbar.duration}
        ClickAwayListenerProps={{ mouseEvent: false }}
        message={snackbar.message}
        open={snackbar.open}
        onClose={onDismiss}
      >
        <SnackbarContent message={snackbar.message} sx={contentStyle} />
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export { SnackbarContext, SnackbarProvider };
