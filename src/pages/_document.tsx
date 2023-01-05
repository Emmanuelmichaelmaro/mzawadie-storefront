// eslint-disable-next-line @next/next/no-document-import-in-page
import { apiUrl } from "@mzawadie/core";
import Document, { DocumentContext, Head, Html, Main, NextScript } from "next/document";
import React from "react";

class MyDocument extends Document<{ lang?: string }> {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps, lang: ctx?.query?.locale };
    }

    render() {
        return (
            <Html lang={this.props.lang}>
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

                <body>
                    <Main />
                    <NextScript />
                    <div id="modal-root" />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
