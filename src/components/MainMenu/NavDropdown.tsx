import classNames from "classnames";
import React from "react";

import { NavLink, OverlayContextInterface } from "..";
import { MenuItem } from "../../next/gqlTypes/MenuItem";
import NavItem from "./NavItem";
import styles from "./scss/index.module.scss";

interface NavDropdownProps extends MenuItem {
    overlay: OverlayContextInterface;
    showDropdown: boolean;
    children?: MenuItem[];
    onShowDropdown: () => void;
    onHideDropdown: () => void;
}

export const NavDropdown: React.FC<NavDropdownProps> = (props) => {
    const { onHideDropdown, onShowDropdown, showDropdown, children } = props;
    return (
        <ul
            className={classNames({
                [styles.main__menu__nav__dropdown]: true,
                [styles.main__menu__nav__dropdown__active]: showDropdown,
            })}
            onMouseOver={onShowDropdown}
            onMouseLeave={onHideDropdown}
        >
            <li>
                <NavLink item={props} onClick={onHideDropdown} />
            </li>

            <li
                className={classNames({
                    [styles.main__menu__nav__dropdown__body]: true,
                    [styles.main__menu__nav__dropdown__body__visible]: showDropdown,
                })}
            >
                <ul>
                    {children?.map((subItem, i) => (
                        <NavItem key={i} hideOverlay={onHideDropdown} {...subItem} />
                    ))}
                </ul>
            </li>
        </ul>
    );
};
