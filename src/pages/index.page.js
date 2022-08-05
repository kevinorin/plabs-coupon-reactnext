import { useRouter } from "next/router";
import { useEffect } from "react";

// Utilities
import { AuthService } from "@services";

const Root = () => {
  const router = useRouter();

  useEffect(() => {
    const hasTokens = AuthService.hasAuthTokens();

    router.replace(hasTokens ? "/dashboard" : "/auth");
  }, [router]);

  // TODO: Determine whether something better should be rendered (maybe loading screen?)
  return null;
};

export default Root;
