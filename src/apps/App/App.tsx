import ShopProvider from "@mzawadie/components/ShopProvider";
import { demoMode } from "@mzawadie/core";
import { Loader } from "@mzawadie/ui-kit/atoms";
import { useDynamicRouteRedirect } from "@mzawadie/ui-kit/hooks";
import { ShopConfig } from "@mzawadie/ui-kit/utils/ssr";
import { useAuth } from "@saleor/sdk";
import { useRouter } from "next/router";
import React from "react";

import { Footer, MainMenu, MetaConsumer, OverlayManager, OverlayProvider } from "../../components";
import Notifications from "./Notifications";

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

                {loading ? <Loader fullScreen /> : <div className="">{children}</div>}

                <Footer menu={footer} />

                <OverlayManager />

                <Notifications />
            </OverlayProvider>
        </ShopProvider>
    );
};

export default StorefrontApp;
