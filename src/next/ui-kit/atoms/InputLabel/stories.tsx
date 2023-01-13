import { storiesOf } from "@storybook/react";
import React from "react";

import { InputLabel } from "./index";

storiesOf("@mzawadie/ui-kit/atoms/InputLabel", module)
    .addParameters({ component: InputLabel })
    .add("active false", () => (
        <InputLabel labelBackground="#FFF" active={false}>
            This is input
        </InputLabel>
    ))
    .add("active true", () => (
        <InputLabel labelBackground="#FFF" active>
            This is input
        </InputLabel>
    ));
