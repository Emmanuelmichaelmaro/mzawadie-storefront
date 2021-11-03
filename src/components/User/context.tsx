import React from "react";
import { ApolloError } from "@apollo/client";

interface UserInterface {
    email: string;
}

export interface UserContextInterface {
    loading: boolean;
    errors: ApolloError[] | null;
    token: string | null;
    user: UserInterface | null;
    authenticate(token: string): void;
    logout(): void;
    login(email: string, password: string): void;
}

/* tslint:disable:no-empty */
export const UserContext = React.createContext<UserContextInterface>({
    authenticate: token => {},
    errors: null,
    loading: false,
    login: (email, password) => {},
    logout: () => {},
    token: null,
    user: null
});
/* tslint:enable:no-empty */
