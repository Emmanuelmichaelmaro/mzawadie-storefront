import { SOCIAL_MEDIA } from "@mzawadie/core";
import React from "react";

import { SocialMediaIcon } from "..";
import { Nav, NavProps } from "./Nav";
import "./scss/index.module.scss";

type FooterProps = NavProps;

const Footer: React.FC<FooterProps> = ({ menu }) => (
    <div className="footer" id="footer">
        <div className="footer__favicons container">
            {SOCIAL_MEDIA.map((medium) => (
                <SocialMediaIcon medium={medium} key={medium.ariaLabel} />
            ))}
        </div>

        <Nav menu={menu} />
    </div>
);

export default Footer;
