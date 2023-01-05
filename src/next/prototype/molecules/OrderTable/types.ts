import { OrdersByUser_me_orders_edges_node } from "@mzawadie/sdk/lib/src/queries/gqlTypes/OrdersByUser";

export interface IOrderTableProps {
    orders: OrdersByUser_me_orders_edges_node[];
    isGuest: boolean;
}
