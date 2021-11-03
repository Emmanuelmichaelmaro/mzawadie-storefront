import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import React from "react";

import { useApollo } from "../lib/apollo";
import "../styles/globals.css";
import { CartOverlay, CartProvider } from "../components/Cart";
import { OverlayProvider } from "../components/Overlay";
import { Footer, MainMenu, NavigationOverlay, SearchOverlay } from "../components";

const App = ({ Component, pageProps }: AppProps) => {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <CartProvider>
                <OverlayProvider>
                    <>
                        <header>
                            <MainMenu />
                        </header>

                        <Component {...pageProps} />

                        <Footer />

                        <CartOverlay />
                        <NavigationOverlay />
                        <SearchOverlay />
                    </>
                </OverlayProvider>
            </CartProvider>
        </ApolloProvider>
    );
};

export default App;
