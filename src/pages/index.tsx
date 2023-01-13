// @ts-nocheck
import { channelSlug, incrementalStaticRegenerationRevalidate } from "@mzawadie/core";
import { getMzawadieApi } from "@mzawadie/ui-kit/utils/ssr";
import type { GetStaticProps } from "next";
import { FeaturedProductsQuery, FeaturedProductsQueryVariables } from "src/next/gqlTypes/FeaturedProductsQuery";
import { featuredProductsQuery } from "src/next/queries";

import { homePageProductsQuery, HomeView, HomeViewProps } from "../apps/Home";
import { HomePageProducts, HomePageProductsVariables } from "../apps/Home/gqlTypes/HomePageProducts";

export default HomeView;

export const getStaticProps: GetStaticProps<HomeViewProps> = async () => {
    const { apolloClient } = await getMzawadieApi();

    const [data, featuredProducts] = await Promise.all([
        apolloClient
            .query<HomePageProducts, HomePageProductsVariables>({
                query: homePageProductsQuery,
                variables: { channel: channelSlug },
            })
            .then(({ data }) => data),
        apolloClient
            .query<FeaturedProductsQuery, FeaturedProductsQueryVariables>({
                query: featuredProductsQuery,
                variables: { channel: channelSlug },
            })
            .then(({ data: featuredProducts }) => featuredProducts),
    ]);

    return {
        revalidate: incrementalStaticRegenerationRevalidate,
        props: { data: { ...data, featuredProducts } },
    };
};
