import { useRouter } from "next/router";
import { useEffect } from "react";

// Utilities
// import { AuthService } from "@services";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const hasTokens = false;

    router.replace(hasTokens ? "/dashboard" : "/auth");
  }, [router]);
  return null;
};