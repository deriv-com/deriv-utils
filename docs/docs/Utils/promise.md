---
sidebar_position: 2
---

# promise

Creates a deferred promise along with its resolve and reject functions. This allows for the promise to be resolved or rejected at a later time outside of the promise constructor callback.

It returns an object containing:

-   **promise:** A `Promise<T>` that can be awaited or otherwise used.
-   **resolve:** A function that, when called with a value of type T, resolves the promise.
-   **reject:** A function that, when called with a reason, rejects the promise.

**Note:** `T` - The type of the value with which the promise will be resolved.
