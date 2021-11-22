import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { DemoBanner } from "./index";

storiesOf("@mzawadie/prototype/atoms/DemoBanner", module)
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <DemoBanner />);
