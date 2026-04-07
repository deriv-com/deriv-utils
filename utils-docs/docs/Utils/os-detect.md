---
sidebar_position: 2
---

# os-detect

This utility module provides functions to detect mobile operating systems and extract information from user agent strings.

### `mobileOSDetectAsync`

This function asynchronously detects the mobile operating system based on the user agent string.

#### Returns

- `"Windows Phone"` if the user agent string indicates a Windows Phone device.
- `"huawei"` if the user agent string indicates a Huawei device running Android.
- `"Android"` if the user agent string indicates an Android device.
- `"iOS"` if the user agent string indicates an iOS device (iPad, iPhone, or iPod).
- `"unknown"` if the mobile operating system cannot be determined.

#### Usage

```typescript
import { mobileOSDetectAsync } from "@deriv-com/utils";

const os = await mobileOSDetectAsync();

if (os === "iOS") {
    console.log("client on iOS");
} else if (os === "huawei") {
    console.log("client on huawei");
}
console.log("client on android");
```
