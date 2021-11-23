import React from "react";
import { FormattedMessage } from "react-intl";
import styles from "./scss/index.module.scss"

const ForgottenPassword: React.FC<{ onClick: () => void; }> = ({ onClick }) => (
    <>
        <div className={styles.login__content__password__reminder}>
            <p>
                <FormattedMessage defaultMessage="Have you forgotten your password?" />{" "}
                <span
                    className="u-link"
                    onClick={onClick}
                    data-test="accountOverlayForgottenPasswordLink"
                >
                    <FormattedMessage defaultMessage="Click Here" />
                </span>
            </p>
        </div>
    </>
);

export default ForgottenPassword;
