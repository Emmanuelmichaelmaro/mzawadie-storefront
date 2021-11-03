import * as React from "react";
import Head from "next/head";

import { Consumer as MetaConsumer } from "./context";

const Consumer: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <MetaConsumer>
        {({ title, description, image, type, url, custom }) => (
            <>
                <Head>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:url" content={url} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="og:type" content={type} />
                    <meta property="og:image" content={image} />
                    {/*[{...custom}]*/}
                </Head>
                {children}
            </>
        )}
    </MetaConsumer>
);

export default Consumer;
