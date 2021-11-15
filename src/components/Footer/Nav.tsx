// @ts-nocheck
import { ShopMenusQuery } from "@next/graphql/gqlTypes/ShopMenusQuery";
import React from "react";

import { NavLink } from "..";
import "./scss/index.module.scss";

export type NavProps = { menu: ShopMenusQuery["footer"] };

export const Nav: React.FC<NavProps> = ({ menu }) => (
    <footer className="footer-nav">
        <div className="container">
            {menu?.items.map((item) => (
                <div className="footer-nav__section" key={item.id}>
                    <h4 className="footer-nav__section-header">
                        <NavLink item={item} />
                    </h4>

                    <div className="footer-nav__section-content">
                        {item.children.map((subItem) => (
                            <p key={subItem.id}>
                                <NavLink item={subItem} />
                            </p>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </footer>
);
