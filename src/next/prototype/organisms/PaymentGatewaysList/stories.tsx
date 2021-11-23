import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { PaymentGatewaysList } from ".";
import { paymentGateways } from "./fixtures";

const processPayment = action("processPayment");
const submitPayment = async () => Promise.resolve({});
const submitPaymentSuccess = action("submitPaymentSuccess");
const selectPaymentGateway = action("selectPaymentGateway");
const onError = action("onError");

storiesOf("@mzawadie/prototype/organisms/PaymentGatewaysList", module)
    .addParameters({ component: PaymentGatewaysList })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <PaymentGatewaysList
            paymentGateways={paymentGateways}
            processPayment={processPayment}
            submitPayment={submitPayment}
            submitPaymentSuccess={submitPaymentSuccess}
            selectPaymentGateway={selectPaymentGateway}
            onError={onError}
        />
    ));
