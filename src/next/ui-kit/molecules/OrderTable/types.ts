import { OrdersByUser_me_orders_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/OrdersByUser";

export interface IOrderTableProps {
    orders: OrdersByUser_me_orders_edges_node[];
    isGuest: boolean;
}
