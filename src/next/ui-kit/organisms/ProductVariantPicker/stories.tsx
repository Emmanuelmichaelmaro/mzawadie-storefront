import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React, { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import styled from "styled-components";

import ProductVariantPicker from "./ProductVariantPicker";
import { productVariants } from "./fixtures";

let portalRoot = document.getElementById("portal-root");

if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(portalRoot);
}

const Container = styled.div`
    width: 600px;
`;

const withContainer = (children: ReactNode) => <Container> {children}</Container>;

const PRODUCT_VARIANTS = productVariants;
const PROPS = {
    onAttributeChangeHandler: action("attribute change"),
    onChange: action("onChange"),
    productVariants: PRODUCT_VARIANTS,
    queryAttributes: {},
};

storiesOf("@mzawadie/ui-kit/organisms/ProductVariantPicker", module)
    .addParameters({ component: ProductVariantPicker })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => withContainer(<ProductVariantPicker {...PROPS} />))
    .add("with sidebar", () =>
        withContainer(<ProductVariantPicker selectSidebar selectSidebarTarget={portalRoot} {...PROPS} />)
    );
