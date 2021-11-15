import { MenuItem } from "@next/graphql/gqlTypes/MenuItem";
import React from "react";

import { NavLink } from "..";

interface NavNestedItemProps extends MenuItem {
    children?: NavNestedItemProps[];
    hideOverlay?(): void;
}

const NavItem: React.FC<NavNestedItemProps> = ({ hideOverlay, children, ...item }) => {
    const content =
        children && children.length ? (
            <ul>
                {children.map((subItem, i) => (
                    <NavItem key={i} {...subItem} />
                ))}
            </ul>
        ) : null;

    return (
        <li>
            <NavLink item={item} onClick={hideOverlay} />
            {content}
        </li>
    );
};

export default NavItem;
