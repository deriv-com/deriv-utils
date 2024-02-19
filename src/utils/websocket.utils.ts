import { LocalStorageConstants, AppIDConstants } from "../constants";

/**
 * Retrieves the active login ID from either localStorage or the URL query parameters.
 *
 * This function first attempts to get the active login ID from localStorage using a predefined key from `LocalStorageConstants`.
 * If not found in localStorage, it then tries to retrieve the login ID from the URL query parameters, specifically looking for `acct1`.
 *
 * @returns {string | null} The active login ID if available, otherwise `null`.
 */
export const getActiveLoginid = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlActiveLoginid = urlSearchParams.get("acct1");
    return window.localStorage.getItem(LocalStorageConstants.activeLoginid) || urlActiveLoginid;
};

/**
 * Determines the environment type based on the login ID.
 *
 * This function checks if the provided login ID starts with 'VR' which is the loginid prefix for virtual accounts. All others that do not match this
 * is considered to be real accounts.
 *
 * @param {string | null} loginid - The login ID to evaluate.
 * @returns {"real" | "demo"} The environment type as either 'real' or 'demo'.
 */
export const getEnvironmentFromLoginid = (loginid: string | null) => {
    if (loginid && !/^VR/.test(loginid)) return "real";
    return "demo";
};

/**
 * Retrieves the application ID (app_id) from localStorage or based on the current domain.
 *
 * This function first tries to obtain the app_id from localStorage using a key specified in `LocalStorageConstants`.
 * If not found, it checks a mapping defined in `AppIDConstants` to find an app_id associated with the current domain.
 * If no domain-specific app_id is found, it defaults to "36300" which is the localhost app id.
 *
 * @returns {string} The application ID.
 */
export const getAppId = () => {
    const configAppId = window.localStorage.getItem(LocalStorageConstants.configAppId);
    if (configAppId) return configAppId;

    const currentDomain = window.location.hostname;

    const domainAppId = AppIDConstants.domainAppId[currentDomain as keyof typeof AppIDConstants.domainAppId];
    if (domainAppId) return domainAppId;

    return "36300";
};
