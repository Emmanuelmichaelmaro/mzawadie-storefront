import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { OfflinePlaceholder } from "./index";

storiesOf("@mzawadie/ui-kit/atoms/OfflinePlaceholder", module)
    .addParameters({ component: OfflinePlaceholder })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <OfflinePlaceholder />);
