import { incrementalStaticRegenerationRevalidate } from "@mzawadie/core";
import { getFeaturedProducts } from "@next/utils/ssr";
import { GetStaticProps } from "next";

import { SearchPage, SearchPageProps } from "../views/Search";

export default SearchPage;

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
    const featuredProducts = await getFeaturedProducts();

    return {
        revalidate: incrementalStaticRegenerationRevalidate,
        props: { data: featuredProducts },
    };
};
