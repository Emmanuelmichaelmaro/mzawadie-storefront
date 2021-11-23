import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { IntlProvider } from "react-intl";

import { StripeCreditCardForm } from ".";

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const onSubmit = action("onSubmit");

storiesOf("@mzawadie/prototype/organisms/StripeCreditCardForm", module)
    .addParameters({ component: StripeCreditCardForm })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <Elements stripe={stripePromise}>
            <StripeCreditCardForm onSubmit={async () => onSubmit()} />
        </Elements>
    ));
