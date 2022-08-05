import axios, { AxiosInstance, AxiosRequestConfig, HeadersDefaults } from "axios";
import HttpStatus from "http-status-codes";
import Router from "next/router";
import qs from "qs";

// Utilities
// import config from "@config";
import AuthService from "./auth.service";

/**
 * Create a common Axios instance using a common config, which can be used
 *   for creating custom Axios instances without interceptors, etc.
 *
 * NOTE: Use with caution, preferring the preconfigured 'ApiService.api' instance instead!
 *
 * @param   overrides - Optional Axios instance config overrides
 * @returns Custom Axios instance from common config
 */
const createApiInstance = (overrides = {}) => {
  return axios.create({
    baseURL: '',
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    timeout: 100000000,

    // Parameters are serialized to support arrays (bracket/repeated notation).
    // NOTE: This doesn't work with arrays of objects, which require "index" mode.
    //         However, since this is a slightly longer query is should be
    //         only used where appropriate (by overriding in request).
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "brackets" }),
    ...overrides,
  });
};

class ApiService {
  /**
   * API axios instance to be used for most API requests.
   *
   * NOTE: Utilizes interceptors to handle retrying failed requests after refreshing auth tokens.
   *   However, this instance should not be used if it could trigger interceptor loops!
   */
  api;
  /**
   * Refresh calls since last API call of any type, used to disable needless/endless
   *   token refreshing for "inactive" users.
   */
  refreshCallsSinceLastApiCall = 0;

  constructor() {
    this.api = createApiInstance();

    // Apply request interceptor to reset inactive refresh calls counter
    this.api.interceptors.request.use((config) => this.interceptRequests(config));

    // Apply authentication error interceptor to default API service Axios instance
    this.api.interceptors.response.use(
      (response) => response,
      (error) => this.interceptErrors(error)
    );
  }

  /**
   * Intercept Axios errors and check for authentication problems. Failed
   *   authentication will automatically refresh auth token and try again.
   * Errors during refresh token or auth errors afterwards will logout user.
   *
   * @param   error - Axios response error
   * @returns Axios response chain
   */
  async interceptErrors(error) {
    const status = error.response?.status ?? null;

    // Only authentication errors should trigger refresh token workflow
    if (status !== HttpStatus.UNAUTHORIZED) {
      return Promise.reject(error);
    }

    // Only try refreshing the auth token if user had a previous authentication token
    if (!AuthService.hasAuthTokens()) {
      return Promise.reject(error);
    }

    // Errors while refreshing auth tokens indicate an authentication issue,
    //   and should force user to reauthenticate.
    try {
      await AuthService.refreshTokens();
    } catch (refreshError) {
      await this.handleRefreshAuthError();

      return Promise.reject(refreshError);
    }

    // Retry original request (after refreshing auth tokens) by copying config
    try {
      const retryConfig = {
        ...error.config,
        headers: {
          ...error.config.headers,
          ...this.api.defaults.headers,
        },
      };

      // Avoid the class axios instance to ensure that interceptors are not fired,
      //   which could trigger an infinite interceptor loop IF the retry failed due to auth!
      const retryApi = createApiInstance();
      return retryApi(retryConfig);
    } catch (innerError) {
      // Only logout user if retry error was actually related to auth (and not just a failed request)
      const innerStatus = innerError.response?.status ?? null;
      if (innerStatus === HttpStatus.UNAUTHORIZED) {
        await this.handleRefreshAuthError();

        return Promise.reject("Authentication has timed out");
      }

      return Promise.reject(innerError);
    }
  }

  /**
   * Intercept Axios request and reset the counter of refresh calls since last API call.
   *
   * @param   config - Axios request config
   * @returns Axios request chain
   */
  interceptRequests(config) {
    // Refresh token calls should not reset consecutive call counter
    if (config.url?.includes("/refresh-token")) return config;

    this.refreshCallsSinceLastApiCall = 0;
    return config;
  }

  /** Clean up and redirect to login after a refresh authentication error */
  async handleRefreshAuthError() {
    await AuthService.logout();

    // TODO: Determine how to handle entire URL path (ie query strings)
    Router.replace({
      pathname: "/auth",
      query: {
        redirectUrl: Router.asPath,
      },
    });
  }

  /** Remove Axios authentication token */
  removeAuthToken(){
    const headers = this.api.defaults.headers;
    headers["Authorization"] = null;
  }

  /**
   * Set Axios authentication token
   *
   * @param token - Authentication header token
   */
  setAuthToken(token) {
    const headers = this.api.defaults.headers;
    headers["Authorization"] = `Bearer ${token}`;
  }
}

const singleton = new ApiService();
export default singleton;

export { createApiInstance };
