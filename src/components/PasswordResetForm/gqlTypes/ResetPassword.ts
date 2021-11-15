/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ResetPassword
// ====================================================

export interface ResetPassword_requestPasswordReset_errors {
    __typename: "AccountError";
    field: string | null;
    message: string | null;
}

export interface ResetPassword_requestPasswordReset {
    __typename: "RequestPasswordReset";
    errors: ResetPassword_requestPasswordReset_errors[];
}

export interface ResetPassword {
    requestPasswordReset: ResetPassword_requestPasswordReset | null;
}

export interface ResetPasswordVariables {
    email: string;
    redirectUrl: string;
}
