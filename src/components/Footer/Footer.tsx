import { SOCIAL_MEDIA } from "@mzawadie/core";
import React from "react";

import { SocialMediaIcon } from "..";
import { Nav, NavProps } from "./Nav";
import styles from "./scss/index.module.scss";

type FooterProps = NavProps;

const Footer: React.FC<FooterProps> = ({ menu }) => (
    <div className="footer" id="footer">
        <div className={`${styles.footer__favicons} ${styles.container}`}>
            {SOCIAL_MEDIA.map((medium) => (
                <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
            ))}
        </div>

        <Nav menu={menu} />
    </div>
);

export default Footer;
