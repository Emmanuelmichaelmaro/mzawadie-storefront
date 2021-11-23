import { storiesOf } from "@storybook/react";
import React from "react";

import { CreditCardNumberWithIcon } from ".";

storiesOf("@mzawadie/prototype/molecules/CreditCardNumberWithIcon", module).add("default", () => (
    <CreditCardNumberWithIcon creditCardProvider="visa" last4Digits={1234} />
));