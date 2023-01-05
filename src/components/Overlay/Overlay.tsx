// @ts-nocheck
import classNames from "classnames";
import * as React from "react";

import { OverlayContextInterface } from "./context";
import styles from "./scss/index.module.scss";

interface OverlayProps {
    context: OverlayContextInterface;
    className?: string;
    /**
     * Unique name used as selector for writing e2e tests in Cypress
     * Unique name used as selector for writing e2e tests in Cypress
     */
    testingContext: string;
}

const Overlay: React.FC<OverlayProps> = ({ children, className, context: { type, theme, hide }, testingContext }) => (
    <div
        className={classNames([styles.overlay], {
            [styles[`overlay__${type}`]]: !!type,
            [className]: !!className,
        })}
        data-test={testingContext}
        onClick={hide}
    >
        <div className={styles[`overlay__${theme}`]} onClick={(e) => e.stopPropagation()}>
            {children}
        </div>
    </div>
);

export default Overlay;
