import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CheckoutReview } from ".";

storiesOf("@mzawadie/ui-kit/organisms/CheckoutReview", module)
    .addParameters({ component: CheckoutReview })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <CheckoutReview />);
