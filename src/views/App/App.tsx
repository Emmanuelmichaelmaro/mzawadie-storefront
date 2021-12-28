import Footer from "@mzawadie/components/Footer/Footer";
import ShopProvider from "@mzawadie/components/ShopProvider";
import { demoMode } from "@mzawadie/core";
import { Loader } from "@mzawadie/prototype/atoms";
import { useAuth } from "@mzawadie/sdk/lib/src";
import { useDynamicRouteRedirect } from "@next/hooks";
import { ShopConfig } from "@next/utils/ssr";
import { useRouter } from "next/router";
import React from "react";

import { MainMenu, MetaConsumer, OverlayManager, OverlayProvider } from "../../components";

type AppProps = ShopConfig;

const StorefrontApp: React.FC<AppProps> = ({ footer, mainMenu, shopConfig, children }) => {
    const { pathname } = useRouter();

    const willRedirect = useDynamicRouteRedirect();

    const { tokenRefreshing, tokenVerifying } = useAuth();

    const loading = tokenRefreshing || tokenVerifying || willRedirect;

    return (
        <ShopProvider shopConfig={shopConfig}>
            <OverlayProvider pathname={pathname}>
                <MetaConsumer />

                <MainMenu loading={loading} demoMode={demoMode} menu={mainMenu} />

                {loading ? <Loader fullScreen /> : children}

                <Footer menu={footer} />

                <OverlayManager />
            </OverlayProvider>
        </ShopProvider>
    );
};

export default StorefrontApp;
