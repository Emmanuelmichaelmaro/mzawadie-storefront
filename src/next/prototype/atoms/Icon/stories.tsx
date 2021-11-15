import { storiesOf } from "@storybook/react";
import React from "react";

import { Icon } from "./index";

storiesOf("@components/atoms/Icon", module)
    .addParameters({ component: Icon })
    .add("sample icon", () => <Icon name="arrow_back" />);
