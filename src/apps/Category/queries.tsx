import { channelSlug, convertSortByFromString, convertToAttributeScalar, PRODUCTS_PER_PAGE } from "@mzawadie/core";
import { ProductList, ProductListVariables } from "@mzawadie/sdk/lib/src/queries/gqlTypes/ProductList";
import { productList } from "@mzawadie/sdk/lib/src/queries/products";
import { RequireOnlyOne } from "@mzawadie/sdk/lib/src/tsHelpers";
import { useTypedQuery } from "@next/graphql";
import { IFilters } from "@next/types";

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
