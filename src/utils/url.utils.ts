import { LocalStorageConstants, AppIDConstants } from "../constants";
import { getActiveLoginid, getAppId, getEnvironmentFromLoginid } from "./websocket.utils";

/**
 * Defines the structure for account information.
 * @typedef {Object} AccountInfo
 * @property {string} loginid - The loginid for the account.
 * @property {string} currency - The currency code for the account.
 * @property {string} token - The authentication token for the account.
 */
export type AccountInfo = { loginid: string; currency: string; token: string };

/**
 * Extracts the login information from the URL's query parameters.
 * This function parses the window's current URL search parameters looking for account, token, and currency information.
 * It constructs an array of partially formed `AccountInfo` objects and filters out any entries that do not have all required properties.
 * It also returns a list of parameter keys that are related to account information and can be deleted.
 *
 * @returns {{loginInfo: AccountInfo[], paramsToDelete: string[]}} An object containing an array of `AccountInfo` objects and an array of parameter keys to delete.
 */
export const getLoginInfoFromURL = () => {
    const loginInfo: Partial<AccountInfo>[] = [];
    const paramsToDelete: string[] = [];
    const searchParams = new URLSearchParams(window.location.search);

    for (const [key, value] of searchParams.entries()) {
        const accountRegex = key.match(/^acct(\d+)/);
        const tokenRegex = key.match(/^token(\d+)/);
        const currencyRegex = key.match(/^cur(\d+)/);

        if (accountRegex) {
            loginInfo[+accountRegex[1] - 1] = { ...(loginInfo[+accountRegex[1] - 1] || {}), loginid: value };
        }
        if (tokenRegex) {
            loginInfo[+tokenRegex[1] - 1] = { ...(loginInfo[+tokenRegex[1] - 1] || {}), token: value };
        }
        if (currencyRegex) {
            loginInfo[+currencyRegex[1] - 1] = {
                ...(loginInfo[+currencyRegex[1] - 1] || {}),
                currency: value,
            };
        }
        if (/acct/.test(key) || /token/.test(key) || /cur/.test(key)) paramsToDelete.push(key);
    }

    const filteredLoginInfo = loginInfo.filter((login) =>
        ["loginid", "token", "currency"].every((k) => Object.keys(login).includes(k))
    ) as AccountInfo[];

    return { loginInfo: filteredLoginInfo, paramsToDelete };
};

/**
 * Filters and removes specified search parameters from the current URL.
 * This function modifies the current URL's query string by removing the specified search parameters and then updates the history state.
 *
 * @param {string[]} searchParamsToRemove - An array of search parameter keys to remove from the current URL.
 */
export const filterSearchParams = (searchParamsToRemove: string[]) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParamsToRemove.forEach((p) => searchParams.delete(p));

    const newURL = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    window.history.pushState(null, "", newURL);
};

/**
 * Constructs the OAuth URL with query parameters for language, app_id, and brand.
 * The language is retrieved from local storage or defaults to "EN" if not set. The app_id and brand are obtained from constants.
 *
 * @returns {string} The constructed OAuth URL.
 */
export const getOauthURL = () => {
    const language = window.localStorage.getItem(LocalStorageConstants.i18nLanguage) ?? "EN";

    return `https://oauth.deriv.com/oauth2/authorize?app_id=${getAppId()}&l=${language}&brand=${
        AppIDConstants.appBrand
    }`;
};

/**
 * Determines the server URL based on the active login ID.
 * It first attempts to retrieve the server URL from local storage. If not found, it uses the active login ID to determine the server URL from predefined environments.
 *
 * @returns {string} The determined server URL.
 */
export const getServerURL = () => {
    const configServerURL = window.localStorage.getItem(LocalStorageConstants.configServerURL);
    if (configServerURL) return configServerURL;

    const activeLoginid = getActiveLoginid();
    return AppIDConstants.environments[getEnvironmentFromLoginid(activeLoginid)];
};

/**
 * Constructs the WebSocket URL with query parameters for app_id, language, and brand.
 * The server URL is determined by calling `getServerURL`, and the language is retrieved from local storage or defaults to "EN" if not set.
 *
 * @returns {string} The constructed WebSocket URL.
 */
export const getWebsocketURL = () => {
    const serverURL = getServerURL();
    const language = window.localStorage.getItem(LocalStorageConstants.i18nLanguage) ?? "EN";

    return `wss://${serverURL}/websockets/v3?app_id=${getAppId()}&l=${language}&brand=${AppIDConstants.appBrand}`;
};
