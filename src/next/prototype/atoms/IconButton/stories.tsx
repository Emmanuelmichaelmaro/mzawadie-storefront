import { storiesOf } from "@storybook/react";
import React from "react";

import { IconButton } from "./index";

storiesOf("@mzawadie/ui-kit/atoms/IconButton", module)
    .addParameters({ component: IconButton })
    .add("edit icon button", () => <IconButton testingContext="test" name="edit" size={19} />)
    .add("trash icon button", () => <IconButton testingContext="test" name="trash" size={22} />);
