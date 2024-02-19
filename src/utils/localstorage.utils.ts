import { LocalStorageConstants } from "../constants";

type TLocalStorageKeys = (typeof LocalStorageConstants)[keyof typeof LocalStorageConstants];

/**
 * Retrieves a value from localStorage, providing type safety and parsing.
 *
 * This function attempts to retrieve the value associated with the given key from the browser's localStorage.
 * It ensures the key is one of the predefined keys in `LocalStorageConstants` for type safety.
 * The function automatically parses the stored JSON string back into its original data type `T`.
 * If the stored value is the string "undefined", it converts this back into the JavaScript `undefined` type.
 * Similarly, if the value is "null" or actually `null`, it returns `null`. If JSON parsing fails, it returns `null` to indicate an error or incompatible stored value.
 *
 * @template T The expected data type of the localStorage value.
 * @param {TLocalStorageKeys} key - A type-safe key from `LocalStorageConstants`.
 * @returns {(T | undefined | null)} - The value associated with the key, parsed as type `T`, or `undefined`/`null` to handle special cases or parsing errors.
 */
export const getValue = <T>(key: TLocalStorageKeys) => {
    const value = localStorage.getItem(key);

    if (value === "undefined") return undefined;
    if (value === null || value === "null") return null;

    try {
        return JSON.parse(value) as T;
    } catch (e) {
        return null;
    }
};

/**
 * Stores a value in localStorage under a specified key.
 *
 * Accepts a key from the predefined set in `LocalStorageConstants` to ensure type safety. The value to be stored
 * is passed as a generic parameter `T`, which allows for any data type. This value is then stringified into JSON
 * and stored.
 *
 * @template T The data type of the value to be stored.
 * @param {TLocalStorageKeys} key - A type-safe key from `LocalStorageConstants`.
 * @param {T} data - The data to store, which can be of any type. This will be stringified to JSON.
 */
export const setValue = <T>(key: TLocalStorageKeys, data: T) => {
    localStorage.setItem(key, JSON.stringify(data));
};
