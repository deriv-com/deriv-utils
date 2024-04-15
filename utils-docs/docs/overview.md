---
sidebar_position: 1
---

# Overview

This utility library provides a comprehensive suite of utilities designed to support the development of **web applications for Deriv**. It encapsulates common functionalities such as **handling constants**, **formatting**, **sorting**, and more, with a focus on enhancing development efficiency and ensuring type safety.

**This library is divided into two main namespaces:**

-   **Constants:**
    The Constants namespace acts as a central hub for all static values and identifiers used across Deriv's web applications. It consolidates these values in one place, making it easier to maintain and update, ensuring consistent usage across components, and enhancing code readability and manageability.
-   **Utils:**
    The Utils namespace provides a suite of utility functions and tools to simplify and improve web application development at Deriv. These utilities address common development challenges and tasks, enhancing efficiency, reliability, and maintainability throughout the development process.

## Getting Started

To get started simply install deriv utils from the `@deriv-com/utils` package :)

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
