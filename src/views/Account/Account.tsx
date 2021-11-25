import { commonMessages, paths } from "@mzawadie/core";
import { Redirect } from "@mzawadie/prototype/atoms";
import { AccountMenu, AccountMenuMobile } from "@mzawadie/prototype/molecules";
import { useAuth } from "@mzawadie/sdk";
import { User } from "@mzawadie/sdk/lib/fragments/gqlTypes/User";
import { AccountTab, OrdersHistory } from "@next/pages";
import { smallScreen } from "@next/styles/constants";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import Media from "react-responsive";

import { Breadcrumbs, Loader } from "../../components";
import AddressBook from "./AddressBook";
import "./scss/index.module.scss";

const returnTab: any = (path: string, userDetails: User) => {
    let tabContent = <></>;
    switch (path) {
        case paths.account: {
            tabContent = <AccountTab />;
            break;
        }
        case paths.accountAddressBook: {
            tabContent = <AddressBook user={userDetails} />;
            break;
        }
        case paths.accountOrderHistory: {
            tabContent = <OrdersHistory />;
            break;
        }
        default:
            tabContent = <AccountTab />;
            break;
    }
    return tabContent;
};

export const AccountView: NextPage = () => {
    const intl = useIntl();

    const { user, loaded } = useAuth();
    const { asPath, pathname } = useRouter();

    const links = [paths.account, paths.accountOrderHistory, paths.accountAddressBook];

    if (!user) {
        return <Redirect url={paths.home} />;
    }

    return loaded ? (
        <div className="container">
            <Breadcrumbs
                breadcrumbs={[
                    {
                        link: asPath,
                        value: intl.formatMessage(commonMessages.myAccount),
                    },
                ]}
            />

            <div className="account">
                <Media minWidth={smallScreen}>
                    <div className="account__menu">
                        <AccountMenu links={links} active={pathname} />
                    </div>
                </Media>

                <Media maxWidth={smallScreen - 1}>
                    <div className="account__menu_mobile">
                        <AccountMenuMobile links={links} active={pathname} />
                    </div>
                </Media>

                <div className="account__content">{user && returnTab(pathname, user)}</div>
            </div>
        </div>
    ) : (
        <Loader />
    );
};
