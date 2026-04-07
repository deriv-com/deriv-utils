---
sidebar_position: 2
---

# format

### formatMoney

Formats a given **number** into a monetary format that is human-readable, with options to customize the **currency**, **number of decimal places**, and **locale**.

It returns a **string** representing the formatted monetary value. If an error occurs during formatting, the function will catch the exception and return the original number as a string.

**Priority of options:** decimalPlaces => currency => default value(2)

#### Options

`number: number [required]` - The numeric value to be formatted as a monetary amount.

`FormatMoneyOptions [optional]` - Optional configuration for formatting the money value, including:

- **currency [Currency-optional]**: A Currency specifying the currency code to format the number with **Defaults to "USD"**.
- **decimalPlaces [number-optional]**: The number of decimal places to display in the formatted string. If not specified, **Defaults to 2 decimal places**.
- **locale [string-optional]**: The locale string to use for formatting the number, affecting the currency symbol position, thousand separator, and decimal point **Defaults to "en-US"**.

To use the **Currency** type, simply follow this step:

```typescript
import { CurrencyConstants } from "@deriv-com/utils";

type TCurrency = CurrencyConstants.Currency;
```

#### Examples

Formats a number as USD with default locale and decimal places

```JS
formatMoney(1234.56); // "1,234.56"
```

Formats a number as EUR with custom locale and decimal places

```JS
formatMoney(1234.56, { currency: 'EUR', locale: 'de-DE', decimalPlaces: 1 }); // "1.234,6"
```

---

### getFormattedDateString

Converts and formats a given date input into a specified string format. To be used in formatting date strings without the use of external libraries such as moment.js or date-fns.

#### Options

- `dateInput: Date | number | string [required]` - The date to be formatted. Can be a Date object, Unix timestamp, or a date string.
  `GetFormattedDateStringOptions [optional]` - Optional configuration for formatting the date value, including:

- **dateOptions: [Intl.DateTimeFormatOptions-optional]**: - Optional configuration for date formatting. Defaults to `{ day: "2-digit", month: "2-digit", year: "numeric" }`.
- **format: [string-optional]**: The desired output format. Supported formats: `'YYYY-MM-DD'`, `'DD MMM YYYY'`, `'MMM DD YYYY'`, `'DD-MM-YYYY'`. Defaults to `'YYYY-MM-DD'`.
- **unix: [boolean-optional]**: If `true`, treats the numeric input as a Unix timestamp.

### Returns:

A formatted date string according to the specified format.

### Examples:

```js
// Returns date in 'YYYY-MM-DD' format
getFormattedDateString(new Date("2023-05-15"));
// => "2023-05-15"

// Returns date in 'DD MMM YYYY' format
getFormattedDateString("2023-05-15", { format: "DD MMM YYYY" });
// => "15 May 2023"
```

---

### getFormattedTimeString

Converts and formats a given date input into a time string in the `'HH:mm:ss GMT'` format. To be used in formatting time strings without the use of external libraries such as moment.js or date-fns.

#### Options

- `dateInput: Date | number | string [required]` - The date to be formatted. Can be a Date object, Unix timestamp, or date string.
- `unix: boolean [optional]` - If `true`, treats the numeric input as a Unix timestamp.

### Returns:

A formatted time string in the `'HH:mm:ss GMT'` format.

### Examples:

```js
// Returns time in 'HH:mm:ss GMT' format
getFormattedTimeString(new Date("2023-05-15T14:30:00Z"));
// => "14:30:00 GMT"

// Returns time in 'HH:mm:ss GMT' format from a Unix timestamp
getFormattedTimeString(1684159800, true);
// => "14:30:00 GMT"
```

---

### getAdjustedDate

Calculates a new date by adjusting the current date by a specified amount of days or years. Used in setting minimum and maximum dates for date pickers, expiry dates, etc.

#### Options

- `amount: number [required]` - The number of days or years to adjust the date by.
- `type: "days" | "years" [optional]` - Specifies whether to adjust the date by days or years. Defaults to `"days"`.
- `operation: "add" | "subtract" [optional]` - Specifies whether to add or subtract the amount from the current date. Defaults to `"add"`.

### Returns:

A new Date object representing the adjusted date.

### Examples:

```js
// Returns a Date object 5 days in the future
getAdjustedDate(5, "days", "add");

// Returns a Date object 2 years in the past
getAdjustedDate(2, "years", "subtract");
```

---

### parseCryptoLongcode

Parses a cryptocurrency longcode string to extract the address hash and blockchain hash. Required when parsing longcodes coming from BE and displaying the extracted strings separately in the UI (i.e in transaction details).

#### Options

- `longcode: string [required]` - The cryptocurrency longcode string to parse.

### Returns:

An object containing:

- `addressHash: string` - The extracted address hash.
- `blockchainHash: string` - The extracted blockchain hash.
- `splitLongcode: string[]` - An array of the longcode split by commas.

### Example:

```js
const longcode =
    "address: abc123def456ghi789jkl012mno345pqr678stu9, transaction: xyz123abc456def789ghi012jkl345mno678pqr901";
const parsed = parseCryptoLongcode(longcode);

console.log(parsed.addressHash); // "abc123def456ghi789jkl012mno345pqr678stu9"
console.log(parsed.blockchainHash); // "xyz123abc456def789ghi012jkl345mno678pqr901"
```
