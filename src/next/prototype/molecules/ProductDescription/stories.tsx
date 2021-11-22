import { storiesOf } from "@storybook/react";
import React from "react";

import { attributes, descriptionJSON } from "./fixtures";
import { ProductDescription } from "./index";

storiesOf("@mzawadie/prototype/molecules/ProductDescription", module)
    .addParameters({ component: ProductDescription })
    .add("default", () => <ProductDescription attributes={attributes} description={descriptionJSON} />);
