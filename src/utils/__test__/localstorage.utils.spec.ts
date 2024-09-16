import { describe, test, expect, vitest, beforeEach } from "vitest";
import { LocalStorageUtils } from "..";
import { LocalStorageConstants } from "../..";

beforeEach(() => {
    window.localStorage.getItem = vitest.fn();
    window.localStorage.setItem = vitest.fn();
});

describe("LocalStorageUtils.getValue", () => {
    test("should return correct object stored in localstorage", () => {
        const expected = {
            dark: "very dark",
            light: "wow bright",
        };
        window.localStorage.getItem = vitest.fn((key: string) => {
            if (key === LocalStorageConstants.uiTheme) {
                return JSON.stringify(expected);
            }
            return null;
        });

        const output = LocalStorageUtils.getValue(LocalStorageConstants.uiTheme);
        expect(output).toStrictEqual(expected);
    });

    test("should return correct value if number is stored in localstorage", () => {
        window.localStorage.getItem = vitest.fn((key: string) => {
            if (key === LocalStorageConstants.uiTheme) {
                return `0`;
            }
            return null;
        });

        const output = LocalStorageUtils.getValue(LocalStorageConstants.uiTheme);
        expect(output).toBe(0);
    });

    test("should return null if empty string is stored in localstorage", () => {
        window.localStorage.getItem = vitest.fn((key: string) => {
            if (key === LocalStorageConstants.uiTheme) {
                return "";
            }
            return null;
        });

        const output = LocalStorageUtils.getValue(LocalStorageConstants.uiTheme);
        expect(output).toBeNull();
    });

    test("should return null if string null is stored in localstorage", () => {
        window.localStorage.getItem = vitest.fn((key: string) => {
            if (key === LocalStorageConstants.uiTheme) {
                return `null`;
            }
            return null;
        });

        const output = LocalStorageUtils.getValue(LocalStorageConstants.uiTheme);
        expect(output).toBeNull();
    });

    test("should return undefined if string undefined is stored in localstorage", () => {
        window.localStorage.getItem = vitest.fn((key: string) => {
            if (key === LocalStorageConstants.uiTheme) {
                return `undefined`;
            }
            return null;
        });

        const output = LocalStorageUtils.getValue(LocalStorageConstants.uiTheme);
        expect(output).toBeUndefined();
    });

    test("should return null if invalid object is stored in localstorage", () => {
        window.localStorage.getItem = vitest.fn((key: string) => {
            if (key === LocalStorageConstants.uiTheme) {
                return `{ malforemed_object: 1 `;
            }
            return null;
        });

        const output = LocalStorageUtils.getValue(LocalStorageConstants.uiTheme);
        expect(output).toBeNull();
    });
});

describe("LocalStorageUtils.setValue", () => {
    test("should set the correct value", () => {
        const input = { some: "value" };
        const expected = JSON.stringify(input);

        LocalStorageUtils.setValue("ui.theme", input);
        expect(window.localStorage.setItem).toBeCalledWith("ui.theme", expected);
    });
});
