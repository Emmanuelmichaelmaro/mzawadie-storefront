import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { DummyPaymentGateway } from ".";

const processPayment = action("processPayment");

storiesOf("@mzawadie/prototype/organisms/DummyPaymentGateway", module)
    .addParameters({ component: DummyPaymentGateway })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <DummyPaymentGateway processPayment={processPayment} />);
