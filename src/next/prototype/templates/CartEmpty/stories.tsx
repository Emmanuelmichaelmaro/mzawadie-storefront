import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CartEmpty } from ".";

storiesOf("@mzawadie/prototype/templates/CartEmpty", module)
    .addParameters({ component: CartEmpty })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <CartEmpty />);
