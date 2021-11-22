import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CartFooter } from ".";
import { ALL_POSSIBLE_COSTS, BASIC_COSTS } from "./fixtures";

storiesOf("@mzawadie/prototype/atoms/CartFooter", module)
    .addParameters({ component: CartFooter })
    .addDecorator(story => (
        <IntlProvider locale="en">{story()}</IntlProvider>
    ))
    .add("default", () => <CartFooter {...BASIC_COSTS} />)
    .add("full", () => <CartFooter {...ALL_POSSIBLE_COSTS} />);
