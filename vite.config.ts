/// <reference types="vitest" />
import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [dts({ rollupTypes: true })],
    build: {
        lib: {
            entry: path.resolve(__dirname, "src/index.ts"),
            name: "@deriv/utils",
            fileName: "deriv-utils",
        },
    },
    test: {
        coverage: {
            reporter: "lcov",
            provider: "v8",
            exclude: ["**/*.{yml}", "**/*.{config,utils}.*", ".eslintrc.cjs", "node_modules", "dist", "utils-docs"],
        },
        environment: "happy-dom",
    },
});
