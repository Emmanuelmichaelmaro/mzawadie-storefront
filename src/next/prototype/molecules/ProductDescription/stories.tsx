import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductDescription } from "./index";
import { attributes, descriptionJSON } from "./fixtures";

storiesOf("@mzawadie/prototype/molecules/ProductDescription", module)
    .addParameters({ component: ProductDescription })
    .add("default", () => <ProductDescription attributes={attributes} description={descriptionJSON} />);
