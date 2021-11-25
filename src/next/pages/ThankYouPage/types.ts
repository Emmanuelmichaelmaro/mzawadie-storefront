import { OrderStatus } from "@mzawadie/sdk";

export type IProps = {
    query: {
        orderNumber?: string;
        token?: string;
        orderStatus?: OrderStatus;
    };
};
