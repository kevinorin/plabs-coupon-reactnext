/**
 * Wrapper around local storage
 */
class StorageService {
  /** Local storage keys */
  keys = {
    /** Track whether user is viewing as merchant or customer */
    profileViewType: "PROFILE_VIEW_TYPE",
  };

  /**
   * Get a boolean value from local storage
   *
   * @param   key          - Local storage key
   * @param   defaultValue - Default value if not found
   * @returns Boolean value
   */
  getBoolean(key, defaultValue) {
    const booleanValue = localStorage.getItem(key);
    if (!booleanValue) return defaultValue;

    try {
      return Boolean(JSON.parse(booleanValue));
    } catch (e) {
      return false;
    }
  }

  /**
   * Get a string value from local storage
   *
   * @param   key - Local storage key
   * @param   defaultValue - Default value if not found
   * @returns String value
   */
  getString(key, defaultValue) {
    const stringValue = localStorage.getItem(key);
    return stringValue ?? defaultValue;
  }

  /**
   * Set a boolean value in local storage
   *
   * @param  key   - Local storage key
   * @param  value - Boolean value
   */
  setBoolean(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Set a string value in local storage
   *
   * @param  key   - Local storage key
   * @param  value - String value
   */
  setString(key, value) {
    localStorage.setItem(key, value);
  }

  /**
   * Remove a local storage value
   *
   * @param key - Local storage key
   */
  removeValue(key) {
    localStorage.removeItem(key);
  }
}

const singleton = new StorageService();
export default singleton;
