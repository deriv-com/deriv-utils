/**
 * Creates a deferred promise along with its resolve and reject functions.
 * This allows for the promise to be resolved or rejected at a later time
 * outside of the promise constructor callback.
 *
 * @template T The type of the value with which the promise will be resolved. Defaults to `void` if not specified.
 * @template U The type of the reason with which the promise will be rejected. Defaults to `unknown`.
 * @returns An object containing:
 * - `promise`: A Promise<T> that can be awaited or otherwise used.
 * - `resolve`: A function that resolves the promise. If `T` is `void`, no arguments are required.
 * - `reject`: A function that, when called with a reason of type U, rejects the promise.
 */
export function createPromise(): {
    promise: Promise<void>;
    resolve: () => void;
    reject: (reason: unknown) => void;
};

export function createPromise<T>(): {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason: unknown) => void;
};

export function createPromise<T, U = unknown>(): {
    promise: Promise<T>;
    resolve: (value: T) => void;
    reject: (reason: U) => void;
};

export function createPromise<T = void, U = unknown>() {
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
}
