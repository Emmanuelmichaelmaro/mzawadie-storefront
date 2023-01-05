// @ts-nocheck
import { apiUrl, channelSlug } from "@mzawadie/core";
import { ConnectResult, MzawadieManager } from "@mzawadie/sdk/lib/src";
import BaseList, { BaseListVariables } from "@mzawadie/sdk/lib/src/helpers/BaseList";
import { GetShop } from "@mzawadie/sdk/lib/src/queries/gqlTypes/GetShop";
import { getShop } from "@mzawadie/sdk/lib/src/queries/shop";
import { featuredProductsQuery, shopAttributesQuery, shopMenusQuery } from "@next/graphql";
import { Attribute } from "@next/graphql/gqlTypes/Attribute";
import {
    FeaturedProductsQuery,
    FeaturedProductsQuery_collection,
    FeaturedProductsQuery_collection_products_edges_node,
    FeaturedProductsQueryVariables,
} from "@next/graphql/gqlTypes/FeaturedProductsQuery";
import { ShopAttributesQuery, ShopAttributesQueryVariables } from "@next/graphql/gqlTypes/ShopAttributesQuery";
import { ShopMenusQuery, ShopMenusQueryVariables } from "@next/graphql/gqlTypes/ShopMenusQuery";
import { RequireOnlyOne } from "@mzawadie/ui-kit/utils/tsUtils";

let CONNECTION: ConnectResult | null = null;

export const getMzawadieApi = async () => {
    if (!CONNECTION) {
        const manager = new MzawadieManager(
            { apiUrl, channel: channelSlug },
            { options: { ssrMode: true, connectToDevTools: true } }
        );
        CONNECTION = await manager.connect();
    }

    return CONNECTION;
};

/**
 * Fetches all data from collection based API which extends BaseList abstraction.
 */
export const exhaustList = async <TQuery, TObject, TVariables extends BaseListVariables>(
    listApi: Promise<BaseList<TQuery, TObject, TVariables>>,
    tries = 60
): Promise<BaseList<TQuery, TObject, TVariables>> =>
    new Promise((resolve, reject) => {
        (async function fetch(listApi, triesLeft) {
            const result = await listApi;
            const { pageInfo, next } = result;

            if (!pageInfo?.hasNextPage) {
                return resolve(result);
            }

            if (!triesLeft) {
                return reject(new Error("Max tries exceeded"));
            }

            await next();

            await fetch(listApi, --triesLeft);
        })(listApi, tries);
    });

export type FeaturedProducts = {
    products: FeaturedProductsQuery_collection_products_edges_node[];
} & Partial<Pick<FeaturedProductsQuery_collection, "name" | "backgroundImage">>;

export const getFeaturedProducts = async (): Promise<FeaturedProducts> => {
    const { apolloClient } = await getMzawadieApi();

    const { data } = await apolloClient.query<FeaturedProductsQuery, FeaturedProductsQueryVariables>({
        query: featuredProductsQuery,
        variables: { channel: channelSlug },
    });

    return {
        ...data.collection,
        products: data.collection?.products?.edges.map((e: { node: any }) => e.node) || [],
    };
};

export const getShopAttributes = async ({
    categoryId = null,
    collectionId = null,
}: RequireOnlyOne<{
    categoryId: string | null;
    collectionId: string | null;
}>): Promise<Attribute[]> => {
    const { apolloClient } = await getMzawadieApi();

    const { data } = await apolloClient.query<ShopAttributesQuery, ShopAttributesQueryVariables>({
        query: shopAttributesQuery,
        variables: {
            categoryId,
            collectionId,
            channel: channelSlug,
        },
    });

    return data?.attributes?.edges.map((e: { node: any }) => e.node) || [];
};

export const getShopMenus = async (): Promise<ShopMenusQuery> => {
    const { apolloClient } = await getMzawadieApi();

    const { data } = await apolloClient.query<ShopMenusQuery, ShopMenusQueryVariables>({
        query: shopMenusQuery,
        variables: {
            channel: channelSlug,
            footerSlug: "footer",
            mainMenuSlug: "navbar",
            locale: "EN",
        },
    });

    return data;
};

export type ShopConfig = ShopMenusQuery & { shopConfig: GetShop["shop"] };

export const getShopConfig = async (): Promise<any> => {
    const { apolloClient } = await getMzawadieApi();

    const [{ footer, mainMenu }, shopConfig] = await Promise.all([
        apolloClient
            .query<ShopMenusQuery, ShopMenusQueryVariables>({
                query: shopMenusQuery,
                variables: {
                    channel: channelSlug,
                    footerSlug: "footer",
                    mainMenuSlug: "navbar",
                    locale: "EN",
                },
            })
            .then(({ data }) => data),

        apolloClient
            .query<GetShop>({
                query: getShop,
            })
            .then(({ data }) => data?.shop),
    ]);

    return { footer, mainMenu, shopConfig };
};
