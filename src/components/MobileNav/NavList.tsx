// @ts-nocheck
import backImg from "@images/arrow-back.svg";
import logoImg from "@images/logo.svg";
import { commonMessages, paths } from "@mzawadie/core";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { ReactSVG } from "react-svg";

import NavItem, { INavItem } from "./NavItem";
import styles from "./scss/index.module.scss";

interface NavListProps {
    items: INavItem[];
    hideOverlay(): void;
}

interface NavListState {
    parent: INavItem | null;
    displayedItems: INavItem[];
}

class NavList extends React.PureComponent<NavListProps, NavListState> {
    state: NavListState = {
        displayedItems: this.props.items,
        parent: null,
    };

    handleShowSubItems = (item: INavItem) => {
        this.setState({ parent: item, displayedItems: item.children });
    };

    handleGoBack = () => {
        const grandparent = this.state.parent.parent;

        if (!grandparent) {
            this.setState({ parent: null, displayedItems: this.props.items });
        } else {
            const newParent = this.findItemById(grandparent.id);

            this.setState({
                displayedItems: newParent.children,
                parent: newParent,
            });
        }
    };

    findItemById(id: string): INavItem {
        let match = null;

        function find(item) {
            if (item.id === id) {
                match = item;
                return true;
            }

            return item.children && item.children.some(find);
        }

        this.props.items.some(find);

        return match;
    }

    render() {
        const { hideOverlay } = this.props;

        const { displayedItems, parent } = this.state;

        return (
            <ul>
                {parent ? (
                    <li className={(styles.side__nav__menu__item, styles.side__nav__menu__item__back)}>
                        <span onClick={this.handleGoBack}>
                            <ReactSVG src={backImg} /> {parent.name}
                        </span>
                    </li>
                ) : (
                    <>
                        <li className={`${styles.side__nav__menu__item} ${styles.side__nav__menu__item}--parent`}>
                            <Link href={paths.home}>
                                <a className={styles.side__nav__menu__item__logo}>
                                    <ReactSVG src={logoImg} onClick={hideOverlay} />
                                </a>
                            </Link>

                            <span className={styles.side__nav__menu__item__close} onClick={hideOverlay}>
                                <span />
                            </span>
                        </li>

                        <li className={styles.side__nav__menu__item}>
                            <Link href={paths.home}>
                                <a className={styles.side__nav__menu__item__link}>
                                    <span onClick={hideOverlay}>
                                        <FormattedMessage {...commonMessages.home} />
                                    </span>
                                </a>
                            </Link>
                        </li>
                    </>
                )}

                {displayedItems.map((item) => (
                    <NavItem key={item.id} hideOverlay={hideOverlay} showSubItems={this.handleShowSubItems} {...item} />
                ))}
            </ul>
        );
    }
}

export default NavList;
