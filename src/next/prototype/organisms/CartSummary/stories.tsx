// @ts-nocheck
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CartSummary } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@mzawadie/ui-kit/organisms/CartSummary", module)
    .addParameters({ component: CartSummary })
    .add("default", () => (
        <IntlProvider locale="en">
            <CartSummary {...DEFAULT_PROPS} />
        </IntlProvider>
    ));
