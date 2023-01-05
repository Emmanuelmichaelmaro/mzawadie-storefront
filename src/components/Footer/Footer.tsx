import * as React from "react";

import { SocialMediaIcon } from "..";
import { SOCIAL_MEDIA } from "../../core/config";
import { Nav, NavProps } from "./Nav";
import styles from "./scss/index.module.scss";

type FooterProps = NavProps;

export const Footer: React.FC<FooterProps> = ({ menu }) => (
    <div className={`container ${styles.footer}`} id="footer">
        <div className={styles.footer__favicons}>
            {SOCIAL_MEDIA.map((medium) => (
                <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
            ))}
        </div>
        <Nav menu={menu} />
    </div>
);
