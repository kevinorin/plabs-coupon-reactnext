import { CircularProgress, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Components
import { AuthLayout } from "@pages/auth/components";

// Utilities
import { AuthService } from "@services";

const Logout: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Briefly indicate to the user that something is happening
    setTimeout(async () => {
      await AuthService.logout();

      router.replace("/auth?focusSignIn=true");
    }, 1000);
  }, [router]);

  return (
    <AuthLayout tabTitle="Logout">
      <Typography sx={{ mb: 4, mt: 2 }} variant="h3">
        Goodbye!
      </Typography>
      <CircularProgress size={64} />
    </AuthLayout>
  );
};

export default Logout;
