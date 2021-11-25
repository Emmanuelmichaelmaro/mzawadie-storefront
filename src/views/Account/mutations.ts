import { gql, useMutation } from "@apollo/client";

import { AccountConfirm, AccountConfirmVariables } from "./gqlTypes/AccountConfirm";

const accountConfirmMutation = gql`
    mutation AccountConfirm($email: String!, $token: String!) {
        confirmAccount(email: $email, token: $token) {
            errors {
                field
                message
            }
        }
    }
`;

export const useAccountConfirmMutation = (variables: AccountConfirmVariables) =>
    useMutation<AccountConfirm, AccountConfirmVariables>(accountConfirmMutation, {
        variables,
    });
