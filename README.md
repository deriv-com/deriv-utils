# Deriv Utility Library (@deriv/utils)

## Overview

This utility library provides a comprehensive suite of utilities designed to support the development of web applications for Deriv. It encapsulates common functionalities such as handling constants, formatting, sorting, and more, with a focus on enhancing development efficiency and ensuring type safety.
<br />
<br />
This library is divided into two main namespaces:

-   Constants
    -   `AppIDConstants`: Holds constants related to application IDs for different domains, facilitating domain-based app ID management.
    -   `CurrencyConstants`: Enumerates all currencies supported by Deriv, simplifying currency-related operations.
    -   `LocalStorageConstants`: An exhaustive list of all local storage keys used across Deriv web apps, ensuring consistency in local storage access.
-   Utils
    -   `FormatUtils`: Contains utility functions for string formatting, including number formatting, currency symbol resolution, and more.
    -   `LocalStorageUtils`: Provides a typesafe wrapper around the browser's localStorage functionality, enhancing reliability and ease of use.
    -   `ObjectUtils`: Offers functions for manipulating objects, such as deep merging, cloning, and property extraction.
    -   `PromiseUtils`: Includes utilities for handling promises, such as timeout wrappers and promise chaining helpers.
    -   `URLUtils`: Contains functions for manipulating URLs, including parameter extraction, URL construction, and query string manipulation.
    -   `WebSocketUtils`: Encapsulates utilities specific to the Deriv WebSocket, addressing environment detection, login ID retrieval, and app ID management.

## Getting Started

To get started simply install deriv utils from the @deriv-com/utils package

```bash
npm i --save @deriv-com/utils
```

or

```bash
yarn add @deriv-com/utils
```

## Usage Example

Each of the namespaces listed above are exposed directly from the library root. In this example, we are using the `FormatUtils.formatMoney()` functionality to format different currencies to their correct decimal points or localised formatting.

```typescript
import { FormatUtils } from "@deriv-com/utils";

const formattedBalance = FormatUtils.formatMoney(1, { currency: "BTC" });
console.log(formattedBalance); // Should output 1.00000000
```

## Documentation

For detailed documentation on each utility and constant, refer to the specific files in the constants and utils directories. Each utility function and constant is documented with JSDoc comments, providing insights into their purpose, parameters, and return values. (A dedicated document page is in the pipeline)

## Contributing

We welcome contributions to the `@deriv-com/utils` library. If you have suggestions for improvements or find a bug, please open an issue or submit a pull request.

## Notes

-   `@deriv-com/utils` outputs both ESM and CJS files but currently, this library only support code running in the browser environment. However, support for Node runtime is planned in the pipeline.
