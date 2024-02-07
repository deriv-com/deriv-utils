import { CurrencyConstants } from "../constants";
import { Currency } from "../constants/currency.constants";

type FormatMoneyOptions = {
    currency?: Currency;
    decimalPlaces?: number;
    locale?: string;
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
        const fractionDigits = decimalPlaces ?? currencyPrecision;
        const formatter = new Intl.NumberFormat(locale, {
            minimumFractionDigits: fractionDigits,
            maximumFractionDigits: fractionDigits,
        });
        return formatter.format(number);
    } catch (e) {
        return number.toString();
    }
};
