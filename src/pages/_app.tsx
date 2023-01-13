import { loadMessagesJson, Locale, LocaleMessages, LocaleProvider } from "@mzawadie/components/Locale";
import { NextQueryParamProvider } from "@mzawadie/components/NextQueryParamProvider";
import { apiUrl, channelSlug, serviceWorkerTimeout, ssrMode } from "@mzawadie/core";
import { MzawadieProvider } from "@mzawadie/sdk/lib/src";
import { ApolloConfigInput, ConfigInput } from "@mzawadie/sdk/lib/src/types";
import { NotificationTemplate } from "@mzawadie/ui-kit/atoms";
import { ServiceWorkerProvider } from "@mzawadie/ui-kit/containers/ServiceWorkerProvider";
import { defaultTheme, GlobalStyle } from "@mzawadie/ui-kit/styles";
import { getMzawadieApi, getShopConfig, ShopConfig } from "@mzawadie/ui-kit/utils/ssr";
import type { AppContext as NextAppContext, AppProps as NextAppProps } from "next/app";
import NextApp from "next/app";
import Head from "next/head";
import React from "react";
import { positions, Provider as AlertProvider } from "react-alert";
import { ThemeProvider } from "styled-components";

import { version } from "../../package.json";
import { StorefrontApp } from "../apps/App";
import "../globalStyles/scss/index.scss";

const attachClient = async () => {
    const { apolloClient } = await getMzawadieApi();

    window.__APOLLO_CLIENT__ = apolloClient;
};

if (!ssrMode) {
    window.version = version;

    if (process.env.NEXT_PUBLIC_ENABLE_APOLLO_DEVTOOLS === "true") attachClient().then((r) => console.log(r));
}

// if (process.env.GTM_ID) {
//     TagManager.initialize({ gtmId: process.env.GTM_ID });
// }

// if (sentryDsn) {
//     Sentry.init({
//         dsn: sentryDsn,
//         // @ts-ignore
//         integrations: [new ApmIntegrations.Tracing()],
//         tracesSampleRate: sentrySampleRate,
//     });
// }

const mzawadieConfig: ConfigInput = { apiUrl, channel: channelSlug };

const apolloConfig: ApolloConfigInput = {
    options: {
        ssrMode: typeof window !== undefined,
        connectToDevTools: true,
    },
};

const notificationConfig = { position: positions.BOTTOM_RIGHT, timeout: 2500 };

type AppProps = NextAppProps & ShopConfig & { messages: LocaleMessages };

const App = ({ Component, pageProps, footer, mainMenu, shopConfig, messages }: AppProps) => {
    // console.log(JSON.stringify(shopConfig, null, 4));
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
                />
                <title>PWA Storefront – Mzawadie Commerce</title>
                <link rel="preconnect" href={apiUrl} />
                <link href="https://rsms.me/inter/inter.css" rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Inconsolata:wght@400;500;600;800&display=swap"
                    rel="stylesheet"
                />
                <link rel="icon" type="image/png" href="/icons/icon-36x36.png" />
                <link rel="manifest" href="/manifest.json" />
            </Head>

            <ThemeProvider theme={defaultTheme}>
                <AlertProvider template={NotificationTemplate as any} {...notificationConfig}>
                    <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
                        <LocaleProvider messages={messages}>
                            <GlobalStyle />
                            <NextQueryParamProvider>
                                <MzawadieProvider apolloConfig={apolloConfig} config={mzawadieConfig}>
                                    <StorefrontApp footer={footer} mainMenu={mainMenu} shopConfig={shopConfig}>
                                        <Component {...pageProps} />
                                    </StorefrontApp>
                                </MzawadieProvider>
                            </NextQueryParamProvider>
                        </LocaleProvider>
                    </ServiceWorkerProvider>
                </AlertProvider>
            </ThemeProvider>
        </>
    );
};

// Fetch shop config only once and cache it.
let shopConfig: ShopConfig | null = null;

App.getInitialProps = async (appContext: NextAppContext) => {
    const {
        router: { locale },
    } = appContext;

    const appProps = await NextApp.getInitialProps(appContext);

    let messages: LocaleMessages;

    if (ssrMode) {
        if (!shopConfig) {
            shopConfig = await getShopConfig();
        }

        // @ts-ignore
        messages = await loadMessagesJson(locale as Locale);
    }

    // @ts-ignore
    return { ...appProps, ...shopConfig, messages };
};

export default App;
