import { ApolloProvider } from "@apollo/client";
import type { AppProps } from "next/app";
import React from "react";

import { useApollo } from "../lib/apollo";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
};

export default App;
