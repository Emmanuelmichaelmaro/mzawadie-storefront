import { storiesOf } from "@storybook/react";
import React from "react";

import { PRODUCT } from "./fixtures";
import { ProductTile } from "./index";

storiesOf("@mzawadie/ui-kit/molecules/ProductTile", module)
    .addParameters({ component: ProductTile })
    .add("default", () => (
        <div style={{ width: "400px" }}>
            <ProductTile product={PRODUCT} />
        </div>
    ));
