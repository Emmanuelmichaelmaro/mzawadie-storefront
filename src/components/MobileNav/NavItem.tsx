// @ts-nocheck
import classNames from "classnames";
import * as React from "react";
import { ReactSVG } from "react-svg";

import { NavLink } from "..";
import subcategoriesImg from "@images/subcategories.svg";
import { MainMenuSubItem } from "../MainMenu/types/MainMenuSubItem";
import styles from "./scss/index.module.scss";

export interface INavItem extends MainMenuSubItem {
    children?: INavItem[];
}

interface NavItemProps extends INavItem {
    hideOverlay(): void;
    showSubItems(item: INavItem): void;
}

const NavItem: React.FC<NavItemProps> = ({ hideOverlay, showSubItems, ...item }) => {
    const hasSubNavigation = item.children && !!item.children.length;

    return (
        <li
            className={classNames({
                [`${styles.side__nav__menu__item}`]: true,
                [`${styles.side__nav__menu__item__has__subnavigation}`]: hasSubNavigation,
            })}
        >
            <NavLink item={item} className={styles.side__nav__menu__item__link} onClick={hideOverlay} />

            {hasSubNavigation && (
                <ReactSVG
                    src={subcategoriesImg}
                    className={styles.side__nav__menu__item__more}
                    onClick={() => showSubItems(item)}
                />
            )}
        </li>
    );
};

export default NavItem;
