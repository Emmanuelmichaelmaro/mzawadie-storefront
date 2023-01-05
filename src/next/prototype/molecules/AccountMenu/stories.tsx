import { paths } from "@mzawadie/core";
import { styled } from "@mzawadie/ui-kit/styles";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { AccountMenu } from ".";

const Wrapper = styled.div`
    width: 360px;
`;

const links = [paths.account, paths.accountOrderHistory, paths.accountAddressBook];
const active = paths.accountAddressBook;

const DEFAULT_PROPS = { ...{ links, active } };

storiesOf("@mzawadie/ui-kit/molecules/AccountMenu", module)
    .addParameters({ component: AccountMenu })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <Wrapper>
            <AccountMenu {...DEFAULT_PROPS} />
        </Wrapper>
    ));
