// @ts-nocheck
import { channelSlug, incrementalStaticRegenerationRevalidate } from "@mzawadie/core";
import { getFeaturedProducts, getMzawadieApi } from "@next/utils/ssr";
import { GetStaticProps } from "next";

import { homePageProductsQuery, HomeView, HomeViewProps } from "../views/Home";
import { HomePageProducts } from "../views/Home/gqlTypes/HomePageProducts";

export default HomeView;

export const getStaticProps: GetStaticProps<HomeViewProps> = async () => {
    const { apolloClient } = await getMzawadieApi();

    const [data, featuredProducts] = await Promise.all([
        apolloClient
            .query<HomePageProducts>({
                query: homePageProductsQuery,
                variables: { channel: channelSlug },
            })
            .then(({ data }) => data),
        getFeaturedProducts(),
    ]);

    return {
        revalidate: incrementalStaticRegenerationRevalidate,
        props: { data: { ...data, featuredProducts } },
    };
};
