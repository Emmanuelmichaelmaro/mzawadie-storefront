import { IAddress, IFormError } from "@next/types";

export interface ICheckoutReviewProps {
    shippingAddress?: IAddress | null;
    billingAddress?: IAddress | null;
    shippingMethodName?: string;
    paymentMethodName?: string;
    email?: string;
    errors?: IFormError[];
}
