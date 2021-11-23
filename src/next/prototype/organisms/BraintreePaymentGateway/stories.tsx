import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { BraintreePaymentGateway } from ".";
import { IBraintreePaymentGatewayProps } from "./BraintreePaymentGateway";

const DEFAULT_PROPS: IBraintreePaymentGatewayProps = {};

storiesOf("@mzawadie/prototype/organisms/BraintreePaymentGateway", module)
    .addParameters({ component: BraintreePaymentGateway })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <BraintreePaymentGateway {...DEFAULT_PROPS} />);
