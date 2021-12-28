import { OrderStatus } from "@mzawadie/sdk/lib/src";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { ThankYou } from ".";

storiesOf("@mzawadie/prototype/organisms/ThankYou", module)
    .addParameters({ component: ThankYou })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <ThankYou
            orderStatus={OrderStatus.UNFULFILLED}
            orderNumber="#341414"
            continueShoppingUrl="/"
            orderDetailsUrl="/order/xyz"
        />
    ))
    .add("with order unfulfilled", () => (
        <ThankYou
            orderStatus={OrderStatus.UNFULFILLED}
            orderNumber="#341414"
            continueShoppingUrl="/"
            orderDetailsUrl="/order/xyz"
        />
    ))
    .add("with order unconfirmed", () => (
        <ThankYou
            orderStatus={OrderStatus.UNCONFIRMED}
            orderNumber="#341414"
            continueShoppingUrl="/"
            orderDetailsUrl="/order/xyz"
        />
    ));
