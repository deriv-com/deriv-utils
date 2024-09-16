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

describe("isValidJson", () => {
    test("should return true for a valid JSON string", () => {
        expect(LocalStorageUtils.isValidJson("{}")).toBe(true);
        expect(LocalStorageUtils.isValidJson('{"key":"value"}')).toBe(true);
        expect(LocalStorageUtils.isValidJson("[1, 2, 3]")).toBe(true);
        expect(LocalStorageUtils.isValidJson('"string"')).toBe(true);
        expect(LocalStorageUtils.isValidJson("true")).toBe(true);
        expect(LocalStorageUtils.isValidJson("null")).toBe(true);
    });

    test("should return false for an invalid JSON string", () => {
        expect(LocalStorageUtils.isValidJson("{key:value}")).toBe(false);
        expect(LocalStorageUtils.isValidJson('"unclosed string')).toBe(false);
        expect(LocalStorageUtils.isValidJson('{ "key": }')).toBe(false);
        expect(LocalStorageUtils.isValidJson("[1, 2, 3")).toBe(false);
    });

    test("should return false for non-JSON strings", () => {
        expect(LocalStorageUtils.isValidJson("")).toBe(false);
        expect(LocalStorageUtils.isValidJson("random text")).toBe(false);
    });
});
