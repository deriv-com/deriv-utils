import { describe, test, expect } from "vitest";
import { JSONUtils } from "..";

describe("isValidJson", () => {
    test("should return true for a valid JSON string", () => {
        expect(JSONUtils.isValidJson("{}")).toBe(true);
        expect(JSONUtils.isValidJson('{"key":"value"}')).toBe(true);
        expect(JSONUtils.isValidJson("[1, 2, 3]")).toBe(true);
        expect(JSONUtils.isValidJson('"string"')).toBe(true);
        expect(JSONUtils.isValidJson("true")).toBe(true);
        expect(JSONUtils.isValidJson("null")).toBe(true);
    });

    test("should return false for an invalid JSON string", () => {
        expect(JSONUtils.isValidJson("{key:value}")).toBe(false);
        expect(JSONUtils.isValidJson('"unclosed string')).toBe(false);
        expect(JSONUtils.isValidJson('{ "key": }')).toBe(false);
        expect(JSONUtils.isValidJson("[1, 2, 3")).toBe(false);
    });

    test("should return false for non-JSON strings", () => {
        expect(JSONUtils.isValidJson("")).toBe(false);
        expect(JSONUtils.isValidJson("random text")).toBe(false);
    });
});
