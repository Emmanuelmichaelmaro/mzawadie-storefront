import { storiesOf } from "@storybook/react";
import React from "react";

import { Radio } from ".";

storiesOf("@mzawadie/ui-kit/atoms/Radio", module)
    .addParameters({ component: Radio })
    .add("unchecked", () => (
        <Radio name="name" value="value" checked={false}>
            Radio with label
        </Radio>
    ))
    .add("checked", () => (
        <Radio name="name" value="value" checked>
            Radio with label
        </Radio>
    ));
