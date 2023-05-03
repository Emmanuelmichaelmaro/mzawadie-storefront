// @ts-nocheck
import React from "react";

import styles from "./scss/index.module.scss";

const Loader: React.FC<{ fullScreen?: boolean }> = ({ fullScreen }) => {
    const getHeight = () => {
        const headerHeight = document.getElementById("header") && document.getElementById("header").offsetHeight;
        const footerHeight = document.getElementById("footer") && document.getElementById("footer").offsetHeight;
        return window.innerHeight - headerHeight - footerHeight;
    };

    return (
        <div className={styles.loader} style={fullScreen && { height: getHeight() }}>
            <div className={styles.loader__items}>
                <span />
                <span />
                <span />
            </div>
        </div>
    );
};

export default Loader;
