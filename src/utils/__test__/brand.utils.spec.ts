import { describe, expect, test } from "vitest";
import { getBrandWebsiteName, getLegalLandingCompany, getPlatformName } from "../brand.utils";

describe("BrandUtils.getLegalLandingCompany", () => {
    test('getLegalLandingCompany should return "Deriv (FX) Ltd" for landing_company "fx"', () => {
        expect(getLegalLandingCompany("fx")).toBe("Deriv (FX) Ltd");
    });

    test('getLegalLandingCompany should return "Deriv Investments (Europe) Limited" for landing_company "maltainvest"', () => {
        expect(getLegalLandingCompany("maltainvest")).toBe("Deriv Investments (Europe) Limited");
    });

    test('getLegalLandingCompany should return "Deriv (SVG) LLC" for landing_company "svg"', () => {
        expect(getLegalLandingCompany("svg")).toBe("Deriv (SVG) LLC");
    });

    test('getLegalLandingCompany should return "Deriv (V) Ltd" for landing_company "v"', () => {
        expect(getLegalLandingCompany("v")).toBe("Deriv (V) Ltd");
    });

    test("getLegalLandingCompany should return undefined for invalid landing_company", () => {
        expect(getLegalLandingCompany("invalid")).toBeUndefined();
    });
});

describe("BrandUtils.getBrandWebsiteName", () => {
    // Test cases
    test("getBrandWebsiteName should return the configured domain name", () => {
        expect(getBrandWebsiteName()).not.toBe("mydomain.com");
    });
    test("getBrandWebsiteName should return the configured domain name", () => {
        expect(getBrandWebsiteName()).toBe("Deriv.com");
    });
});
// mock
const _platforms = {
    trader: "Deriv Trader",
    dBot: "Deriv Bot",
};

describe("BrandUtils.getPlatformName", () => {
    test("should return platform settings if domain is allowed", () => {
        window.location.host = "localhost:8443";
        // Mocking the platform key
        const platformKey = "trader";

        // Call the function
        const platformSettings = getPlatformName(platformKey as keyof typeof _platforms);

        // Assertion
        expect(platformSettings).toEqual("Deriv Trader");
    });
    // Add more test cases as needed
});
