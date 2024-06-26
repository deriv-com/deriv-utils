import { describe, test, expect, vitest, beforeEach, vi } from "vitest";
import { URLUtils } from "../index";
import { LocalStorageUtils, LocalStorageConstants } from "../..";
import { LoginInfo, isDomainAllowed } from "../url.utils";

function setSearchParam(queryString: string) {
    Object.defineProperty(window, "location", {
        writable: true,
        value: {
            pathname: "",
            search: queryString,
        },
    });
}

beforeEach(() => {
    setSearchParam("");
});

describe("URLUtils.getLoginInfoFromURL", () => {
    test("should return correct data from url query params if present", () => {
        setSearchParam("?acct1=VRTC1069&token1=a1-xbczn&cur1=USD&acct2=CR1069&token2=a1-xbzn2&cur2=GBP");
        const expected = {
            loginInfo: [
                {
                    loginid: "VRTC1069",
                    token: "a1-xbczn",
                    currency: "USD",
                },
                {
                    loginid: "CR1069",
                    token: "a1-xbzn2",
                    currency: "GBP",
                },
            ],
            paramsToDelete: ["acct1", "token1", "cur1", "acct2", "token2", "cur2"],
        };

        const output = URLUtils.getLoginInfoFromURL();
        expect(output).toStrictEqual(expected);
    });

    test("should return empty arrays if url query params is not present", () => {
        const expected = {
            loginInfo: [],
            paramsToDelete: [],
        };
        const output = URLUtils.getLoginInfoFromURL();
        expect(output).toStrictEqual(expected);
    });

    test("should return only fully formed loginInfo", () => {
        setSearchParam("?acct1=VRTC1069&cur1=USD&acct2=CR1069&token2=a1-xbzn2&cur2=GBP");
        const expected = {
            loginInfo: [
                {
                    loginid: "CR1069",
                    token: "a1-xbzn2",
                    currency: "GBP",
                },
            ],
            paramsToDelete: ["acct1", "cur1", "acct2", "token2", "cur2"],
        };

        const output = URLUtils.getLoginInfoFromURL();
        expect(output).toStrictEqual(expected);
    });

    test("should still delete params if query strings result in no valid loginInfo", () => {
        setSearchParam("?acct1=VRTC1069&cur1=USD&acct2=CR1069&token2=a1-xbzn2");
        const expected = {
            loginInfo: [],
            paramsToDelete: ["acct1", "cur1", "acct2", "token2"],
        };
        const output = URLUtils.getLoginInfoFromURL();
        expect(output).toStrictEqual(expected);
    });

    test("should return empty arrays if non matching query param is present", () => {
        setSearchParam("?something=not?&related=to&the=code");
        const expected = {
            loginInfo: [],
            paramsToDelete: [],
        };
        const output = URLUtils.getLoginInfoFromURL();
        expect(output).toStrictEqual(expected);
    });
});

describe("URLUtils.getDefaultActiveAccount", () => {
    test("should return virtual account as default", () => {
        const inputLoginInfo: LoginInfo[] = [
            {
                loginid: "MF104911",
                currency: "GBP",
                token: "A1-securityplzdontflagme",
            },
            {
                loginid: "CR109302",
                currency: "USD",
                token: "A1-somerandomtokens",
            },
            {
                loginid: "VRTC100041",
                currency: "USD",
                token: "A1-invalidtoken",
            },
        ];

        const defaultAccount = URLUtils.getDefaultActiveAccount(inputLoginInfo);
        expect(defaultAccount).toStrictEqual({
            loginid: "VRTC100041",
            currency: "USD",
            token: "A1-invalidtoken",
        });
    });

    test("should return first account if no VR account is present", () => {
        const inputLoginInfo: LoginInfo[] = [
            {
                loginid: "MF104911",
                currency: "GBP",
                token: "A1-securityplzdontflagme",
            },
            {
                loginid: "CR109300",
                currency: "USD",
                token: "A1-somethingsomething",
            },
            {
                loginid: "CR109302",
                currency: "USD",
                token: "A1-somerandomtokens",
            },
        ];

        const defaultAccount = URLUtils.getDefaultActiveAccount(inputLoginInfo);
        expect(defaultAccount).toBe(inputLoginInfo[0]);
    });

    test("should return undefined if no logininfo is present", () => {
        const defaultAccount = URLUtils.getDefaultActiveAccount(undefined);
        expect(defaultAccount).toBeUndefined();
    });
});

describe("URLUtils.filterSearchParams", () => {
    window.history.pushState = vitest.fn();

    test("should remove matching query params", () => {
        setSearchParam("?key1=somevalue&key2=key1&key3=someothervalue&key4=value4");
        URLUtils.filterSearchParams(["key1", "key3"]);
        expect(window.history.pushState).toBeCalledWith(null, "", "?key2=key1&key4=value4");
    });

    test("should not remove query params that do not match", () => {
        const expected = "?one=1&two=2&three=3";
        setSearchParam(expected);
        URLUtils.filterSearchParams(["key1", "key3"]);
        expect(window.history.pushState).toBeCalledWith(null, "", expected);
    });

    test("should not remove anything if an invalid array is passed", () => {
        const expected = "?one=1&two=2&three=3";
        setSearchParam(expected);
        /** @ts-expect-error invalid state test */
        URLUtils.filterSearchParams(["", undefined, null]);
        expect(window.history.pushState).toBeCalledWith(null, "", expected);
    });
});

describe("URLUtils.getServerURL", () => {
    test("should return blue.derivws.com if nothing is specified", () => {
        const output = URLUtils.getServerURL();
        expect(output).toBe("blue.derivws.com");
    });

    test("should prioritise user configured server url", () => {
        vi.spyOn(LocalStorageUtils, "getValue").mockImplementation((key: string) => {
            if (key === LocalStorageConstants.configServerURL) {
                return "user.defined.com";
            }
            if (key === LocalStorageConstants.activeLoginid) {
                return "VRTC1000067";
            }
            return "";
        });

        const output = URLUtils.getServerURL();
        expect(output).toBe("user.defined.com");
    });

    test("should return green.derivws.com if user account is real", () => {
        vi.spyOn(LocalStorageUtils, "getValue").mockImplementation((key: string) => {
            if (key === LocalStorageConstants.activeLoginid) {
                return "CR10000043";
            }
            return "";
        });

        const output = URLUtils.getServerURL();
        expect(output).toBe("green.derivws.com");
    });

    test("should return blue.derivws.com if user account is real", () => {
        vi.spyOn(LocalStorageUtils, "getValue").mockImplementation((key: string) => {
            if (key === LocalStorageConstants.activeLoginid) {
                return "VRTC1000067";
            }
            return "";
        });

        const output = URLUtils.getServerURL();
        expect(output).toBe("blue.derivws.com");
    });
});

describe("URLUtils.getOauthURL", () => {
    test("should return correct oauth url based on app id and language", () => {
        vi.spyOn(LocalStorageUtils, "getValue").mockImplementation((key: string) => {
            if (key === LocalStorageConstants.i18nLanguage) {
                return "AR";
            }
            if (key === LocalStorageConstants.configAppId) {
                return "420";
            }
            return "";
        });

        const output = URLUtils.getOauthURL();
        expect(output).toBe("https://oauth.deriv.com/oauth2/authorize?app_id=420&l=AR&brand=deriv");
    });

    test("should fallback to EN if i18n_language localstorage key is not present", () => {
        vi.spyOn(LocalStorageUtils, "getValue").mockImplementation((key: string) => {
            if (key === LocalStorageConstants.i18nLanguage) {
                return null;
            }
            if (key === LocalStorageConstants.configAppId) {
                return "420";
            }
            return "";
        });

        const output = URLUtils.getOauthURL();
        expect(output).toBe("https://oauth.deriv.com/oauth2/authorize?app_id=420&l=EN&brand=deriv");
    });
});

describe("URLUtils.getWebsocketURL", () => {
    test("should return correct websocket URL", () => {
        vi.spyOn(LocalStorageUtils, "getValue").mockImplementation((key: string) => {
            if (key === LocalStorageConstants.configServerURL) {
                return "ws.derivws.com";
            }
            if (key === LocalStorageConstants.configAppId) {
                return "777";
            }
            if (key === LocalStorageConstants.i18nLanguage) {
                return "FR";
            }
            return "";
        });

        const output = URLUtils.getWebsocketURL();
        expect(output).toBe("wss://ws.derivws.com/websockets/v3?app_id=777&l=FR&brand=deriv");
    });
});

describe("URLUtils.getQueryParameter", () => {
    test("returns the value for the 'lang' key", () => {
        Object.defineProperty(window, "location", {
            value: { search: "?lang=ES" },
        });

        const URLParameters = URLUtils.getQueryParameter("lang");
        expect(URLParameters).toBe("ES");
    });

    test("returns the value for the 'lang' key when we have multiple query parameters", () => {
        Object.defineProperty(window, "location", {
            value: { search: "?lang=ES&action=test" },
        });

        const URLParameters = URLUtils.getQueryParameter("lang");
        expect(URLParameters).toBe("ES");
    });

    test("returns null when we don't have value for the passed key", () => {
        Object.defineProperty(window, "location", {
            value: { search: "?lang=ES" },
        });

        const URLParameters = URLUtils.getQueryParameter("action");
        expect(URLParameters).toBeNull();
    });
});

describe("URLUtils.normalizePath", () => {
    test("removes leading and trailing slashes", () => {
        const result = URLUtils.normalizePath("/example/path/");
        expect(result).toBe("example/path");
    });

    test("removes invalid characters", () => {
        const result = URLUtils.normalizePath("inval!d_characters");
        expect(result).toBe("invald_characters");
    });

    test("handles an empty path", () => {
        const result = URLUtils.normalizePath("");
        expect(result).toBe("");
    });
});

describe("URLUtils.getDerivStaticURL", () => {
    test("getDerivStaticURL with path and default language(en)", () => {
        vi.spyOn(LocalStorageUtils, "getValue").mockImplementation((key: string) => {
            if (key === LocalStorageConstants.i18nLanguage) {
                return "EN";
            }
            return null;
        });
        const result = URLUtils.getDerivStaticURL("/p2p/");
        expect(result).toBe("https://deriv.com/p2p");
        vi.restoreAllMocks();
    });

    test("getDerivStaticURL with path and Spanish language", () => {
        vi.spyOn(LocalStorageUtils, "getValue").mockImplementation((key: string) => {
            if (key === LocalStorageConstants.i18nLanguage) {
                return "ES";
            }
            return null;
        });

        const result = URLUtils.getDerivStaticURL("/p2p/");
        expect(result).toBe("https://deriv.com/es/p2p");
        vi.restoreAllMocks();
    });

    test("getDerivStaticURL with path and language that contains '_'", () => {
        vi.spyOn(LocalStorageUtils, "getValue").mockImplementation((key: string) => {
            if (key === LocalStorageConstants.i18nLanguage) {
                return "ZH_TW";
            }
            return null;
        });

        const result = URLUtils.getDerivStaticURL("/p2p/");
        expect(result).toBe("https://deriv.com/zh-tw/p2p");
        vi.restoreAllMocks();
    });

    test("getDerivStaticURL with path and isEU true", () => {
        const result = URLUtils.getDerivStaticURL("/p2p/", { isEU: true });
        expect(result).toBe("https://eu.deriv.com/p2p");
    });

    test("getDerivStaticURL with path and isDocument true and default language", () => {
        const result = URLUtils.getDerivStaticURL("regulatory/deriv-com-ltd-membership.pdf", { isDocument: true });
        expect(result).toBe("https://deriv.com/regulatory/deriv-com-ltd-membership.pdf");
    });

    test("getDerivStaticURL with path and isDocument true and Spanish language", () => {
        const result = URLUtils.getDerivStaticURL("regulatory/deriv-com-ltd-membership.pdf", { isDocument: true });
        expect(result).toBe("https://deriv.com/regulatory/deriv-com-ltd-membership.pdf");
    });

    test("getDerivStaticURL with path and isEU true and isDocument true", () => {
        const result = URLUtils.getDerivStaticURL("regulatory/deriv-com-ltd-membership.pdf", {
            isDocument: true,
            isEU: true,
        });
        expect(result).toBe("https://eu.deriv.com/regulatory/deriv-com-ltd-membership.pdf");
    });
});

describe("BrandUtils.isDomainAllowed", () => {
    test("localhost:8443 should be allowed", () => {
        expect(isDomainAllowed("localhost:8443")).toBe(true);
    });

    test("subdomain.localhost:8443 should be allowed", () => {
        expect(isDomainAllowed("subdomain.localhost:8443")).toBe(true);
    });

    test("pages.dev should be allowed", () => {
        expect(isDomainAllowed("pages.dev")).toBe(true);
    });

    test("subdomain.pages.dev should be allowed", () => {
        expect(isDomainAllowed("subdomain.pages.dev")).toBe(true);
    });

    test("binary.sx should be allowed", () => {
        expect(isDomainAllowed("binary.sx")).toBe(true);
    });

    test("binary.com should be allowed", () => {
        expect(isDomainAllowed("binary.com")).toBe(true);
    });

    test("deriv.com should be allowed", () => {
        expect(isDomainAllowed("deriv.com")).toBe(true);
    });

    test("deriv.me should be allowed", () => {
        expect(isDomainAllowed("deriv.me")).toBe(true);
    });

    test("deriv.be should be allowed", () => {
        expect(isDomainAllowed("deriv.be")).toBe(true);
    });

    test("deriv.dev should be allowed", () => {
        expect(isDomainAllowed("deriv.dev")).toBe(true);
    });

    test("randomdomain.com should not be allowed", () => {
        expect(isDomainAllowed("randomdomain.com")).toBe(false);
    });

    test("subdomain.randomdomain.com should not be allowed", () => {
        expect(isDomainAllowed("subdomain.randomdomain.com")).toBe(false);
    });

    test("deriv.org should not be allowed", () => {
        expect(isDomainAllowed("deriv.org")).toBe(false);
    });

    test("deriv.com.au should not be allowed", () => {
        expect(isDomainAllowed("deriv.com.au")).toBe(false);
    });

    test("deriv.dev1 should not be allowed", () => {
        expect(isDomainAllowed("deriv.dev1")).toBe(false);
    });

    test("binary.sxx should not be allowed", () => {
        expect(isDomainAllowed("binary.sxx")).toBe(false);
    });
});
