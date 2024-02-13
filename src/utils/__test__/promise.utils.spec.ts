import { describe, expect, test } from "vitest";
import { PromiseUtils } from "..";
import { createPromise } from "../promise.utils";

describe("PromiseUtils.createPromise", () => {
    test("should resolve with the correct value", async () => {
        const { promise, resolve } = PromiseUtils.createPromise<number>();
        const expectedValue = 1420;

        resolve(1420);

        const value = await promise;
        expect(value).toBe(expectedValue);
    });

    test("should reject with correct rejection reason", async () => {
        const { promise, reject } = PromiseUtils.createPromise<string>();
        const rejectReason = "number is too high";

        reject(rejectReason);

        await expect(promise).rejects.toBe(rejectReason);
    });

    test("should resolve asynchronously", async () => {
        const { promise, resolve } = createPromise<string>();
        const asyncFunction = async (resolve) => {
            await new Promise((p) => setTimeout(p, 0));
            resolve("operation resolved");
        };

        asyncFunction(resolve);

        await expect(promise).resolves.toBe("operation resolved");
    });

    test("should ignore multiple resolves and only consider the first one", async () => {
        const { promise, resolve } = createPromise<number>();
        resolve(1);
        resolve(2);

        await expect(promise).resolves.toBe(1);
    });

    test("should ignore multiple rejects and only consider the first one", async () => {
        const { promise, reject } = createPromise<number>();
        reject("reason 1");
        reject("reason 2");

        await expect(promise).rejects.toBe("reason 1");
    });

    test("should resolve together with another promise", async () => {
        const { promise, resolve } = createPromise<number>();
        const innerPromise = new Promise<number>((r) => setTimeout(() => r(100), 100));

        // @ts-expect-error edge case testing
        resolve(innerPromise);

        await expect(promise).resolves.toBe(100);
    });

    test("should reject without a passed reason", async () => {
        const { promise, reject } = createPromise<number>();
        reject();

        await expect(promise).rejects.toBeUndefined();
    });
});
