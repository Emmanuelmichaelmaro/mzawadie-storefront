import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { Cart } from ".";

storiesOf("@mzawadie/prototype/templates/Cart", module)
    .addParameters({ component: Cart })
    .addDecorator(story => (
        <IntlProvider locale="en">{story()}</IntlProvider>
    ))
    .add("default", () => <Cart />);
