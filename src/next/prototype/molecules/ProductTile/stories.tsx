import { storiesOf } from "@storybook/react";
import React from "react";

import { ProductTile } from "./index";
import { PRODUCT } from "./fixtures";

storiesOf("@mzawadie/prototype/molecules/ProductTile", module)
    .addParameters({ component: ProductTile })
    .add("default", () => (
        <div style={{ width: "400px" }}>
            <ProductTile product={PRODUCT} />
        </div>
    ));
