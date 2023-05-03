// @ts-nocheck
import { convertToAttributeScalar, channelSlug, PRODUCTS_PER_PAGE, convertSortByFromString } from "@mzawadie/core";
import { IFilters } from "@next/types";
import { ProductListVariables, ProductList } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";
import { productList } from "@saleor/sdk/lib/queries/products";
import { RequireOnlyOne } from "@saleor/sdk/lib/tsHelpers";
import { useTypedQuery } from "src/next/queries";

export const useProductsQuery = (
    filters: IFilters,
    ids: RequireOnlyOne<{
        categoryId: string | undefined;
        collectionId: string | undefined;
    }>
) => {
    const { categoryId, collectionId } = ids;

    const variables: ProductListVariables = {
        filter: {
            price: {
                lte: filters.priceLte,
                gte: filters.priceGte,
            },
            collections: collectionId ? [collectionId] : [],
            categories: categoryId ? [categoryId] : [],
            attributes: filters.attributes ? convertToAttributeScalar(filters.attributes) : [],
        },
        channel: channelSlug,
        first: PRODUCTS_PER_PAGE,
        sortBy: convertSortByFromString(filters.sortBy),
    };

    return useTypedQuery<ProductList, ProductListVariables>(productList, {
        variables,
        fetchPolicy: "cache-and-network",
        skip: !(categoryId || collectionId),
    });
};
