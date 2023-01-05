import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { AddressSummary } from ".";

storiesOf("@mzawadie/ui-kit/molecules/Address", module)
    .addParameters({ component: AddressSummary })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <AddressSummary />);
