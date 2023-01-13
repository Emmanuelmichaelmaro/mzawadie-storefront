import { paymentGatewayNames } from "@mzawadie/core";
import { IPaymentGateway } from "@next/types";

export const paymentGateways: IPaymentGateway[] = [
    {
        config: [
            {
                field: "store_customer_card",
                value: "false",
            },
        ],
        id: paymentGatewayNames.dummy,
        name: "Dummy",
    },
    {
        config: [
            {
                field: "api_key",
                value: "pk_test_6pRNASCoBOKtIshFeQd4XMUh",
            },
            {
                field: "store_customer_card",
                value: "false",
            },
        ],
        id: paymentGatewayNames.stripe,
        name: "Stripe",
    },
];

export const PROPS = {
    paymentGateways,
};
