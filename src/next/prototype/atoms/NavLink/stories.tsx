import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { NavLink } from ".";
import { mockItemRoute } from "./fixtures";

storiesOf("@mzawadie/prototype/atoms/NavLink", module)
    .addParameters({ component: NavLink })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <NavLink item={mockItemRoute}>ELEMENT I</NavLink>);
