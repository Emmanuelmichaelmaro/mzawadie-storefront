// @ts-nocheck
import { ApolloError, DocumentNode, MutationFunction, MutationResult, MutationUpdaterFn } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import React from "react";

export interface TypedMutationInnerProps<TData, TVariables> {
    children: (mutateFn: MutationFunction<TData, TVariables>, result: MutationResult<TData>) => React.ReactNode;
    onCompleted?: (data: TData) => void;
    onError?: (error: ApolloError) => void;
    variables?: TVariables;
}

export function TypedMutation<TData, TVariables>(mutation: DocumentNode, update?: MutationUpdaterFn<TData>) {
    // eslint-disable-next-line react/display-name
    return (props: TypedMutationInnerProps<TData, TVariables>) => {
        const { children, onCompleted, onError, variables } = props;

        return (
            <Mutation mutation={mutation} onCompleted={onCompleted} onError={onError} variables={variables} update={update}>
                {children}
            </Mutation>
        );
    };
}
