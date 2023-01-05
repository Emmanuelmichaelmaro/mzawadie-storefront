import { incrementalStaticRegenerationRevalidate } from "@mzawadie/core";
import { getFeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { GetStaticProps } from "next";

import { SearchPage, SearchPageProps } from "../apps/Search";

export default SearchPage;

export const getStaticProps: GetStaticProps<SearchPageProps> = async () => {
    const featuredProducts = await getFeaturedProducts();

    return {
        revalidate: incrementalStaticRegenerationRevalidate,
        props: { data: featuredProducts },
    };
};
