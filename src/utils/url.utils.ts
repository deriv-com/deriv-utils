import { LocalStorageConstants, AppIDConstants } from "../constants";
import { getActiveLoginid, getAppId, getEnvironmentFromLoginid } from "./websocket.utils";

export type AccountInfo = { loginid: string; currency: string; token: string };

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

export const filterSearchParams = (searchParamsToRemove: string[]) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParamsToRemove.forEach((p) => searchParams.delete(p));

    const newURL = `${window.location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    window.history.pushState(null, "", newURL);
};

export const getOauthURL = () => {
    const language = window.localStorage.getItem(LocalStorageConstants.i18nLanguage) ?? "EN";

    return `https://oauth.deriv.com/oauth2/authorize?app_id=${getAppId()}&l=${language}&brand=${
        AppIDConstants.appBrand
    }`;
};

export const getServerURL = () => {
    const configServerURL = window.localStorage.getItem(LocalStorageConstants.configServerURL);
    if (configServerURL) return configServerURL;

    const activeLoginid = getActiveLoginid();
    return AppIDConstants.environments[getEnvironmentFromLoginid(activeLoginid)];
};

export const getWebsocketURL = () => {
    const serverURL = getServerURL();
    const language = window.localStorage.getItem(LocalStorageConstants.i18nLanguage) ?? "EN";

    return `wss://${serverURL}/websockets/v3?app_id=${getAppId()}&l=${language}&brand=${AppIDConstants.appBrand}`;
};
