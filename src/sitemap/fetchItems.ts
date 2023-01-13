import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import { generateCategoryUrl, generateCollectionUrl, generateProductUrl } from "../core/utils";
import { getCategoriesQuery, getCollectionsQuery, getProductsQuery } from "./queries";

const API_URL = process.env.NEXT_PUBLIC_API_URI || "/graphql/";

const DEFAULT_CHANNEL = process.env.NEXT_PUBLIC_SALEOR_CHANNEL_SLUG || "default-channel";

const fetchItems = async ({ query, perPage = 100 }: any, callback: any) => {
    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: createHttpLink({ uri: API_URL, fetch }),
    });

    const next = async (cursor = null) => {
        const response = await client.query({
            query,
            variables: { perPage, cursor, channel: DEFAULT_CHANNEL },
        });

        const data = response.data[query.definitions[0].selectionSet.selections[0].name.value];

        data.edges.map(({ node }: any) => callback(node));

        if (data.pageInfo.hasNextPage) {
            await next(data.pageInfo.endCursor);
        }
    };

    await next();
};

export const getCategories = async (callback: any) => {
    await fetchItems({ query: getCategoriesQuery }, ({ id, name }: any) => {
        callback({ url: generateCategoryUrl(id, name) });
    });
};

export const getCollections = async (callback: any) => {
    await fetchItems({ query: getCollectionsQuery }, ({ id, name }: any) => {
        callback({ url: generateCollectionUrl(id, name) });
    });
};

export const getProducts = async (callback: any) => {
    await fetchItems({ query: getProductsQuery }, ({ id, name }: any) => {
        callback({ url: generateProductUrl(id, name) });
    });
};
