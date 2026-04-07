import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
    {
        ignores: ["dist/**", "coverage/**", "eslint.config.js", "**/*.cjs", "**/*.mjs"],
    },
    js.configs.recommended,
    tsPlugin.configs["flat/eslint-recommended"],
    ...tsPlugin.configs["flat/recommended"],
    {
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2021,
            },
        },
        rules: {
            "no-useless-escape": "off",
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },
    prettierConfig,
];
