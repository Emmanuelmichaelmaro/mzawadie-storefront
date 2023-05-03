/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_requestPasswordReset_errors {
    __typename: "AccountError";
    /**
     * Name of a field that caused the error. A value of `null` indicates that the error isn't associated with a particular field.
     */
    field: string | null;
    /**
     * The error message.
     */
    message: string | null;
}

export interface ResetPassword_requestPasswordReset {
    __typename: "RequestPasswordReset";
    errors: ResetPassword_requestPasswordReset_errors[];
}

export interface ResetPassword {
    /**
     * Sends an email with the account password modification link.
     */
    requestPasswordReset: ResetPassword_requestPasswordReset | null;
}

export interface ResetPasswordVariables {
    email: string;
    redirectUrl: string;
}
