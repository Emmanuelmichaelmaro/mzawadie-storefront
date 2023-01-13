import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { DiscountForm } from ".";

storiesOf("@mzawadie/ui-kit/organisms/DiscountForm", module)
    .addParameters({ component: DiscountForm })
    .add("default", () => (
        <IntlProvider locale="en">
            <DiscountForm />
        </IntlProvider>
    ));
