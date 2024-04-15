---
sidebar_position: 2
---

# format

### formatMoney

Formats a given **number** into a monetary format that is human-readable, with options to customize the **currency**, **number of decimal places**, and **locale**.

It returns a **string** representing the formatted monetary value. If an error occurs during formatting, the function will catch the exception and return the original number as a string.

**Priority of options:** decimalPlaces => currency => default value(2)

#### Options

`number: number[required]` - The numeric value to be formatted as a monetary amount.

`FormatMoneyOptions[optional]` - Optional configuration for formatting the money value, including:

-   **currency [Currency-optional]**: A Currency specifying the currency code to format the number with **Defaults to "USD"**.
-   **decimalPlaces [number-optional]**: The number of decimal places to display in the formatted string. If not specified, **Defaults to 2 decimal places**.
-   **locale [string-optional]**: The locale string to use for formatting the number, affecting the currency symbol position, thousand separator, and decimal point **Defaults to "en-US"**.

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
