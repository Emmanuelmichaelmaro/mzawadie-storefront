import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CheckoutShipping } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@mzawadie/prototype/organisms/CheckoutShipping", module)
    .addParameters({ component: CheckoutShipping })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <CheckoutShipping
            {...DEFAULT_PROPS}
            selectShippingMethod={action("selectShippingMethod has been called")}
        />
    ));
