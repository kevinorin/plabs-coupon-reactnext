import Router from "next/router";
import { useEffect } from "react";

// Utilities
import { AuthService } from "@services";


/**
 * Handle authentication route guards on page mount/transition
 *
 * NOTE: This is certainly not the best way to handle this; however, it works for now...
 *
 * @param options - Auth guard options
 */
const useAuthGuard = (options) => {
  useEffect(() => {
    const { requiresAuth, requiresNoAuth } = options;

    // NOTE: Existence of auth tokens does not necessarily indicate a valid authenticated user. However,
    //         authentication errors (ie. expiry) will be handled by Axios interceptors, so this is a
    //         reasonable assumption.
    const authenticated = AuthService.hasAuthTokens();

    if (authenticated && requiresNoAuth) {
      Router.back();
    } else if (!authenticated && requiresAuth) {
      // TODO: Determine how to handle entire URL path (ie query strings)
      Router.replace({
        pathname: "/auth",
        query: {
          redirectUrl: Router.asPath,
        },
      });
    } else if (requiresAuth === undefined && requiresNoAuth === undefined) {
      console.error("'useAuthGuard called with no arguments!");
    }
    // NOTE: Should only ever run once when a component mounts!
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export { useAuthGuard };
