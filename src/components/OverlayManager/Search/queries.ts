import { TypedQuery } from "@mzawadie/core";
import gql from "graphql-tag";

import { SearchResults, SearchResultsVariables } from "./gqlTypes/SearchResults";

const searchResultsQuery = gql`
    query SearchResults($query: String!, $channel: String) {
        products(filter: { search: $query }, channel: $channel, first: 20) {
            edges {
                node {
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
                hasPreviousPage
                startCursor
            }
        }
    }
`;

export const TypedSearchResults = TypedQuery<SearchResults, SearchResultsVariables>(searchResultsQuery);
