import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { AddNewTile } from ".";

storiesOf("@mzawadie/prototype/atoms/AddNewTile", module)
    .addParameters({ component: AddNewTile })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <AddNewTile type="card" />);
