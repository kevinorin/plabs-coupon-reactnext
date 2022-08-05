/**
 * Temporarily pause execution (intended for debug)
 * @param time - Time to pause (milliseconds)
 */
const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export { sleep };
