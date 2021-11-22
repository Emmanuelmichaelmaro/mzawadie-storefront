import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { IQuantityInput } from "./QuantityInput";
import { QuantityInput } from "./index";

const DEFAULT_PROPS: IQuantityInput = {
    quantity: 1,
    maxQuantity: 10,
    disabled: false,
    onQuantityChange: (value: number) => undefined,
    hideErrors: false,
    testingContext: "QuantityInput",
};

storiesOf("@mzawadie/prototype/molecules/QuantityInput", module)
    .addParameters({ component: QuantityInput })
    .addDecorator((story) => <IntlProvider locale="en">story()</IntlProvider>)
    .add("default", () => <QuantityInput {...DEFAULT_PROPS} />)
    .add("disabled", () => <QuantityInput {...DEFAULT_PROPS} disabled />);
