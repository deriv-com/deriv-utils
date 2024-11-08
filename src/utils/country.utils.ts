import Cookies from "js-cookie";
import { cloudflareTrace } from "../constants/url.constants";

type TraceData = {
    loc?: string;
};

/**
 * Fetches the country information based on Cloudflare's trace data or a fallback from cookies.
 * This function attempts to retrieve the country location by first fetching trace data from Cloudflare
 * and then falling back to the location stored in the cookies if the fetch fails.
 *
 * @returns {Promise<string>} A Promise that resolves to a string representing the country code in lowercase.
 *                            Returns an empty string if no country data is available or if an error occurs.
 *
 * @example
 * // Returns the country code in lowercase based on Cloudflare's trace data or cookies.
 * getCountry().then(country => console.log(country));
 */

export const getCountry = async (): Promise<string> => {
    try {
        const response = await fetch(cloudflareTrace).catch(() => null);
        if (!response) return "";
        const text = await response.text().catch(() => "");
        const entries = text ? text.split("\n").map((v) => v.split("=", 2)) : [];
        const data: TraceData = entries.length ? Object.fromEntries(entries) : {};
        return data.loc?.toLowerCase() || JSON.parse(Cookies.get("website_status") || "{}")?.loc || "";
    } catch (error) {
        return "";
    }
};
