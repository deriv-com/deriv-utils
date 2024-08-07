---
sidebar_position: 2
---

# object

### sortObjectByKeys

Sorts the object key alphabetically and returns same object with sorted key.

#### Options

`object: T[required]` - Key value pair object

### hashObject

Computes the SHA-256 hash of a JavaScript object. <br />
It returns a Promise that resolves to the SHA-256 hash of the input object as a hexadecimal string. <br />
It throws an error if the hashing operation fails or if the input is not a valid object.

#### Options

`object: T[required]` - The object to be hashed.

### merge

Deeply merges multiple source objects into a target object. It merges individual values excluding null and undefined. It concatenates arrays. recursively merges objects and directly assigns functions

#### Options

-   `target: T` - The target object to merge into.
-   `sources: DeepPartial<T>[]` - One or more source objects to merge into the target.

#### Returns

-   `T` - The merged target object.
