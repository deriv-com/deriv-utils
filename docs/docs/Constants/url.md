---
sidebar_position: 2
---

# url

### Base Domains

```JS
deriv = "deriv.com";
derivMe = "deriv.me";
derivBe = "deriv.be";

supportedDomains = [deriv, derivBe, derivMe];
baseDomain = window.location.hostname.split("app.")[1];
domain = supportedDomains.includes(baseDomain) ? baseDomain : deriv;
```

### Deriv URLs

```JS
binaryBotProduction = `https://bot.${domain}`;
binaryBotStaging = `https://staging-bot.${domain}`;
derivAppProduction = `https://app.${domain}`;
derivAppStaging = `https://staging-app.${domain}`;
derivComProduction = `https://${domain}`;
derivComProductionEU = `https://eu.${domain}`;
derivComStaging = `https://staging.${domain}`;
derivHost = domain;
smartTraderProduction = `https://smarttrader.${domain}`;
smartTraderStaging = `https://staging-smarttrader.${domain}`;
```

### Deriv WhatsApp

```JS
whatsApp = "https://wa.me/35699578341";
```

### QueryParameters

```JS
lang: "lang";
action: "action";

type QueryParameters = keyof typeof queryParameters;
```
