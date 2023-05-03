import { commonMessages, paths } from "@mzawadie/core";
import { Redirect } from "@mzawadie/ui-kit/atoms";
import { AccountMenu, AccountMenuMobile } from "@mzawadie/ui-kit/molecules";
import { AccountTab, OrdersHistory } from "@mzawadie/ui-kit/pages";
import { smallScreen } from "@mzawadie/ui-kit/styles/constants";
import { useAuth } from "@saleor/sdk";
import { User } from "@saleor/sdk/lib/fragments/gqlTypes/User";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useIntl } from "react-intl";
import Media from "react-responsive";

import { Breadcrumbs, Loader } from "../../components";
import AddressBook from "./AddressBook";
import styles from "./scss/index.module.scss";

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

            <div className={styles.account}>
                <Media minWidth={smallScreen}>
                    <div className={styles.account__menu}>
                        <AccountMenu links={links} active={pathname} />
                    </div>
                </Media>

                <Media maxWidth={smallScreen - 1}>
                    <div className={styles.account__menu__mobile}>
                        <AccountMenuMobile links={links} active={pathname} />
                    </div>
                </Media>

                <div className={styles.account__content}>{user && returnTab(pathname, user)}</div>
            </div>
        </div>
    ) : (
        <Loader />
    );
};
