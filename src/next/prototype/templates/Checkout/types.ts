import React from "react";

export interface IProps {
    loading?: boolean;
    navigation?: React.ReactNode;
    checkout?: React.ReactNode;
    paymentGateways?: React.ReactNode;
    hidePaymentGateways?: boolean;
    cartSummary?: React.ReactNode;
    button?: React.ReactNode;
}
