import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { SideNavbar } from ".";
import { items } from "./fixtures";

let portalRoot = document.getElementById("portal-root");

if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(portalRoot);
}

storiesOf("@mzawadie/prototype/organisms/SideNavbar", module)
    .addParameters({ component: SideNavbar })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <SideNavbar show onHide={action("hide")} target={portalRoot} items={items} />
    ));
