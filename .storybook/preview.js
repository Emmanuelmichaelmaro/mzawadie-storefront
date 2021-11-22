import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { RouterContext } from "next/dist/shared/lib/router-context";
import * as NextImage from "next/image";
import React from "react";

import { OutLineDecorator } from "./OutlineDecorator";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
    configurable: true,
    value: (props) => (
        <OriginalNextImage
            {...props}
            unoptimized
        />
    ),
});

export const parameters = {
    name: "Mzawadie Storefront",
    url: "https://github.com/Emmanuelmichaelmaro/mzawadie-storefront",
    goFullScreen: false,
    sidebarAnimations: true,
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        expanded: true,
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },
    viewport: { viewports: INITIAL_VIEWPORTS },
    nextRouter: {
        Provider: RouterContext.Provider,
    },
};

export const decorators = [OutLineDecorator];
