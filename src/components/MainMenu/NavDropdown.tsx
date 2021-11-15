import { MenuItem } from "@next/graphql/gqlTypes/MenuItem";
import classNames from "classnames";
import React from "react";

import { NavLink, OverlayContextInterface } from "..";
import NavItem from "./NavItem";
import "./scss/index.module.scss";

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
                "main-menu__nav-dropdown": true,
                "main-menu__nav-dropdown--active": showDropdown,
            })}
            onMouseOver={onShowDropdown}
            onMouseLeave={onHideDropdown}
        >
            <li>
                <NavLink item={props} onClick={onHideDropdown} />
            </li>

            <li
                className={classNames({
                    "main-menu__nav-dropdown__body": true,
                    "main-menu__nav-dropdown__body--visible": showDropdown,
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
