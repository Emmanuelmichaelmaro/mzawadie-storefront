import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query Categories {
    categories {
      edges {
        node {
          id
          name
          url
        }
      }
    }
  }
`;