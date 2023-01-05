import { paths } from "@mzawadie/core";
import { styled } from "@mzawadie/ui-kit/styles";
import { storiesOf } from "@storybook/react";
import React from "react";
import { IntlProvider } from "react-intl";

import { AccountMenuMobile } from ".";

const Wrapper = styled.div`
    margin-top: 100px;
    width: 360px;
`;

const links = [paths.account, paths.accountOrderHistory, paths.accountAddressBook];
const active = paths.accountAddressBook;

const DEFAULT_PROPS = { ...{ links, active } };

storiesOf("@mzawadie/ui-kit/molecules/AccountMenuMobile", module)
    .addParameters({ component: AccountMenuMobile })
    .addDecorator((story) => <IntlProvider locale="en">{story()}</IntlProvider>)
    .add("default", () => (
        <Wrapper>
            <AccountMenuMobile {...DEFAULT_PROPS} />
        </Wrapper>
    ));
