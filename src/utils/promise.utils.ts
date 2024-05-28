/**
 * Creates a deferred promise along with its resolve and reject functions.
 * This allows for the promise to be resolved or rejected at a later time
 * outside of the promise constructor callback.
 *
 * @template T The type of the value with which the promise will be resolved.
 * @template U The type of the reason with which the promise will be rejected.
 * @returns An object containing:
 * - `promise`: A Promise<T> that can be awaited or otherwise used.
 * - `resolve`: A function that, when called with a value of type T, resolves the promise.
 * - `reject`: A function that, when called with a reason of type U (defaults to unknown), rejects the promise.
 */
export const createPromise = <T, U = unknown>() => {
    let deferredResolve!: (value: T) => void;
    let deferredReject!: (reason: U) => void;

    const promise = new Promise<T>((resolve, reject) => {
        deferredResolve = resolve;
        deferredReject = reject;
    });

    return {
        promise,
        resolve: deferredResolve,
        reject: deferredReject,
    };
};
