import { CurrencyConstants } from "../constants";
import { Currency } from "../constants/currency.constants";

type FormatMoneyOptions = {
    currency?: Currency;
    decimalPlaces?: number;
    locale?: string;
};

type GetFormattedDateStringOptions = {
    dateOptions?: Intl.DateTimeFormatOptions;
    format?: "DD MMM YYYY" | "DD-MM-YYYY" | "MMM DD YYYY" | "YYYY-MM-DD";
    unix?: boolean;
};

/**
 * Formats a given number into a monetary format that is human-readable, with options to customize
 * the currency, number of decimal places, and locale.
 * Priority of options: decimalPlaces -> currency -> default value(2)
 *
 * @param {number} number - The numeric value to be formatted as a monetary amount.
 * @param {FormatMoneyOptions} [options] - Optional configuration for formatting the money value, including:
 *   - `currency`: A `Currency` specifying the currency code to format the number with. Defaults to "USD".
 *   - `decimalPlaces`: The number of decimal places to display in the formatted string. If not specified,
 *                      defaults to 2 decimal places.
 *   - `locale`: The locale string to use for formatting the number, affecting the currency symbol position,
 *               thousand separator, and decimal point. Defaults to "en-US".
 *
 * @returns {string} A string representing the formatted monetary value. If an error occurs during formatting,
 *                   the function will catch the exception and return the original number as a string.
 *
 * @example
 * // Formats a number as USD with default locale and decimal places
 * formatMoney(1234.56);
 * // => "1,234.56"
 *
 * @example
 * // Formats a number as EUR with custom locale and decimal places
 * formatMoney(1234.56, { currency: 'EUR', locale: 'de-DE', decimalPlaces: 1 });
 * // => "1.234,6"
 */
export const formatMoney = (number: number, options?: FormatMoneyOptions) => {
    try {
        const { locale = "en-US", currency, decimalPlaces } = options || {};
        const currencyPrecision = CurrencyConstants.precision[currency ?? "USD"];
        const fractionDigits = decimalPlaces || currencyPrecision;
        const formatter = new Intl.NumberFormat(locale, {
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
        });
        return formatter.format(number);
    } catch (_e) {
        return number.toString();
    }
};

/**
 * Converts and formats a given date input into a specified string format without usage of external libraries such as moment.js or date-fns.
 *
 * @param {Date | number | string} dateInput - The date to be formatted.
 *   - Can be a Date object, Unix timestamp, or date string.
 * @param {GetFormattedDateStringOptions} [options] - Optional configuration for date formatting, including:
 *   - `dateOptions`: Intl.DateTimeFormatOptions to customize date formatting.
 *   - `format`: The desired output format. Supported formats: 'YYYY-MM-DD', 'DD-MM-YYYY', 'DD MMM YYYY', 'MMM DD YYYY'.
 *   - `unix`: If true, treats numeric input as a Unix timestamp.
 *
 * @returns {string} A formatted date string according to the specified format.
 *
 * @example
 * // Returns date in 'YYYY-MM-DD' format
 * getFormattedDateString(new Date('2023-05-15'));
 * // => "2023-05-15"
 *
 * @example
 * // Returns date in 'DD MMM YYYY' format
 * getFormattedDateString('2023-05-15', { format: 'DD MMM YYYY' });
 * // => "15 May 2023"
 *
 * @example
 * // Returns date in 'MMM DD YYYY' format with Unix timestamp
 * getFormattedDateString(1684159800, { format: 'MMM DD YYYY', unix: true });
 * // => "May 15 2023"
 */
export const getFormattedDateString = (
    dateInput: Date | number | string,
    options?: GetFormattedDateStringOptions,
): string => {
    let dateObj: Date;
    const {
        dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" },
        format = "YYYY-MM-DD",
        unix = false,
    } = options || {};
    const formattedDateOptions: Intl.DateTimeFormatOptions = { ...dateOptions };

    if (typeof dateInput === "number" && unix) {
        dateObj = new Date(dateInput * 1000);
    } else if (typeof dateInput === "string" || dateInput instanceof Date) {
        dateObj = new Date(dateInput);
        if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid date input");
        }
    } else {
        throw new Error("Invalid date input");
    }

    // Custom handling for different input formats
    switch (format) {
        case "DD MMM YYYY":
            formattedDateOptions.day = "2-digit";
            formattedDateOptions.month = "short";
            formattedDateOptions.year = "numeric";
            break;
        case "MMM DD YYYY":
            formattedDateOptions.day = "2-digit";
            formattedDateOptions.month = "short";
            formattedDateOptions.year = "numeric";
            return dateObj
                .toLocaleDateString("en-GB", formattedDateOptions)
                .replace(/(\d{2}) (\w{3}) (\d{4})/, "$2 $1 $3");
        case "DD-MM-YYYY":
            formattedDateOptions.day = "2-digit";
            formattedDateOptions.month = "2-digit";
            formattedDateOptions.year = "numeric";
            return dateObj
                .toLocaleDateString("en-GB", formattedDateOptions)
                .replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$1-$2-$3");
        default:
            formattedDateOptions.year = "numeric";
            formattedDateOptions.month = "2-digit";
            formattedDateOptions.day = "2-digit";
            break;
    }

    const formattedDate = dateObj
        .toLocaleDateString("en-GB", formattedDateOptions)
        .replace(/(\d{2}) (\w{3,4}) (\d{4})/, (_, day, month, year) => `${day} ${month.slice(0, 3)} ${year}`);

    return format === "YYYY-MM-DD" ? formattedDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1") : formattedDate;
};

/**
 * Converts and formats a given date input into a time string in 'HH:mm:ss GMT' format without usage of external libraries such as moment.js or date-fns.
 *
 * @param {Date | number | string} dateInput - The date to be formatted.
 *   - Can be a Date object, Unix timestamp, or date string.
 * @param {boolean} [unix=false] - If true, treats the numeric input as a Unix timestamp.
 *
 * @returns {string} A formatted time string in 'HH:mm:ss GMT' format.
 *
 * @example
 * getFormattedTimeString(new Date('2023-05-15T14:30:00Z'));
 * // => "14:30:00 GMT"
 *
 * @example
 * getFormattedTimeString(1684159800, true);
 * // => "14:30:00 GMT"
 */
export const getFormattedTimeString = (dateInput: Date | number | string, unix = false): string => {
    let dateObj: Date;

    if (typeof dateInput === "number" && unix) {
        dateObj = new Date(dateInput * 1000);
    } else if (typeof dateInput === "string" || dateInput instanceof Date) {
        dateObj = new Date(dateInput);
        if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid date input");
        }
    } else {
        throw new Error("Invalid date input");
    }

    // Utilize UTC methods to return time in GMT regardless of local timezone
    return `${dateObj.getUTCHours().toString().padStart(2, "0")}:${dateObj
        .getUTCMinutes()
        .toString()
        .padStart(2, "0")}:${dateObj.getUTCSeconds().toString().padStart(2, "0")} GMT`;
};

/**
 * Calculates a new date by adjusting the current date by a specified amount of days or years.
 * To be used for setting min and max date for date pickers, expiry dates, etc.
 *
 * @param {number} amount - The number of days or years to adjust the date by.
 * @param {"days" | "years"} type - Specifies whether to adjust the date by days or years.
 * @param {"add" | "subtract"} operation - Specifies whether to add or subtract the amount from the current date.
 *
 * @returns {Date} A new Date object representing the adjusted date.
 *
 * @example
 * // Returns a Date object 5 days in the future
 * getAdjustedDate(5, "days", "add");
 *
 * @example
 * // Returns a Date object 2 years in the past
 * getAdjustedDate(2, "years", "subtract");
 *
 * @example
 * // Returns a Date object 10 days in the past
 * getAdjustedDate(10, "days", "subtract");
 */
export const getAdjustedDate = (
    amount: number,
    type: "days" | "years" = "days",
    operation: "add" | "subtract" = "add",
): Date => {
    if (amount < 0) throw new Error("Amount must be a positive number.");

    const date = new Date();
    const adjustedAmount = operation === "add" ? amount : -amount;

    if (type === "years") {
        date.setFullYear(date.getFullYear() + adjustedAmount);
    } else if (type === "days") {
        date.setDate(date.getDate() + adjustedAmount);
    }

    return date;
};

/**
 * Parses a cryptocurrency longcode string to extract address hash and blockchain hash.
 *
 * @param {string} longcode - The cryptocurrency longcode string to parse.
 *
 * @returns {Object} An object containing:
 *   - addressHash: The extracted address hash.
 *   - blockchainHash: The extracted blockchain hash.
 *   - splitLongcode: An array of the longcode split by commas.
 *
 * @example
 * parseCryptoLongcode("address: abc123def456ghi789jkl, transaction: xyz123abc456def789ghi")
 * =>
 * {
 *   addressHash: "abc123def456ghi789jkl",
 *   blockchainHash: "xyz123abc456def789ghi",
 *   splitLongcode: ["address: abc123def456ghi789jkl", "transaction: xyz123abc456def789ghi"]
 * }
 */
export const parseCryptoLongcode = (longcode: string) => {
    const splitLongcode = longcode.split(/,\s/);
    const addressHashMatch = /:\s([0-9a-zA-Z]+.{25,28})/gm.exec(splitLongcode[0]);
    const addressHash = addressHashMatch?.[1];
    const blockchainHashMatch = /:\s([0-9a-zA-Z]+.{25,34})/gm.exec(splitLongcode[1]);
    const blockchainHash = blockchainHashMatch?.[1];

    return { addressHash, blockchainHash, splitLongcode };
};
