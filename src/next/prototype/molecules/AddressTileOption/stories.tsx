import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { AddressTileOption } from ".";
import { DEFAULT_PROPS } from "./fixtures";

storiesOf("@mzawadie/prototype/molecules/AddressTileOption", module)
    .addParameters({ component: AddressTileOption })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("unchecked", () => <AddressTileOption {...DEFAULT_PROPS} checked={false} />)
    .add("checked", () => <AddressTileOption {...DEFAULT_PROPS} checked />);
