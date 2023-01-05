import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { attributes, descriptionJSON } from "./fixtures";
import { ProductDescription } from "./index";

storiesOf("@mzawadie/ui-kit/molecules/ProductDescription", module)
    .addParameters({ component: ProductDescription })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => <ProductDescription attributes={attributes} description={descriptionJSON} />);
