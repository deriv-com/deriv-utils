export const patterns = {
    /**
     * @regex /^[\p{L}\p{Nd}\s'’.,:;()\\x{b0}@#/-]{0,70}$/u
     * @description
     * This pattern matches any string with no more than 70 characters, can contain letters, numbers, spaces, and any of the following special characters: '’.,:;()@#/-.
     * @example Validations.patterns.address.test("123 Main St.")
     * @example Validations.patterns.address.test("Apt. 123")
     * @example Validations.patterns.address.test("123 Main St. Apt. 123")
     **/
    address: /^[\p{L}\p{Nd}\s'’.,:;()\\x{b0}@#/-]{0,70}$/u,
    /**
     * @regex /^\p{L}[\p{L}\s'.-]{0,49}$/u
     * @description This pattern matches any string with no more than 50 characters.
     * @example Validations.patterns.addressCity.test("Main St.")
     * @example Validations.patterns.addressCity.test("Apt.")
     * @example Validations.patterns.addressCity.test("Main St. Apt.")
     **/
    addressCity: /^\p{L}[\p{L}\s'.-]{0,49}$/u,
    /**
     * @regex /^(?=.{1,20}$)[+-]?[0-9]+\.?[0-9]*$/
     * @description This pattern matches any string with 0-9 characters (numeric values. i.e. both integers and floats), and may contain a '+' or '-' sign.
     * @example Validations.patterns.barrier.test("123")
     * @example Validations.patterns.barrier.test("123.45")
     * @example Validations.patterns.barrier.test("-123")
     * @example Validations.patterns.barrier.test("-123.45")
     * @example Validations.patterns.barrier.test("+123")
     * @example Validations.patterns.barrier.test("+123.45")
     */
    barrier: /^(?=.{1,20}$)[+-]?[0-9]+\.?[0-9]*$/,
    /**
     * @regex /^\d*(\.\d+)?$/
     * @description This pattern matches any string that contains only numeric values, and may contain a decimal point.
     * @example Validations.patterns.decimal.test("123")
     * @example Validations.patterns.decimal.test("123.45")
     */
    decimal: /^\d*(\.\d+)?$/,
    /**
     * @regex /^\d+$/
     * @description This pattern matches any string that contains only numeric values.
     * @example Validations.patterns.integer.test("123")
     * @example Validations.patterns.integer.test("12345")
     */
    integer: /^\d+$/,
    /**
     * @regex /p[.\s]+o[.\s]+box/i
     * @description This pattern matches any string that contains the characters 'p.o.box' or 'p o box'.
     * @example Validations.patterns.postalOfficeBoxNumber.test("P.O. Box 1234")
     * @example Validations.patterns.postalOfficeBoxNumber.test("p.o. box 1234")
     * @example Validations.patterns.postalOfficeBoxNumber.test("P O Box 1234")
     * @example Validations.patterns.postalOfficeBoxNumber.test("p o box 1234")
     */
    postalOfficeBoxNumber: /p[.\s]+o[.\s]+box/i,
    /**
     * @regex /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/
     * @description This pattern matches any string with 2-63 characters, and contains aplhanumeric characters, an '@' sign, and may also contain any of these characters '+,-._'.
     * @example Validations.patterns.email.test("doe@meme.me")
     * **/
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
    /**
     * @regex /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[!-~]{8,25}$/
     * @description This pattern matches any string that contains 8-25 characters that include; at least one lowercase letter, at least one digit, at least one uppercase letter, and only printable ASCII characters (from '!' to '~')
     * @example Validations.patterns.password.test("Password1!")
     **/
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[!-~]{8,25}$/,
    /**
     * @regex /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{6,50}$/
     * @description This pattern matches any string that contains 6-50 characters that include; at least one lowercase letter, at least one digit, at least one uppercase letter, and only printable ASCII characters (from '!' to '~')
     * @example Validations.patterns.affilliatePassword.test("Password1")
     **/
    affilliatePassword: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{6,50}$/,
    /**
     * @regex /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,255}$/
     * @description This pattern matches any string with 1-255 characters, and contains aplhanumeric characters, an '@' sign, and may also contain any of these characters '+,-._'.
     * @example Validations.patterns.paymentAgentEmail.test("doe@meme.us")
     **/
    paymentAgentEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,255}$/,
    /**
     * @regex /^([A-Za-z0-9][A-Za-z0-9\\s-]{0,20})?$/
     * @description This pattern matches any string with no more than 20 characters and may not contain '+'.
     * @example Validations.patterns.postalCode.test("123")
     * @example Validations.patterns.postalCode.test("123-456")
     **/
    postalCode: /^([A-Za-z0-9][A-Za-z0-9\\s-]{0,20})?$/,
    /**
     * @regex /^(?!^$|\s+)[A-Za-z0-9.\/\s-]{0,25}$/
     * @description This pattern matches any string with 0-25 characters, and may contain alphanumeric characters (both uppercase and lowercase), and any of these characters'./-', and or sapce characters
     * @example Validations.patterns.taxIdentificationNumber.test("123")
     **/
    taxIdentificationNumber: /^(?!^$|\s+)[A-Za-z0-9.\/\s-]{0,25}$/,
    /**
     * @regex /^\+((-|\s)*[0-9]){8,35}$/
     * @description This pattern matches any string that starts with a '+' character, followed by 8-35 digits, allowing hyphens or spaces.
     * @example Validations.patterns.phoneNumber.test("+1234567890")
     **/
    phoneNumber: /^\+((-|\s)*[0-9]){8,35}$/,
    /**
     * @regex /(image|application)\/(jpe?g|pdf|png)$/
     * @description This pattern matches any of the file types jpeg, jpg, pdf, or png.
     * @example Validations.patterns.fileType.test("image/jpeg")
     * @example Validations.patterns.fileType.test("application/pdf")
     * @example Validations.patterns.fileType.test("image/png")
     * @example Validations.patterns.fileType.test("image/jpg")
     **/
    fileType: /(image|application)\/(jpe?g|pdf|png)$/,
    /**
     * @regex /(^\d{4})\s(\d{2}X{2})\s(X{4})\s(\d{4}$)/
     * @description This pattern matches any string that's formatted in the following format: 1234 56XX XXXX 1121.
     * @example Validations.patterns.formattedCardNumber.test("1234 56XX XXXX 1121")
     **/
    formattedCardNumber: /(^\d{4})\s(\d{2}X{2})\s(X{4})\s(\d{4}$)/,
    /**
     * @regex /[^\dX\s]/
     * @description The is pattern matches any string that contains characters that aren't digits, the uppercase letter 'X' and spaces.
     * @example Validations.patterns.invalidFormattedCardNumberCharacters.test("9876-5432-1098")
     * @example Validations.patterns.invalidFormattedCardNumberCharacters.test("9876 5432 1098")
     **/
    invalidFormattedCardNumberCharacters: /[^\dX\s]/,
    /**
     * @regex /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()+\-=\[\]{};':\"|,\.<>\?_~])[ -~]{8,16}$/
     * @description This pattern matches any string that contains 8-16 characters that include; at least one lowercase letter, at least one digit, at least one uppercase letter, and only printable ASCII characters (from '!' to '~')
     * @example Validations.patterns.tradingPlatformInvestorPassword.test("Password1!$")
     **/
    tradingPlatformInvestorPassword:
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()+\-=\[\]{};':\"|,\.<>\?_~])[ -~]{8,16}$/,
    /**
     * @regex /^[A-Za-z]+([a-zA-Z.' -])*[a-zA-Z.' -]+$/
     * @description This pattern matches any string that starts with one or more letters (uppercase or lowercase), followed by zero or more occurrences of letters, and any of these characters (.' -) and ends with one or more occurrences of letters, and any of these characters (.' -).
     * @example Validations.patterns.letterSymbols.test("John Doe")
     * @example Validations.patterns.letterSymbols.test("John-Doe")
     * @example Validations.patterns.letterSymbols.test("John O'Doe")
     */
    letterSymbols: /^[A-Za-z]+([a-zA-Z.' -])*[a-zA-Z.' -]+$/,
    /**
     * @regex /^(?!.*\s{2,})[\p{L}\s'.-]{2,50}$/u
     * @description This pattern matches any string that contains 2-50 characters, starts and ends with valid characters (letters, whitespace, period, single quote, or hyphen).
     * @example Validations.patterns.name.test("John Doe")
     * @example Validations.patterns.name.test("John-Doe")
     * @example Validations.patterns.name.test("John O'Doe")
     * @example Validations.patterns.name.test("John O. Doe")
     */
    name: /^(?!.*\s{2,})[\p{L}\s'.-]{2,50}$/u,
    /**
     * @regex /[`~!@#$%^&*)(_=+[}{\]\\/";:?><|]+/
     * @description This pattern matches any string that contains any of these characters: `~!@#$%^&*)(_=+[}{\]\\/";:?><|
     * @example Validations.patterns.general.test("Password1!")
     */
    general: /[`~!@#$%^&*)(_=+[}{\]\\/";:?><|]+/,
} as const;
