import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
    title: "Deriv Utility Library",
    tagline: "(@deriv-com/utils)",
    favicon: "img/logo.svg",

    // Set the production url of your site here
    url: "https://deriv-utility-library.com",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "Deriv", // Usually your GitHub org/user name.
    projectName: "@deriv-com/utils", // Usually your repo name.

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"],
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                },
                theme: {
                    customCss: "./src/css/custom.css",
                },
            } satisfies Preset.Options,
        ],
    ],

    customFields: {
        externalLinks: [
            {
                href: "https://coveralls.io/github/deriv-com/deriv-utils",
                imgSrc: "https://coveralls.io/repos/github/deriv-com/deriv-utils/badge.svg",
                alt: "Coverage Status",
            },
            {
                href: "https://www.npmjs.com/package/@deriv-com/utils",
                imgSrc: "https://img.shields.io/npm/v/@deriv-com/utils.svg?style=flat-square",
                alt: "npm",
            },
        ],
    },

    themeConfig: {
        navbar: {
            title: "Deriv Utility Library",
            logo: {
                alt: "Deriv logo",
                src: "img/logo.svg",
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "tutorialSidebar",
                    position: "left",
                    label: "Docs",
                },
                {
                    href: "https://deriv-group.slack.com/archives/C06KJCRTDJ8",
                    label: "Slack Channel",
                    position: "right",
                },
                {
                    href: "https://github.com/deriv-com/deriv-utils",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
};

export default config;
