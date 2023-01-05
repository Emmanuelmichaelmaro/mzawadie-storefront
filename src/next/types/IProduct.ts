import { ProductList_products_edges_node } from "@mzawadie/sdk/lib/src/queries/gqlTypes/ProductList";

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type IProduct = WithOptional<
    ProductList_products_edges_node,
    "slug" | "seoTitle" | "seoDescription" | "availableForPurchase" | "isAvailableForPurchase"
>;
