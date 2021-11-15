import { storiesOf } from "@storybook/react";
import React from "react";

import { Checkbox } from "./index";

storiesOf("@mzawadie/prototype/atoms/Checkbox", module)
    .addParameters({ component: Checkbox })
    .add("default", () => <Checkbox name="default-checkbox">Checkbox with label</Checkbox>);
