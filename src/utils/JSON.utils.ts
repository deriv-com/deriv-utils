/**
 * Checks if a string is valid JSON.
 *
 * This function attempts to parse the provided string as JSON. If parsing is successful, it returns `true`,
 * otherwise, it returns `false`. This can be useful for validating JSON strings before further processing.
 *
 * @param {string} value - The string to check for valid JSON.
 * @returns {boolean} - `true` if the string is valid JSON, otherwise `false`.
 */
export const isValidJson = (value: string) => {
    try {
        JSON.parse(value);
        return true;
    } catch {
        return false;
    }
};
