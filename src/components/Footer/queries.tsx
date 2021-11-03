import { gql } from "@apollo/client";

export const GET_COLLECTIONS = gql`
  query Collections {
    collections {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;