import { IFormError } from "@next/types";
import React from "react";

export interface IShippingMethodPrice {
    /**
     * Currency code.
     */
    currency: string;
    /**
     * Amount of money.
     */
    amount: number;
}

export interface IShippingMethod {
    /**
     * The ID of the shipping method.
     */
    id: string;
    name: string;
    price: IShippingMethodPrice | null;
}

export interface ICheckoutShippingProps {
    shippingMethods: IShippingMethod[];
    selectedShippingMethodId?: string;
    selectShippingMethod?: (shippingMethodId: string) => void;
    errors?: IFormError[];
    formId?: string;
    formRef?: React.RefObject<HTMLFormElement>;
}
