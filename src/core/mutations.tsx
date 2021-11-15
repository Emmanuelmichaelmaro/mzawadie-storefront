// @ts-nocheck
import { ApolloError, DocumentNode, MutationResult, MutationUpdaterFn } from "@apollo/client";
import { Mutation } from "@apollo/client/react/components";
import { MutationFn } from "@mzawadie/sdk/lib/react/useMutation";
import React from "react";

export interface TypedMutationInnerProps<TData, TVariables> {
    children: (
        mutateFn: MutationFn<TData, TVariables>,
        result: MutationResult<TData>
    ) => React.ReactNode;
    onCompleted?: (data: TData) => void;
    onError?: (error: ApolloError) => void;
    variables?: TVariables;
}

export function TypedMutation<TData, TVariables>(
    mutation: DocumentNode,
    update?: MutationUpdaterFn<TData>
) {
    // eslint-disable-next-line react/display-name
    return (props: TypedMutationInnerProps<TData, TVariables>) => {
        const { children, onCompleted, onError, variables } = props as JSX.LibraryManagedAttributes<
            typeof TypedMutation,
            typeof props
        >;
        return (
            <Mutation
                mutation={mutation}
                onCompleted={onCompleted}
                onError={onError}
                variables={variables}
                update={update}
            >
                {children}
            </Mutation>
        );
    };
}
