// @ts-nocheck
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CartSummaryRow } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@mzawadie/prototype/molecules/CartSummaryRow", module)
    .addParameters({ component: CartSummaryRow })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <CartSummaryRow {...DEFAULT_PROPS} />);
