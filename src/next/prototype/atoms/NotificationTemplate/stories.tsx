import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { NotificationTemplate } from "./index";

const onClick = action("onClick called");

storiesOf("@mzawadie/prototypes/atoms/NotificationTemplate", module)
    .addParameters({ component: NotificationTemplate })
    .add("default", () => (
        <NotificationTemplate
            close={onClick}
            id="test"
            message={{ title: "test" }}
            options={{ type: "success" }}
            style={{ margin: 1 }}
        />
    ));
