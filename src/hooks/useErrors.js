
// Default error that will be used when no error message is found
const DEFAULT_ERROR_MESSAGE = "An unknown error occurred";

/**
 * Get an error message from an error
 *
 * @param   error          - Error object/string
 * @param   defaultMessage - Default error message
 * @returns Error message
 */
const getError = (error, defaultMessage) => {
  if (!error) return "";

  const errorMessage = getErrorMessage(error);
  if (!errorMessage) return defaultMessage ?? DEFAULT_ERROR_MESSAGE;

  return errorMessage;
};

/**
 * Get an error message from an error
 *
 * @param   error - Error object/string
 * @returns Error message
 */
const getErrorMessage = (error) => {
  if (!error) return null;

  // Errors are often provided as an object, but the message 'key' may vary
  if (typeof error === "object") {
    // API errors are returned in an interesting nested format
    let message = error.message;
    if (error.response && error.response.data) {
      message = error.response.data.message;
      return Array.isArray(message) ? message[0] : message;
    }

    // 'message' key should always be checked last (most common, likely not set manually)
    if (message) return message;
  }
  // A bare error code may be provided instead of an error object
  else if (typeof error === "string") {
    return error;
  }

  return null;
};

const useErrors = () => {
  return {
    getError,
    getErrorMessage,
  };
};

export { useErrors };
