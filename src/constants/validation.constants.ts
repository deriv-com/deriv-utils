export const messagesHints = {
    /**
     * Represents the special characters permitted in an address.
     * @remarks This is to be used in the message of the validation error, to let the user know which characters are permitted.
     * @example `Special characters permitted: ${ValidationConstants.messagesHints.addressPermittedSpecialCharacters}`
     */
    addressPermittedSpecialCharacters: ". , ' : ; ( ) ° @ # / -",
} as const;

export const patterns = {
    /**
     * @regex /^[\p{L}\p{Nd}\s'’.,:;()\\x{b0}@#/-]{0,70}$/u
     * @description
     * This pattern matches any string with no more than 70 characters, can contain letters, numbers, spaces, and any of the following special characters: '’.,:;()@#/-.
     * @example ValidationConstants.patterns.address.test("123 Main St.")
     * @example ValidationConstants.patterns.address.test("Apt. 123")
     * @example ValidationConstants.patterns.address.test("123 Main St. Apt. 123")
     **/
    address: /^[\p{L}\p{Nd}\s'’.,:;()\\x{b0}@#/-]{0,70}$/u,
    /**
     * @regex /^\p{L}[\p{L}\s'.-]{0,49}$/u
     * @description This pattern matches any string with no more than 50 characters.
     * @example ValidationConstants.patterns.addressCity.test("Main St.")
     * @example ValidationConstants.patterns.addressCity.test("Apt.")
     * @example ValidationConstants.patterns.addressCity.test("Main St. Apt.")
     **/
    addressCity: /^\p{L}[\p{L}\s'.-]{0,49}$/u,
    /**
     * @regex /^[\p{L}\p{Nd}\s'.,-;]{0,100}$/u
     * @description This pattern matches any string that contains up to 100 characters composed of Unicode letters, Unicode digits, whitespace characters, apostrophes, periods, commas, hyphens, and semicolons ( '.,-;).
     * @example ValidationConstants.patterns.addressState.test("New York")
     * @example ValidationConstants.patterns.addressState.test("Québec")
     **/
    addressState: /^[\p{L}\p{Nd}\s'.,-;]{0,100}$/u,
    /**
     * @regex /^(?=.{1,20}$)[+-]?[0-9]+\.?[0-9]*$/
     * @description This pattern matches any string with 0-9 characters (numeric values. i.e. both integers and floats), and may contain a '+' or '-' sign.
     * @example ValidationConstants.patterns.barrier.test("123")
     * @example ValidationConstants.patterns.barrier.test("123.45")
     * @example ValidationConstants.patterns.barrier.test("-123")
     * @example ValidationConstants.patterns.barrier.test("-123.45")
     * @example ValidationConstants.patterns.barrier.test("+123")
     * @example ValidationConstants.patterns.barrier.test("+123.45")
     */
    barrier: /^(?=.{1,20}$)[+-]?[0-9]+\.?[0-9]*$/,
    /**
     * @regex /^\d*(\.\d+)?$/
     * @description This pattern matches any string that contains only numeric values, and may contain a decimal point.
     * @example ValidationConstants.patterns.decimal.test("123")
     * @example ValidationConstants.patterns.decimal.test("123.45")
     */
    decimal: /^\d*(\.\d+)?$/,
    /**
     * @regex /^\d+$/
     * @description This pattern matches any string that contains only numeric values.
     * @example ValidationConstants.patterns.integer.test("123")
     * @example ValidationConstants.patterns.integer.test("12345")
     */
    integer: /^\d+$/,
    /**
     * @regex /p[.\s]+o[.\s]+box/i
     * @description This pattern matches any string that contains the characters 'p.o.box' or 'p o box'.
     * @example ValidationConstants.patterns.postalOfficeBoxNumber.test("P.O. Box 1234")
     * @example ValidationConstants.patterns.postalOfficeBoxNumber.test("p.o. box 1234")
     * @example ValidationConstants.patterns.postalOfficeBoxNumber.test("P O Box 1234")
     * @example ValidationConstants.patterns.postalOfficeBoxNumber.test("p o box 1234")
     */
    postalOfficeBoxNumber: /p[.\s]+o[.\s]+box/i,
    /**
     * @regex /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/
     * @description This pattern matches any string with 2-63 characters, and contains aplhanumeric characters, an '@' sign, and may also contain any of these characters '+,-._'.
     * @example ValidationConstants.patterns.email.test("doe@meme.me")
     * **/
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/,
    /**
     * @regex /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[!-~]{8,25}$/
     * @description This pattern matches any string that contains 8-25 characters that include; at least one lowercase letter, at least one digit, at least one uppercase letter, and only printable ASCII characters (from '!' to '~')
     * @example ValidationConstants.patterns.password.test("Password1!")
     **/
    password: /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])[!-~]{8,25}$/,
    /**
     * @regex /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{6,50}$/
     * @description This pattern matches any string that contains 6-50 characters that include; at least one lowercase letter, at least one digit, at least one uppercase letter, and only printable ASCII characters (from '!' to '~')
     * @example ValidationConstants.patterns.affilliatePassword.test("Password1")
     **/
    affilliatePassword: /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])[ -~]{6,50}$/,
    /**
     * @regex /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,255}$/
     * @description This pattern matches any string with 1-255 characters, and contains aplhanumeric characters, an '@' sign, and may also contain any of these characters '+,-._'.
     * @example ValidationConstants.patterns.paymentAgentEmail.test("doe@meme.us")
     **/
    paymentAgentEmail: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,255}$/,
    /**
     * @regex /^([A-Za-z0-9][A-Za-z0-9\s-]{0,20})?$/
     * @description This pattern matches any string with no more than 20 characters and may not contain '+'.
     * @example ValidationConstants.patterns.postalCode.test("123")
     * @example ValidationConstants.patterns.postalCode.test("123-456")
     **/
    postalCode: /^([A-Za-z0-9][A-Za-z0-9\s-]{0,20})?$/,
    /**
     * @regex /^(?!^$|\s+)[A-Za-z0-9.\/\s-]{0,25}$/
     * @description This pattern matches any string with 0-25 characters, and may contain alphanumeric characters (both uppercase and lowercase), and any of these characters'./-', and or sapce characters
     * @example ValidationConstants.patterns.taxIdentificationNumber.test("123")
     **/
    taxIdentificationNumber: /^(?!^$|\s+)[A-Za-z0-9.\/\s-]{0,25}$/,
    /**
     * @regex /^\+((-|\s)*[0-9]){8,35}$/
     * @description This pattern matches any string that starts with a '+' character, followed by 8-35 digits, allowing hyphens or spaces.
     * @example ValidationConstants.patterns.phoneNumber.test("+1234567890")
     **/
    phoneNumber: /^\+((-|\s)*[0-9]){8,35}$/,
    /**
     * @regex /(image|application)\/(jpe?g|pdf|png)$/
     * @description This pattern matches any of the file types jpeg, jpg, pdf, or png.
     * @example ValidationConstants.patterns.fileType.test("image/jpeg")
     * @example ValidationConstants.patterns.fileType.test("application/pdf")
     * @example ValidationConstants.patterns.fileType.test("image/png")
     * @example ValidationConstants.patterns.fileType.test("image/jpg")
     **/
    fileType: /(image|application)\/(jpe?g|pdf|png)$/,
    /**
     * @regex /(^\d{4})\s(\d{2}X{2})\s(X{4})\s(\d{4}$)/
     * @description This pattern matches any string that's formatted in the following format: 1234 56XX XXXX 1121.
     * @example ValidationConstants.patterns.formattedCardNumber.test("1234 56XX XXXX 1121")
     **/
    formattedCardNumber: /(^\d{4})\s(\d{2}X{2})\s(X{4})\s(\d{4}$)/,
    /**
     * @regex /[^\dX\s]/
     * @description The is pattern matches any string that contains characters that aren't digits, the uppercase letter 'X' and spaces.
     * @example ValidationConstants.patterns.invalidFormattedCardNumberCharacters.test("9876-5432-1098")
     * @example ValidationConstants.patterns.invalidFormattedCardNumberCharacters.test("9876 5432 1098")
     **/
    invalidFormattedCardNumberCharacters: /[^\dX\s]/,
    /**
     * @regex /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()+\-=\[\]{};':\"|,\.<>\?_~])[ -~]{8,16}$/
     * @description This pattern matches any string that contains 8-16 characters that include; at least one lowercase letter, at least one digit, at least one uppercase letter, and only printable ASCII characters (from '!' to '~')
     * @example ValidationConstants.patterns.tradingPlatformInvestorPassword.test("Password1!$")
     **/
    tradingPlatformInvestorPassword:
        /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*()+\-=\[\]{};':\"|,\.<>\?_~])[ -~]{8,16}$/,
    /**
     * @regex /^[A-Za-z]+([a-zA-Z.' -])*[a-zA-Z.' -]+$/
     * @description This pattern matches any string that starts with one or more letters (uppercase or lowercase), followed by zero or more occurrences of letters, and any of these characters (.' -) and ends with one or more occurrences of letters, and any of these characters (.' -).
     * @example ValidationConstants.patterns.letterSymbols.test("John Doe")
     * @example ValidationConstants.patterns.letterSymbols.test("John-Doe")
     * @example ValidationConstants.patterns.letterSymbols.test("John O'Doe")
     */
    letterSymbols: /^[A-Za-z]+([a-zA-Z.' -])*[a-zA-Z.' -]+$/,
    /**
     * @regex /^(?!.*\s{2,})[\p{L}\s'.-]{2,50}$/u
     * @description This pattern matches any string that contains 2-50 characters, starts and ends with valid characters (letters, whitespace, period, single quote, or hyphen).
     * @example ValidationConstants.patterns.name.test("John Doe")
     * @example ValidationConstants.patterns.name.test("John-Doe")
     * @example ValidationConstants.patterns.name.test("John O'Doe")
     * @example ValidationConstants.patterns.name.test("John O. Doe")
     */
    name: /^(?!.*\s{2,})[\p{L}\s'.-]{2,50}$/u,
    /**
     * @regex /[`~!@#$%^&*)(_=+[}{\]\\/";:?><|]+/
     * @description This pattern matches any string that contains any of these characters: `~!@#$%^&*)(_=+[}{\]\\/";:?><|
     * @example ValidationConstants.patterns.general.test("Password1!")
     */
    general: /[`~!@#$%^&*)(_=+[}{\]\\/";:?><|]+/,
    /**
     * @regex /[a-z]/
     * @description This pattern matches any string that contains lowercase letters.
     * @example ValidationConstants.patterns.lowercase.test("abc")
     */
    lowercase: /[a-z]/,
    /**
     * @regex /\d/
     * @description This pattern matches any string that contains digits.
     * @example ValidationConstants.patterns.number.test("pets123")
     */
    number: /\d/,
    /**
     * @regex /\W/
     * @description This pattern matches any string that contains special characters.
     * @example ValidationConstants.patterns.specialCharacter.test("Password1!")
     */
    specialCharacter: /\W/,
    /**
     * @regex /[A-Z]/
     * @description This pattern matches any string that contains uppercase letters.
     * @example ValidationConstants.patterns.uppercase.test("ABC")
     */
    uppercase: /[A-Z]/,
    /**
     * @regex /^.{8,16}$/
     * @description This pattern matches any string that contains 8-16 characters.
     * @example ValidationConstants.patterns.between8and16Characters.test("Password1!")
     */
    between8and16Characters: /^.{8,16}$/,
    /**
     * @regex /^.{8,25}$/
     * @description This pattern matches any string that contains 8-25 characters.
     * @example ValidationConstants.patterns.between8and25Characters.test("Password1!")
     */
    between8and25Characters: /^.{8,25}$/,
} as const;
