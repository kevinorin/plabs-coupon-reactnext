// Utilities
import { store } from "@store";
import { resetAppAction } from "@store/actions";
import { setProfile } from "@store/slices/user.slice";
import ApiService, { createApiInstance } from "./api.service";
import StorageService from "./storage.service";
import { auth } from "../firebase-config";

const AUTH_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_ID_KEY = "userId";
const WALLET_ID_KEY = "walletId";

class AuthService {
  /** Authentication JWT token */
  authToken = null;
  /** Authentication refresh token */
  refreshToken = null;
  /** Timeout/interval for auto-refreshing auth tokens */
  refreshTokenTimeout;
  /** Ongoing refresh token call (to prevent generating multiple refresh token calls) */
  refreshCall = null;
  /** Authenticated user ID */
  userId = null;
  /** Authenticated user wallet ID */
  walletId = null;

  constructor() {
    // Ensure auth token refresh cycle is cleaned up
    // NOTE: Necessary to check window since this will also run on server!
    if (typeof window != "undefined") {
      window.addEventListener("beforeunload", () => {
        this.clearRefreshTokenTimeout();
      });
    }
  }

  /** Clear automatated refresh token cycle timeout */
  clearRefreshTokenTimeout() {
    clearTimeout(this.refreshTokenTimeout);
  }

  /**
   * Determine whether user is authenticated
   *
   * @returns Whether user is authenticated
   */
  hasAuthTokens() {
    if (this.authToken && this.refreshToken && this.userId && this.walletId) {
      ApiService.setAuthToken(this.authToken);
      return true;
    }

    // Load authentication if not already loaded
    this.loadAuth();

    const hasAuth = Boolean(this.authToken && this.refreshToken && this.userId && this.walletId);
    if (hasAuth && this.authToken) {
      ApiService.setAuthToken(this.authToken);
    }

    return hasAuth;
  }

  /** Load stored authentication tokens */
  loadAuth() {
    this.authToken = StorageService.getString(AUTH_TOKEN_KEY, AUTH_TOKEN_KEY);
    this.refreshToken = StorageService.getString(REFRESH_TOKEN_KEY, null);
    this.userId = StorageService.getString(USER_ID_KEY, null);
    this.walletId = StorageService.getString(WALLET_ID_KEY, null);
  }

  /**
   * Log user in via credentials (sends OTP)
   *
   * @param   credentials - User credentials
   * @returns OTP verification data
   */
  async login(credentials) {
    const response = await ApiService.api.post("/users/login", {
      walletID: credentials.walletId,
    });

    return response.data;
  }

  /**
   * Verify login OTP (gets auth tokens)
   *
   * @param   verification - OTP verification data
   * @returns Authentication tokens
   */
  async loginVerify(verification) {
    const response = await ApiService.api.post("/users/login/verify", {
      OTP: verification.otp,
      walletID: verification.walletId,
    });

    return this.setUserAndTokens(response.data);
  }

  /**
   * Logout authenticated user and clean up state
   *
   * NOTE: Only cleans up app state and avoids any routing, as it may be called
   *         from various places, including logout screen!
   */
  async logout() {
    this.removeAuthTokens();

    // Clean up profile view type
    StorageService.removeValue(StorageService.keys.profileViewType);

    store.dispatch(resetAppAction());
  }

  /**
   * Refresh authentication tokens
   *
   * Auth tokens are automatically refreshed periodically through an automatic
   *   cycle, although any errors during this process are ignored.
   *
   * @returns Reference to ongoing refresh tokens API call
   */
  async refreshTokens() {
    // Ignoring previous refresh call would invalidate that access token when the second request
    //   went through, causing another authentication error (voiding benefit entirely)!
    if (this.refreshCall) return this.refreshCall;

    // Avoid the ApiService axios instance to ensure that interceptors are not fired,
    //   which could trigger an infinite loop IF the API was ever updated to use a
    //   "Not Authenticated" status for invalid refresh tokens (future proof).
    const refreshTokenApi = createApiInstance();
    this.refreshCall = refreshTokenApi
      .post("/users/refresh-token", {
        refreshToken: this.refreshToken,
        walletName: this.walletId,
      })
      .then((response) => {
        // Automatic refresh calls are eventually disabled after enough consecutive
        //   refresh token calls without any other API activity in between.
        ApiService.refreshCallsSinceLastApiCall++;
        return this.setAuthTokens({
          authToken: response.data.jwtAccessToken,
          refreshToken: response.data.jwtRefreshToken,
        });
      })
      .catch((e) => {
        // Callers should handle any errors as appropriate, which may not be always...
        throw e;
      })
      .finally(() => {
        this.refreshCall = null;
      });

    return this.refreshCall;
  }

  /**
   * Clean up local authentication tokens and revoke remote tokens
   *
   * NOTE: Tokens are stored in memory and local storage
   * NOTE: Does not necessarily need to be awaited (errors are handled silently)!
   */
  removeAuthTokens() {
    this.clearRefreshTokenTimeout();

    this.authToken = null;
    this.refreshToken = null;
    this.userId = null;
    this.walletId = null;

    StorageService.removeValue(AUTH_TOKEN_KEY);
    StorageService.removeValue(REFRESH_TOKEN_KEY);
    StorageService.removeValue(USER_ID_KEY);
    StorageService.removeValue(WALLET_ID_KEY);

    // Clear Axios authorization header
    ApiService.removeAuthToken();
  }

  /**
   * Store authentication tokens
   *
   * NOTE: Tokens are stored in memory and local storage
   *
   * @param tokens - Authentication tokens
   */
  setAuthTokens(tokens) {
    const { authToken, refreshToken } = tokens;
    this.authToken = authToken;
    this.refreshToken = refreshToken;

    StorageService.setString(AUTH_TOKEN_KEY, authToken);
    StorageService.setString(REFRESH_TOKEN_KEY, refreshToken);

    // Set Axios authorization header
    ApiService.setAuthToken(authToken);

    // TODO: Enable AFTER actually parsing JWT to get expiry
    // Restart automatic auth token refresh cycle
    // this.setRefreshTokenTimeout(tokens.expiresIn);
  }

  /**
   * Store user details and authentication tokens
   *
   * @param   data - User details and auth tokens
   * @returns User and authentication tokens
   */
  setUserAndTokens(data) {
    const tokens = {
      authToken: data.jwtAccessToken,
      refreshToken: data.jwtRefreshToken,
      userId: data.user.userId,
      walletId: data.user.walletName,
    };

    const user = {
      email: data.user.email,
      fullName: `${data.user.firstName} ${data.user.lastName}`,
      phone: data.user.phone,
      userId: data.user.userId,
      walletId: data.user.walletName,
    };

    // Store user ID and wallet ID
    this.userId = user.userId;
    this.walletId = user.walletId;
    StorageService.setString(USER_ID_KEY, user.userId);
    StorageService.setString(WALLET_ID_KEY, user.walletId);

    store.dispatch(setProfile(user));
    this.setAuthTokens(tokens);

    return tokens;
  }

  /**
   * Set automated refresh token cycle timeout, after which auth tokens will automatically
   *   be refreshed to limit need for refreshing while handling authentication errors.
   *
   * @param seconds - Time before auto-refreshing auth tokens
   */
  setRefreshTokenTimeout(seconds) {
    this.clearRefreshTokenTimeout();

    if (!seconds || seconds < 0) return;

    // Automatic refresh calls are eventually disabled after enough consecutive
    //   refresh token calls without any other API activity in between.
    if (ApiService.refreshCallsSinceLastApiCall > 2) return;

    // Refresh an auth token just before before it would expire
    const preExpiryLeeway = 5;
    const timeoutDelay = (seconds - preExpiryLeeway) * 1000;
    if (timeoutDelay <= 0) return;

    this.refreshTokenTimeout = window?.setTimeout(() => {
      this.refreshTokens().catch(() => {
        // Errors while automatically refreshing auth token should not necessarily
        //   cause an error and force login, as this would disrupt user flow and
        //   will be caught/handled properly when user performs an authenticated action.
        console.log("Automatically refreshing auth token failed!");
      });
    }, timeoutDelay);
  }

  /**
   * Create user account
   *
   * @param   credentials - User credentials
   * @returns Authentication tokens
   */
  async signupUser(credentials) {
    const email = credentials.email;
    const actionCodeSettings = {
      url: process.env.DOMAIN_NAME,
      handleCodeInApp: undefined,
      dynamicLinkDomain: undefined,
    };
    auth
      .sendSignInLinkToEmail(email, actionCodeSettings)
      .then((response) => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem("emailForSignIn", "email");
        return this.setUserAndTokens(response.data);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}

const singleton = new AuthService();
export default singleton;
