// @ts-nocheck
import { gql } from "@apollo/client";
import {
    channelSlug,
    convertSortByFromString,
    convertToAttributeScalar,
    PRODUCTS_PER_PAGE,
    RequireOnlyOne,
    TypedQuery,
} from "@mzawadie/core";
import { ProductList, ProductListVariables } from "@mzawadie/sdk/lib/src/queries/gqlTypes/ProductList";
import { productList } from "@mzawadie/sdk/lib/src/queries/products";
import { IFilters } from "@next/types";

import { useTypedQuery } from "../../next/queries";
import { ProductDetails, ProductDetailsVariables } from "./gqlTypes/ProductDetails";
import { VariantList, VariantListVariables } from "./gqlTypes/VariantList";

export const priceFragment = gql`
    fragment Price on Money {
        amount
        currency
    }
`;

export const taxedPriceFragment = gql`
    fragment Price on TaxedMoney {
        gross {
            amount
            currency
        }
        net {
            amount
            currency
        }
    }
`;

export const basicProductFragment = gql`
    fragment BasicProductFields on Product {
        id
        name
        slug
        thumbnail {
            url
            alt
        }
        thumbnail2x: thumbnail(size: 510) {
            url
        }
    }
`;

export const productPricingFragment = gql`
    ${taxedPriceFragment}
    fragment ProductPricingField on Product {
        pricing {
            onSale
            priceRangeUndiscounted {
                start {
                    ...Price
                }
                stop {
                    ...Price
                }
            }
            priceRange {
                start {
                    ...Price
                }
                stop {
                    ...Price
                }
            }
        }
    }
`;

export const selectedAttributeFragment = gql`
    fragment SelectedAttributeFields on SelectedAttribute {
        attribute {
            id
            name
        }
        values {
            id
            name
        }
    }
`;

export const productVariantFragment = gql`
    ${taxedPriceFragment}
    fragment ProductVariantFields on ProductVariant {
        id
        sku
        name
        quantityAvailable(countryCode: $countryCode)
        images {
            id
            url
            alt
        }
        pricing {
            onSale
            priceUndiscounted {
                ...Price
            }
            price {
                ...Price
            }
        }
        attributes(variantSelection: VARIANT_SELECTION) {
            attribute {
                id
                name
                slug
            }
            values {
                id
                name
                value: name
            }
        }
    }
`;

export const productDetailsQuery = gql`
    ${basicProductFragment}
    ${selectedAttributeFragment}
    ${productVariantFragment}
    ${productPricingFragment}
    query ProductDetails($id: ID!, $channel: String, $countryCode: CountryCode) {
        product(id: $id, channel: $channel) {
            ...BasicProductFields
            ...ProductPricingField
            description
            category {
                id
                name
                products(first: 3, channel: $channel) {
                    edges {
                        node {
                            ...BasicProductFields
                            ...ProductPricingField
                        }
                    }
                }
            }
            images {
                id
                alt
                url
            }
            attributes {
                ...SelectedAttributeFields
            }
            variants {
                ...ProductVariantFields
            }
            seoDescription
            seoTitle
            isAvailable
            isAvailableForPurchase
            availableForPurchase
        }
    }
`;

// FIXME: Check how to handle pagination of `productVariants` in the UI.
// We need allow the user view  all cart items regardless of pagination.
export const productVariantsQuery = gql`
    ${basicProductFragment}
    ${productVariantFragment}
    query VariantList($ids: [ID!], $channel: String, $countryCode: CountryCode) {
        productVariants(ids: $ids, first: 100, channel: $channel) {
            edges {
                node {
                    ...ProductVariantFields
                    product {
                        ...BasicProductFields
                    }
                }
            }
        }
    }
`;

export const TypedProductDetailsQuery = TypedQuery<ProductDetails, ProductDetailsVariables>(productDetailsQuery);

export const TypedProductVariantsQuery = TypedQuery<VariantList, VariantListVariables>(productVariantsQuery);

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
            channel: channelSlug,
            attributes: filters.attributes ? convertToAttributeScalar(filters.attributes) : {},
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
