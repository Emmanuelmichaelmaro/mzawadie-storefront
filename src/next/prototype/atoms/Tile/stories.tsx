import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { Tile } from ".";

storiesOf("@mzawadie/prototype/atoms/Tile", module)
    .addParameters({ component: Tile })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <Tile header={<h3>This is header</h3>}>
            <div>This is body</div>
        </Tile>
    ))
    .add("with hover", () => (
        <Tile tileType="hover" header={<h3>This is header</h3>} footer={<p>And this is footer</p>}>
            <div>This is body</div>
        </Tile>
    ))
    .add("addNew tile style", () => (
        <Tile tileType="addNew">
            <div>This is body</div>
        </Tile>
    ));
