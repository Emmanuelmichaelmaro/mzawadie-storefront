import { gql } from "@apollo/client";

import { TypedQuery } from "../../core/queries";
import { productPricingFragment } from "../Product/queries";
import { SearchProducts, SearchProductsVariables } from "./gqlTypes/SearchProducts";

export const searchProductsQuery = gql`
    ${productPricingFragment}
    query SearchProducts(
        $query: String!
        $channel: String!
        $attributes: [AttributeInput]
        $pageSize: Int
        $sortBy: ProductOrder
        $after: String
    ) {
        products(
            channel: $channel
            filter: { search: $query, attributes: $attributes }
            first: $pageSize
            sortBy: $sortBy
            after: $after
        ) {
            totalCount
            edges {
                node {
                    ...ProductPricingField
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
                    category {
                        id
                        name
                    }
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
        attributes(filter: { filterableInStorefront: true }, first: 100) {
            edges {
                node {
                    id
                    name
                    slug
                    choices(first: 10) {
                        edges {
                            node {
                                id
                                name
                                slug
                            }
                        }
                    }
                }
            }
        }
    }
`;

export const TypedSearchProductsQuery = TypedQuery<SearchProducts, SearchProductsVariables>(searchProductsQuery);
