// eslint-disable-next-line @next/next/no-document-import-in-page
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
                <Head />
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
