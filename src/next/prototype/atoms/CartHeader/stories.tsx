import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CartHeader } from ".";

storiesOf("@mzawadie/prototype/atoms/CartHeader", module)
    .addParameters({ component: CartHeader })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <CartHeader />);
