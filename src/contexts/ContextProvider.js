/**
 * Eliminate nesting multiple context providers to the app!
 *
 * Taken from: https://tobea.dev/post/global-state-cleanliness-with-react-context#lets-get-fancy
 */

import React, { ReactElement, ReactNode } from "react";

// Utilities
import { SnackbarProvider } from "./SnackbarContext";


/**
 * Compose Context providers together
 *
 * @param {Node}     children  - React children
 * @param {Object[]} providers - React context providers
 */
const ProviderComposer = (props) => {
  const { children, providers } = props;

  // TODO: Figure out why this was causing a TS error
  // @ts-ignore
  return providers.reduceRight(
    (kids, parent) =>
      React.cloneElement(parent, {
        children: kids,
      }),
    children
  );
};

/**
 * Combine Context providers into single React component
 *
 * @param {Node}     children  - React children
 */
const ContextProvider = (props) => {
  const { children } = props;

  return <ProviderComposer providers={[<SnackbarProvider key="snackbar" />]}>{children}</ProviderComposer>;
};

export default ContextProvider;
