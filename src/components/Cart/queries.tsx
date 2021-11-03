import { gql } from "@apollo/client";

// TODO: we don't have productVariants query definition yet, for now use only one
// https://github.com/mirumee/saleor/issues/2741
export const GET_VARIANTS = gql`
    query VariantList($id: ID!) {
        productVariant(id: $id) {
            id
            stockQuantity
            name
            price {
                currency
                amount
            }
            product {
                id
                name
                thumbnailUrl
            }
        }
    }
`;
