import { storiesOf } from "@storybook/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { IntlProvider } from "react-intl";

import { StripeInputElement } from ".";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

storiesOf("@mzawadie/prototype/atoms/StripeInputElement", module)
    .addParameters({ component: StripeInputElement })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("cart number input", () => (
        <Elements stripe={stripePromise}>
            <StripeInputElement type="CardNumber" />
        </Elements>
    ))
    .add("cart cvc input", () => (
        <Elements stripe={stripePromise}>
            <StripeInputElement type="CardCvc" />
        </Elements>
    ))
    .add("cart expiry input", () => (
        <Elements stripe={stripePromise}>
            <StripeInputElement type="CardExpiry" />
        </Elements>
    ));
