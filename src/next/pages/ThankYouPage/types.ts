import { OrderStatus } from "@mzawadie/sdk/lib/src";

export type IProps = {
    query: {
        orderNumber?: string;
        token?: string;
        orderStatus?: OrderStatus;
    };
};
