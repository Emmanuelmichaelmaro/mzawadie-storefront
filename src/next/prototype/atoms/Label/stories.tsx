import { storiesOf } from "@storybook/react";
import React from "react";

import { Label } from "./index";

storiesOf("@mzawadie/prototype/atoms/Label", module)
    .addParameters({ component: Label })
    .add("default", () => <Label>This is sample text inside label</Label>);