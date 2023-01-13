import { gql } from "@apollo/client";
import { basicProductFragment, productPricingFragment } from "@mzawadie/apps/Product/queries";

export const featuredProductFragment = gql`
    ${basicProductFragment}
    ${productPricingFragment}
    fragment FeaturedProduct on Product {
        ...BasicProductFields
        ...ProductPricingField
        category {
            id
            name
        }
    }
`;

export const featuredProductsFragment = gql`
    ${featuredProductFragment}
    fragment FeaturedProducts on Query {
        collection(slug: "featured-products", channel: $channel) {
            id
            name
            backgroundImage {
                url
            }
            products(first: 20) {
                edges {
                    node {
                        ...FeaturedProduct
                    }
                }
            }
        }
    }
`;

export const attributeFragment = gql`
    fragment Attribute on Attribute {
        id
        name
        slug
        choices {
            edges {
                node {
                    id
                    name
                    slug
                }
            }
        }
    }
`;

export const menuItemFragment = gql`
    fragment MenuItem on MenuItem {
        id
        name
        category {
            id
            name
            slug
        }
        url
        collection {
            id
            name
            slug
        }
        page {
            slug
        }
        parent {
            id
        }
    }
`;
