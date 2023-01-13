import { GetShop_shop_countries } from "@mzawadie/sdk/lib/src/queries/gqlTypes/GetShop";
import { IAddress, IAddressWithAddressType, IFormError } from "@next/types";
import React from "react";

export declare type Address = {
    id: string;
    address: IAddressWithAddressType;
};

export interface ICheckoutAddressProps {
    userAddresses?: Address[] | null;
    selectedUserShippingAddressId?: string;
    selectedUserBillingAddressId?: string;
    checkoutShippingAddress?: IAddress | null;
    billingAsShippingAddress?: boolean;
    checkoutBillingAddress?: IAddress | null;
    email?: string;
    countries?: Array<GetShop_shop_countries | null>;
    userId?: string;
    shippingFormRef?: React.RefObject<HTMLFormElement>;
    shippingFormId?: string;
    billingFormRef?: React.RefObject<HTMLFormElement>;
    billingFormId?: string;
    newAddressFormId?: string;
    shippingErrors?: IFormError[];
    billingErrors?: IFormError[];
    shippingAddressRequired: boolean;
    setShippingAddress: (address?: IAddress, email?: string, id?: string) => void;
    setBillingAddress: (address?: IAddress, email?: string, id?: string) => void;
    setBillingAsShippingAddress: (billingAsShippingAddress: boolean) => void;
}