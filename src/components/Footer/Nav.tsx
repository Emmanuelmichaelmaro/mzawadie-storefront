// @ts-nocheck
import { ShopMenusQuery } from "@next/graphql/gqlTypes/ShopMenusQuery";
import React from "react";

import { NavLink } from "..";
import styles from "./scss/index.module.scss";

export type NavProps = { menu: ShopMenusQuery["footer"] };

export const Nav: React.FC<NavProps> = ({ menu }) => (
    <footer className={styles.footer__nav}>
        <div className={`${styles.container} container`}>
            {menu?.items.map((item) => (
                <div className={styles.footer__nav__section} key={item.id}>
                    <h4 className={styles.footer__nav__section__header}>
                        <NavLink item={item} />
                    </h4>

                    <div className={styles.footer__nav__section__content}>
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
