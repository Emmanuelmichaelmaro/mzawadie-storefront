import { commonMessages, paths } from "@mzawadie/core";
import { Icon } from "@mzawadie/ui-kit/atoms";
import { useHandlerWhenClickedOutside } from "@mzawadie/ui-kit/hooks";
import Link from "next/link";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import * as S from "./styles";
import { IAccountMenuMobileProps } from "./types";

export const AccountMenuMobile: React.FC<IAccountMenuMobileProps> = ({ links, active }: IAccountMenuMobileProps) => {
    const [showMenu, setShowMenu] = React.useState(false);
    const intl = useIntl();

    const { setElementRef } = useHandlerWhenClickedOutside(() => {
        setShowMenu(false);
    });

    const linkToMenuItem = (link: string) =>
        ({
            [paths.account]: intl.formatMessage(commonMessages.account),
            [paths.accountOrderHistory]: intl.formatMessage(commonMessages.orderHistory),
            [paths.accountAddressBook]: intl.formatMessage(commonMessages.addressBook),
        }[link]);

    return (
        <S.Wrapper
            onClick={() => {
                setShowMenu(true);
            }}
            ref={setElementRef()}
        >
            {linkToMenuItem(active)}

            <Icon name="select_arrow" size={8} />

            {showMenu && (
                <S.Overlay>
                    <S.MenuHeader>
                        <FormattedMessage defaultMessage="Go to" />
                    </S.MenuHeader>

                    {links.map((link) => (
                        <div
                            onClick={(evt) => {
                                evt.stopPropagation();
                                setShowMenu(false);
                            }}
                            key={link}
                        >
                            <Link href={link}>
                                <a>
                                    <S.MenuItem active={active === link}>
                                        {linkToMenuItem(link)}

                                        <Icon name="select_arrow" size={8} />
                                    </S.MenuItem>
                                </a>
                            </Link>
                        </div>
                    ))}
                </S.Overlay>
            )}
        </S.Wrapper>
    );
};