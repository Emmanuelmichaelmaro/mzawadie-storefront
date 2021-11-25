import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { FilterSidebar } from "./index";
import { DEFAULT_PROPS } from "./testData";

let portalRoot = document.getElementById("portal-root");
if (!portalRoot) {
    portalRoot = document.createElement("div");
    portalRoot.setAttribute("id", "portal-root");
    document.body.appendChild(portalRoot);
}

storiesOf("@mzawadie/prototype/organisms/FilterSidebar", module)
    .addParameters({ component: FilterSidebar })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <FilterSidebar
            target={portalRoot}
            {...DEFAULT_PROPS}
            hide={action("hide")}
            onAttributeFiltersChange={action("onAttributesFiltersChange")}
        />
    ));
