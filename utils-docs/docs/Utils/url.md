---
sidebar_position: 2
---

# url

### type LoginInfo

Defines the structure for account information.

#### Options

`loginid: string` - The loginid for the account.

`currency: string` - The currency code for the account.

`token: string` - The authentication token for the account.

### getLoginInfoFromURL

Extracts the login information from thxe URL's query parameters.

This function parses the window's current URL search parameters looking for account, token, and currency information.
It constructs an array of partially formed `LoginInfo` objects and filters out any entries that do not have all required properties.
It also returns a list of parameter keys that are related to account information and can be deleted.

It returns `{loginInfo: LoginInfo[], paramsToDelete: string[]}` An object containing an array of `LoginInfo` objects and an array of parameter keys to delete.

### getDefaultActiveAccount

Retrieves the default active account from a list of login information.
The default account is determined by finding the first account with a login ID that starts with "VR".
If no such account is found, the first account in the list is returned.

It returns the default active account based on the specified criteria. If the list is empty, `undefined` is returned.

#### Options

`loginInfo[optional]: { loginid: string; currency: string; token: string }[]` - An array of login information.

### filterSearchParams

Filters and removes specified search parameters from the current URL.
This function modifies the current URL's query string by removing the specified search parameters and then updates the history state.

#### Options

`searchParamsToRemove[required]: string[]` - An array of search parameter keys to remove from the current URL.

### getOauthURL

Constructs the OAuth URL with query parameters for **language**, **app_id**, and **brand**.
The language is retrieved from local storage or **defaults to "EN"** if not set. The app_id and brand are obtained from constants.

It returns the constructed OAuth URL (string).

### getServerURL

Determines the server URL based on the active login ID.
It first attempts to retrieve the server URL from local storage. If not found, it uses the active login ID to determine the server URL from predefined environments.

It returns The determined server URL.

### getWebsocketURL

Constructs the WebSocket URL with query parameters for app_id, language, and brand.
The server URL is determined by calling `getServerURL`, and the language is retrieved from local storage or **defaults to "EN"** if not set.

It returns The constructed WebSocket URL.

### getQueryParameter

Extracts query parameters from the URL by parsing the current window's URL search parameters for the specified key.
It returns the query parameters associated with the given key.

#### Options

`key[required]: QueryParameters` - The query parameter we want. (you can see all of them in the **URLConstants.queryParameters**)

### normalizePath

Takes a **URL path** as input and removes certain characters from the beginning and end of the path.

It removes the following:

-   Any leading forward slash (/) at the beginning of the path.
-   Any trailing forward slash (/) at the end of the path.
-   Any characters that are not alphanumeric, hyphen, underscore, dot, forward slash, parentheses, or hash symbol.

It returns the formatted path without the specified characters.

#### Options

`path[required]: string` - The URL path that needs to be normalized.

### getDerivStaticURL

Generates a static URL for the deriv.com project based on the provided parameters.
This function is necessary because deriv.com URLs differ from those used in app.deriv.com

It returns the formatted static URL.

#### Options

`path[required]: string` - The path to be appended to the base URL.

`options[optional]: { isDocument?: boolean; isEU?: boolean; }` - Optional configuration for customising the Deriv Static URL, including:

-   `isDocument`: Specifies whether the path represents a document.
-   `isEU`: Specifies whether the URL should be generated for the EU production environment.
