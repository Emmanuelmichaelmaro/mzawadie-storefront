import { styled } from "@next/styles";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import React from "react";

import { AttributeValuesChecklist } from "./index";
import { DEFAULT_PROPS } from "./testData";

const Container = styled.div`
    width: 350px;
`;

storiesOf("@mzawadie/prototype/molecules/AttributeValuesChecklist", module)
    .addParameters({ component: AttributeValuesChecklist })
    .add("default", () => (
        <Container>
            <AttributeValuesChecklist {...DEFAULT_PROPS} onValueClick={action("click")} />
        </Container>
    ));
