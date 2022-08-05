import { configureStore } from "@reduxjs/toolkit";

// Utilities
import reducers from "./reducers";

const store = configureStore({
  reducer: reducers,
});

/**
 * Setup Redux store
 *
 * @returns Redux store
 */
const setupStore = () => {
  // @ts-ignore
  if (process.env.NODE_ENV !== "production" && module.hot) {
    // Source: https://github.com/rt2zz/redux-persist/blob/master/docs/hot-module-replacement.md
    // @ts-ignore
    module.hot.accept("./reducers", () => {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const nextReducer = require("./reducers").default;
      store.replaceReducer(nextReducer);
    });
  }

  return { store };
};

export { setupStore, store };
