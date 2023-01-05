import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { CartCostsSummary } from ".";
import { ALL_POSSIBLE_COSTS, BASIC_COSTS } from "./fixtures";

storiesOf("@mzawadie/ui-kit/atoms/CartCostsSummary", module)
    .addParameters({ component: CartCostsSummary })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <CartCostsSummary {...BASIC_COSTS} />)
    .add("full", () => <CartCostsSummary {...ALL_POSSIBLE_COSTS} />);
