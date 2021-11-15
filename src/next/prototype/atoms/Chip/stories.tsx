import { storiesOf } from "@storybook/react";
import React from "react";

import { Chip } from "./index";

storiesOf("@mzawadie/prototype/atoms/Chip", module)
    .addParameters({ component: Chip })
    .add("default", () => <Chip>Some thing</Chip>);
