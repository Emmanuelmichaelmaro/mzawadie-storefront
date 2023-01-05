// @ts-nocheck
import { paths, commonMessages } from "@mzawadie/core";
import { useAuth, useCart } from "@mzawadie/sdk/lib/src";
import { DemoBanner } from "@mzawadie/ui-kit/atoms";
import { largeScreen as mediumScreen, smallScreen } from "@mzawadie/ui-kit/styles/constants";
import { ShopMenusQuery } from "@next/graphql/gqlTypes/ShopMenusQuery";
import classNames from "classnames";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import Media from "react-media";
import { ReactSVG } from "react-svg";

import { MenuDropdown, Offline, Online, OverlayContext, OverlayTheme, OverlayType } from "..";
import cartImg from "../../images/cart.svg";
import hamburgerHoverImg from "../../images/hamburger-hover.svg";
import hamburgerImg from "../../images/hamburger.svg";
import logoImg from "../../images/logo.svg";
import searchImg from "../../images/search.svg";
import userImg from "../../images/user.svg";
import { NavDropdown } from "./NavDropdown";
import styles from "./scss/index.module.scss";

interface MainMenuProps {
    demoMode: boolean;
    menu: ShopMenusQuery["mainMenu"];
    loading: boolean;
}

export const MainMenu: React.FC<MainMenuProps> = ({ demoMode, menu, loading }) => {
    const overlayContext = useContext(OverlayContext);

    const { user, signOut } = useAuth();

    const { items } = useCart();

    const [activeDropdown, setActiveDropdown] = useState<string>(undefined);

    const menuItems = menu?.items || [];

    const cartItemsQuantity = (items && items.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0)) || 0;

    const handleSignOut = () => signOut();

    const showDropdownHandler = (itemId: string, hasSubNavigation: boolean) => {
        if (hasSubNavigation) {
            setActiveDropdown(itemId);
        }
    };

    const hideDropdownHandler = () => {
        if (activeDropdown) {
            setActiveDropdown(undefined);
        }
    };

    useEffect(() => {
        if (activeDropdown) {
            overlayContext.show(OverlayType.mainMenuNav, OverlayTheme.modal);
        } else {
            overlayContext.hide();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeDropdown]);

    return (
        <header
            className={classNames({
                [styles.header__with__dropdown]: !!activeDropdown,
            })}
        >
            {demoMode && <DemoBanner />}

            <nav className={styles.main__menu} id="header">
                <div className={styles.main__menu__left}>
                    <ul>
                        <Media
                            query={{ maxWidth: mediumScreen }}
                            render={() => (
                                <li
                                    data-test="toggleSideMenuLink"
                                    className={styles.main__menu__hamburger}
                                    onClick={() =>
                                        overlayContext.show(OverlayType.sideNav, OverlayTheme.left, {
                                            data: menuItems,
                                        })
                                    }
                                >
                                    <ReactSVG src={hamburgerImg} className={styles.main__menu__hamburger__icon} />

                                    <ReactSVG src={hamburgerHoverImg} className={styles.main__menu__hamburger__hover} />
                                </li>
                            )}
                        />

                        <Media
                            query={{ minWidth: mediumScreen }}
                            render={() =>
                                menuItems.map((item) => {
                                    const hasSubNavigation = !!item?.children?.length;
                                    return (
                                        <li data-test="mainMenuItem" className={styles.main__menu__item} key={item.id}>
                                            <NavDropdown
                                                overlay={overlayContext}
                                                showDropdown={activeDropdown === item.id && hasSubNavigation}
                                                onShowDropdown={() => showDropdownHandler(item.id, hasSubNavigation)}
                                                onHideDropdown={hideDropdownHandler}
                                                {...item}
                                            />
                                        </li>
                                    );
                                })
                            }
                        />

                        <Online>
                            <Media
                                query={{ maxWidth: smallScreen }}
                                render={() =>
                                    !loading && (
                                        <>
                                            {user ? (
                                                <MenuDropdown
                                                    suffixClass="__rightdown"
                                                    head={
                                                        <li className="main-menu__icon main-menu__user--active">
                                                            <ReactSVG src={userImg} />
                                                        </li>
                                                    }
                                                    content={
                                                        <ul className="main-menu__dropdown">
                                                            <li data-test="mobileMenuMyAccountLink">
                                                                <Link href={paths.account}>
                                                                    <a>
                                                                        <FormattedMessage {...commonMessages.myAccount} />
                                                                    </a>
                                                                </Link>
                                                            </li>

                                                            <li data-test="mobileMenuOrderHistoryLink">
                                                                <Link href={paths.accountOrderHistory}>
                                                                    <a>
                                                                        <FormattedMessage
                                                                            {...commonMessages.orderHistory}
                                                                        />
                                                                    </a>
                                                                </Link>
                                                            </li>

                                                            <li data-test="mobileMenuAddressBookLink">
                                                                <Link href={paths.accountAddressBook}>
                                                                    <a>
                                                                        <FormattedMessage {...commonMessages.addressBook} />
                                                                    </a>
                                                                </Link>
                                                            </li>

                                                            <li onClick={handleSignOut} data-test="mobileMenuLogoutLink">
                                                                <FormattedMessage {...commonMessages.logOut} />
                                                            </li>
                                                        </ul>
                                                    }
                                                />
                                            ) : (
                                                <li
                                                    data-test="mobileMenuLoginLink"
                                                    className="main-menu__icon"
                                                    onClick={() =>
                                                        overlayContext.show(OverlayType.login, OverlayTheme.left)
                                                    }
                                                >
                                                    <ReactSVG src={userImg} />
                                                </li>
                                            )}
                                        </>
                                    )
                                }
                            />
                        </Online>
                    </ul>
                </div>

                <div className={styles.main__menu__center}>
                    <Link href={paths.home}>
                        <a>
                            <ReactSVG src={logoImg} />
                        </a>
                    </Link>
                </div>

                <div className={styles.main__menu__right}>
                    <ul>
                        <Online>
                            <Media
                                query={{ minWidth: smallScreen }}
                                render={() =>
                                    !loading && (
                                        <>
                                            {user ? (
                                                <MenuDropdown
                                                    head={
                                                        <li
                                                            className={`${styles.main__menu__icon} ${styles.main__menu__user__active}`}
                                                        >
                                                            <ReactSVG src={userImg} />
                                                        </li>
                                                    }
                                                    content={
                                                        <ul className={styles.main__menu__dropdown}>
                                                            <li data-test="desktopMenuMyAccountLink">
                                                                <Link href={paths.account}>
                                                                    <a>
                                                                        <FormattedMessage {...commonMessages.myAccount} />
                                                                    </a>
                                                                </Link>
                                                            </li>

                                                            <li data-test="desktopMenuOrderHistoryLink">
                                                                <Link href={paths.accountOrderHistory}>
                                                                    <a>
                                                                        <FormattedMessage
                                                                            {...commonMessages.orderHistory}
                                                                        />
                                                                    </a>
                                                                </Link>
                                                            </li>

                                                            <li data-test="desktopMenuAddressBookLink">
                                                                <Link href={paths.accountAddressBook}>
                                                                    <a>
                                                                        <FormattedMessage {...commonMessages.addressBook} />
                                                                    </a>
                                                                </Link>
                                                            </li>

                                                            <li onClick={handleSignOut} data-test="desktopMenuLogoutLink">
                                                                <FormattedMessage {...commonMessages.logOut} />
                                                            </li>
                                                        </ul>
                                                    }
                                                />
                                            ) : (
                                                <li
                                                    data-test="desktopMenuLoginOverlayLink"
                                                    className={styles.main__menu__icon}
                                                    onClick={() =>
                                                        overlayContext.show(OverlayType.login, OverlayTheme.right)
                                                    }
                                                >
                                                    <ReactSVG src={userImg} />
                                                </li>
                                            )}
                                        </>
                                    )
                                }
                            />

                            <li
                                data-test="menuCartOverlayLink"
                                className={`${styles.main__menu__icon} ${styles.main__menu__cart}`}
                                onClick={() => {
                                    overlayContext.show(OverlayType.cart, OverlayTheme.right);
                                }}
                            >
                                {!loading && (
                                    <>
                                        <ReactSVG src={cartImg} />
                                        {cartItemsQuantity > 0 ? (
                                            <span className={styles.main__menu__cart__quantity}>{cartItemsQuantity}</span>
                                        ) : null}
                                    </>
                                )}
                            </li>
                        </Online>

                        <Offline>
                            <li className={styles.main__menu__offline}>
                                <Media
                                    query={{ minWidth: mediumScreen }}
                                    render={() => (
                                        <span>
                                            <FormattedMessage defaultMessage="Offline" />
                                        </span>
                                    )}
                                />
                            </li>
                        </Offline>

                        <li
                            data-test="menuSearchOverlayLink"
                            className={styles.main__menu__search}
                            onClick={() => overlayContext.show(OverlayType.search, OverlayTheme.right)}
                        >
                            <Media
                                query={{ minWidth: mediumScreen }}
                                render={() => (
                                    <span>
                                        <FormattedMessage {...commonMessages.search} />
                                    </span>
                                )}
                            />
                            <ReactSVG src={searchImg} />
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};
