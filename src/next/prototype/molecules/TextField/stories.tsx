import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { TextField } from "./index";

const DEFAULT_PROPS = {
    errors: [],
    label: "Label",
    onChange: action("onChange"),
    value: "Value",
};

const ContentLeft = () => <span>Content Left</span>;
const ContentRight = () => <span>Content Right</span>;

storiesOf("@mzawadie/ui-kit/molecules/TextField", module)
    .addParameters({ component: TextField })
    .add("default", () => <TextField {...DEFAULT_PROPS} />)
    .add("with errors", () => <TextField {...DEFAULT_PROPS} errors={[{ field: "field", message: "Some error" }]} />)
    .add("with content left", () => <TextField {...DEFAULT_PROPS} contentLeft={<ContentLeft />} />)
    .add("with content right", () => <TextField {...DEFAULT_PROPS} contentRight={<ContentRight />} />);
