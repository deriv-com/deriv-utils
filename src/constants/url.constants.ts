export const deriv = "deriv.com";
export const derivMe = "deriv.me";
export const derivBe = "deriv.be";

export const supportedDomains = [deriv, derivBe, derivMe] as const;
export const baseDomain = (typeof window !== "undefined" &&
    window.location.hostname.split("app.")[1]) as (typeof supportedDomains)[number];
export const domain = supportedDomains.includes(baseDomain) ? baseDomain : deriv;

// deriv URLs
export const binaryBotProduction = `https://bot.${domain}` as const;
export const binaryBotStaging = `https://staging-bot.${domain}` as const;
export const derivAppProduction = `https://app.${domain}` as const;
export const derivAppStaging = `https://staging-app.${domain}` as const;
export const derivComProduction = `https://${domain}` as const;
export const derivComProductionEU = `https://eu.${domain}` as const;
export const derivComStaging = `https://staging.${domain}` as const;
export const derivHost = domain;
export const smartTraderProduction = `https://smarttrader.${domain}` as const;
export const smartTraderStaging = `https://staging-smarttrader.${domain}` as const;
export const derivP2pProduction = `https://p2p.${domain}` as const;
export const derivP2pStaging = `https://staging-p2p.${domain}` as const;
//

export const whatsApp = "https://wa.me/35699578341";

export const queryParameters = {
    lang: "lang",
    action: "action",
} as const;

export const cloudflareTrace = "https://deriv.com/cdn-cgi/trace";

export type QueryParameters = keyof typeof queryParameters;
