import React from "react";
import { FormattedMessage } from "react-intl";

import { PasswordResetForm } from "..";

const ResetPasswordForm: React.FC<{
    onClick: () => void;
}> = ({ onClick }) => (
    <>
        <h3 className="checkout__header">
            <FormattedMessage defaultMessage="Registered user" />
        </h3>

        <PasswordResetForm />

        <p>
            <span className="u-link" onClick={onClick}>
                <FormattedMessage defaultMessage="Back to login" />
            </span>
        </p>
    </>
);

export default ResetPasswordForm;
