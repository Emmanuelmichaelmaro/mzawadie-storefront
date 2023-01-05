import { storiesOf } from "@storybook/react";
import React from "react";

import { PlaceholderImage } from "./index";

storiesOf("@mzawadie/ui-kit/atoms/PlaceholderImage", module)
    .addParameters({ component: PlaceholderImage })
    .add("default", () => <PlaceholderImage />);
