import { ParsedUrlQuery } from "querystring";
import Router from "next/router";

/**
 * Remove search parameters from the route query
 *
 * @param params - Search parameters to remove
 */
const clearSearchParams = (params) => {
  const clearedParams = { ...Router.query };
  params.forEach((param) => {
    delete clearedParams[param];
  });

  Router.replace({ query: clearedParams });
};

/**
 * Convert search options to URL parameters.
 *
 * NOTE: Mainly joins arrays into comma-separated string.
 *
 * @param   params   - JS search options
 * @param   existing - Existing search query
 * @returns URL search parameters
 */
const createSearchParams = (params, existing = {}) => {
  return Object.keys(params).reduce((accum, key) => {
    let value = params[key];
    value = Array.isArray(value) ? value.join(",") : value;

    return { ...accum, [key]: value };
  }, existing);
};

/**
 * Parse search values from query params
 *
 * NOTE: Parses comma-separated strings into an array (typically IDs).
 *
 * @param   query         - URL query params
 * @param   defaultValues - Default search values (drives parsing)
 * @returns Parsed search values
 */
const parseSearchParams = (query, defaultValues) => {
  return Object.keys(defaultValues).reduce(
    (accum, key) => {
      const defaultValue = defaultValues[key];
      let urlValue = query[key];
      if (!urlValue || !urlValue.length) return accum;

      const arrayType = Array.isArray(defaultValue);
      if (arrayType) {
        // Arrays may be represented in URL array format or as a comma-separated string
        urlValue = Array.isArray(urlValue) ? urlValue : urlValue.split(",").filter((x) => x);
      } else {
        // Use first element from arrays provided in place of expected strings
        urlValue = Array.isArray(urlValue) ? urlValue[0] : urlValue;
      }

      return { ...accum, [key]: urlValue };
    },
    { ...defaultValues }
  );
};

/**
 * Update the filter/search URL
 *
 * NOTE: Automatically joins arrays into a comma-separated list
 *
 * @param params - Updated filter params
 */
const updateSearchParams = (params) => {
  Router.replace({
    query: {
      ...Router.query,
      ...createSearchParams(params),
    },
  });
};

export { clearSearchParams, createSearchParams, parseSearchParams, updateSearchParams };
