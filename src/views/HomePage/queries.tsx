import { gql } from "@apollo/client";

export const GET_PRODUCTS_AND_CATEGORIES = gql`
    query ProductsList {
        shop {
            description
            name
        }
        categories(level: 0, first: 4) {
            edges {
                node {
                    id
                    name
                    slug
                    backgroundImage {
                        url
                    }
                }
            }
        }
    }
`;
