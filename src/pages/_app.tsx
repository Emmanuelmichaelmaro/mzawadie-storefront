import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import React from "react";

import { Footer, MainMenu, NavigationOverlay, SearchOverlay } from "../components";
import { CartOverlay, CartProvider } from "../components/Cart";
import { LoginOverlay } from "../components/LoginOverlay";
import { OverlayProvider } from "../components/Overlay";
import UserProvider from "../components/User";
import { invalidTokenLinkWithTokenHandlerComponent } from "../core/auth";
import { useApollo } from "../lib/apollo";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
    const apolloClient = useApollo(pageProps);
    const { component: UserProviderWithTokenHandler } =
        invalidTokenLinkWithTokenHandlerComponent(UserProvider);

    return (
        <ApolloProvider client={apolloClient}>
            <UserProviderWithTokenHandler apolloClient={apolloClient} refreshUser>
                <CartProvider>
                    <OverlayProvider>
                        <>
                            <header>
                                <MainMenu />
                            </header>

                            <Component {...pageProps} />

                            <Footer />

                            <CartOverlay />
                            <LoginOverlay />
                            <NavigationOverlay />
                            <SearchOverlay />
                        </>
                    </OverlayProvider>
                </CartProvider>
            </UserProviderWithTokenHandler>
        </ApolloProvider>
    );
};

export default App;
