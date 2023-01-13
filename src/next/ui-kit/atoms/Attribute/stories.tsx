import { storiesOf } from "@storybook/react";
import React from "react";

import { Attribute } from ".";

storiesOf("@mzawadie/ui-kit/atoms/Attribute", module)
    .addParameters({ component: Attribute })
    .add("default", () => <Attribute description="First Name" attributeValue="John" testingContext="firstNameAttribute" />);
