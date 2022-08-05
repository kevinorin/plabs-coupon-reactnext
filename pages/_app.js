import { CircularProgress, Stack } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDayjs from "@mui/lab/AdapterDayjs";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { ReactElement, useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { useHotkeys } from "react-hotkeys-hook";
import { setLocale as setYupLocale } from "yup";

// Components
// import { ContextProvider } from "src/contexts";

// Utilities
// import config from "@config";
// import { useAppDispatch, useErrors, useSnackbar } from "@hooks";
// import { AuthService, StorageService, UserService } from "@services";
// import { setupStore } from "@store";
// import { toggleMerchantView } from "@store/slices/merchant.slice";
// import { setProfile } from "@store/slices/user.slice";
import theme from "../src/styles/theme";

// Styles
// import "@fontsource/manrope/400.css";
// import "@fontsource/manrope/500.css";
// import "@fontsource/manrope/700.css";
// import "../styles/globals.css";

// Types
// import { IUser } from "@typings/user.types";

setYupLocale({
  mixed: {
    required: "${label} is required",
  },
});

// const { store } = setupStore();

const App = (props) => {
  console.log('Hello world! >>>>')
  const { Component, pageProps } = props;

  // NOTE: Loading state must start true to avoid unnecessarily rendering components!
  // const [loading, setLoading] = useState(true);
  // const dispatch = useAppDispatch();
  // const { notify, notifyError } = useSnackbar();
  // const { getError } = useErrors();

  // useEffect(() => {
  //   loadAccount();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // Debug app deployment information
  useHotkeys(
    "ctrl+shift+alt+d,command+shift+option+d",
    (e) => !e.repeat && notify(`${config.app.version} @ ${config.app.gitHash}`)
  );

  /** Load authenticated account (if any) */
  // const loadAccount = async () => {
  //   // Only try fetching authenticated account if all auth tokens are present
  //   // if (!AuthService.hasAuthTokens()) {
  //   //   setLoading(false);
  //   //   // TODO: Prevent route access if necessary (and possible???)
  //   //   return;
  //   // }

  //   let user;
  //   try {
  //     user = await UserService.fetchUser(AuthService.userId);
  //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   } catch (e) {
  //     // Auth tokens should be cleaned up if authentication fails
  //     AuthService.removeAuthTokens();

  //     // TODO: Prevent route access if necessary (and possible???)

  //     notifyError(getError(e, "Error while fetching user"));
  //   }

  //   // dispatch(setProfile(user));

  //   // TODO: Determine whether user can actually view as merchant (requires merchant profile)!
  //   const viewType = StorageService.getString(StorageService.keys.profileViewType, "customer");
  //   // if (viewType === "merchant") {
  //   //   dispatch(toggleMerchantView(true));
  //   // }

  //   // NOTE: This needs to be triggered near the end of app loading function, to ensure that
  //   //         all dependent data is loaded/stored before setting the app to "ready."
  //   setLoading(false);

  //   // TODO: Potentially initiate automatic refresh token cycle???
  //   // TODO: Redirect away from "unauthenticated" pages when authenticated???
  // };

  /** Render app (with loading support) */
  const loading = false;
  const renderApp = () => {
    if (!loading) return <Component {...pageProps} />;

    return (
      <Stack alignItems="center" justifyContent="center" sx={{ height: "100vh", width: "100%" }}>
        <CircularProgress size={64} />
      </Stack>
    );
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CssBaseline />
      <div className="app">{renderApp()}</div>
    </>
  );
};

/** Inject all necessary providers to app (for use within main component definition) */
const WrappedApp = (props) => {
  console.log('Hello world >>>>')
  return (
    // <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
          {/* <ContextProvider> */}
            <App {...props} />
          {/* </ContextProvider> */}
        {/* </LocalizationProvider> */}
      </ThemeProvider>
    // </ReduxProvider>
  );
};

export default WrappedApp;
