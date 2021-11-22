// @ts-nocheck
import * as React from "react";
import { ReactSVG } from "react-svg";

import styles from "./scss/index.module.scss";

interface Medium {
    ariaLabel: string;
    path: string;
    href: string;
}

export interface IconProps extends React.HTMLProps<HTMLAnchorElement> {
    medium: Medium;
    target?: string;
}

const SocialMediaIcon: React.FC<IconProps> = ({ medium, target }) => (
    <a href={medium.href} target={target || "_blank"} aria-label={medium.ariaLabel}>
        <ReactSVG src={medium.path} className={styles.social__icon} />
    </a>
);

export default SocialMediaIcon;
