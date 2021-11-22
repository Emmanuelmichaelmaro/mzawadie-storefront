import * as React from "react";

import styles from "./scss/index.module.scss";

type ButtonType = "submit" | "reset" | "button";

export interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
    secondary?: boolean;
    btnRef?: React.RefObject<HTMLButtonElement>;
    /**
     * Used as marker for writing e2e tests
     */
    testingContext: string;
}

const Button: React.FC<ButtonProps> = ({
    className = "",
    children,
    testingContext,
    secondary,
    btnRef,
    type,
    ...otherProps
}) => (
    <button
        data-test={testingContext}
        className={`${styles.button} ${secondary ? [styles.secondary] : ""} ${className}`}
        ref={btnRef}
        type={type as ButtonType}
        {...otherProps}
    >
        <span>{children}</span>
    </button>
);

export default Button;
