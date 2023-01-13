import { gql } from "@apollo/client";
import { TypedQuery } from "@mzawadie/core/queries";

import { Article, ArticleVariables } from "./gqlTypes/Article";

export const articleQuery = gql`
    query Article($slug: String!, $channel: String) {
        page(slug: $slug) {
            contentJson
            id
            seoDescription
            seoTitle
            slug
            title
        }
        collection(slug: "featured-products", channel: $channel) {
            id
            backgroundImage {
                url
            }
        }
    }
`;

export const articlesQuery = gql`
    query Articles {
        pages(first: 50) {
            edges {
                node {
                    id
                    slug
                }
            }
        }
    }
`;

export const TypedArticleQuery = TypedQuery<Article, ArticleVariables>(articleQuery);
