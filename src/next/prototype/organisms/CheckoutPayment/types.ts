import { IFormError } from "@next/types";
import React from "react";

export interface IPromoCodeDiscount {
    voucherCode?: string | null;
}

export interface ICheckoutPaymentProps {
    promoCodeErrors?: IFormError[];
    promoCodeDiscount?: IPromoCodeDiscount;
    promoCodeDiscountFormRef?: React.RefObject<HTMLFormElement>;
    promoCodeDiscountFormId?: string;
    addPromoCode: (promoCode: string) => void;
    removeVoucherCode: (voucherCode: string) => void;
    submitUnchangedDiscount: () => void;
}
