---
sidebar_position: 2
---

# websocket

### getActiveLoginid

Retrieves the active login ID from either localStorage or the URL query parameters.

This function first attempts to get the active login ID from localStorage using a predefined key from `LocalStorageConstants`.
If not found in localStorage, it then tries to retrieve the login ID from the URL query parameters, specifically looking for `acct1`.

It returns `{string | null}` The active login ID if available, otherwise `null`.

### getAppId

Retrieves the application ID (app_id) from localStorage or based on the current domain.

This function first tries to obtain the app_id from localStorage using a key specified in `LocalStorageConstants`.
If not found, it checks a mapping defined in `AppIDConstants` to find an app_id associated with the current domain.
If no domain-specific app_id is found, it defaults to "36300" which is the localhost app id.

It returns `{string}` The application ID.

### getEnvironmentFromLoginid

Determines the environment type based on the login ID.

This function checks if the provided login ID starts with 'VR' which is the loginid prefix for virtual accounts. All others that do not match this is considered to be real accounts.

It returns `{"real" | "demo"}` The environment type as either 'real' or 'demo'.

#### Options

`loginid[required]: {string | null}` - The login ID to evaluate.
