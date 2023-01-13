import { IAddressWithAddressType, IFormError } from "@next/types";
import React from "react";

declare type Address = {
    id: string;
    address: IAddressWithAddressType;
};

export interface IProps {
    addresses: Address[];
    selectedAddressId?: string;
    countriesOptions?: Array<{
        code: string;
        country: string;
    }>;
    userId?: string;
    formId?: string;
    formRef?: React.RefObject<HTMLFormElement>;
    newAddressFormId?: string;
    errors?: IFormError[];
    addNewModalTarget?: HTMLElement | null;
    testingContext?: string;
    onSelect: (address?: IAddressWithAddressType, id?: string) => void;
}
