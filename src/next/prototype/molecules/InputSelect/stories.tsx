import { styled } from "@mzawadie/ui-kit/styles";
import { storiesOf } from "@storybook/react";
import React from "react";

import { InputSelect } from "./index";

const DEFAULT_PROPS = {
    label: "Country",
    name: "country",
    optionLabelKey: "country",
    optionValueKey: "code",
    options: [
        { code: "PL", country: "Poland" },
        { code: "PT", country: "Portugal" },
        { code: "US", country: "United States of America" },
        { code: "DE", country: "Germany" },
        { code: "BE", country: "Belarus" },
        { code: "SE", country: "Sweden" },
        { code: "FR", country: "France" },
        { code: "CZ", country: "Czech Republic" },
        { code: "FI", country: "Finland" },
        { code: "GB", country: "Great Britain" },
    ],
};

const Wrapper = styled.div`
    max-height: 200px;
`;

const Container = () => {
    const [value, setValue] = React.useState();
    return <InputSelect value={value} onChange={(value) => setValue(value)} {...DEFAULT_PROPS} />;
};
storiesOf("@mzawadie/ui-kit/molecules/InputSelect", module)
    .addParameters({ component: InputSelect })
    .add("default", () => (
        <Wrapper>
            <Container />
        </Wrapper>
    ));
