import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { IAddToCartButton } from "./AddToCartButton";
import { AddToCartButton } from "./index";

const DEFAULT_PROPS: IAddToCartButton = {
    disabled: false,
    onSubmit: () => undefined,
};

storiesOf("@mzawadie/ui-kit/molecules/AddToCartButton", module)
    .addParameters({ component: AddToCartButton })
    .addDecorator((story) => <IntlProvider locale="en">story()</IntlProvider>)
    .add("default", () => <AddToCartButton {...DEFAULT_PROPS} />)
    .add("disabled", () => <AddToCartButton {...DEFAULT_PROPS} disabled />);
