// @ts-nocheck
import { ArticleView, ArticleViewProps } from "@mzawadie/apps/Article";
import { Article, ArticleVariables } from "@mzawadie/apps/Article/gqlTypes/Article";
import { Pages } from "@mzawadie/apps/Article/gqlTypes/Pages";
import { articleQuery, pagesQuery } from "@mzawadie/apps/Article/queries";
import { staticPathsFallback, incrementalStaticRegenerationRevalidate } from "@mzawadie/core";
import { getSaleorApi, getFeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { GetStaticPaths, GetStaticProps } from "next";

export default ArticleView;

export const getStaticPaths: GetStaticPaths<any> = async () => {
    const { apolloClient } = await getSaleorApi();

    const { data } = await apolloClient.query<Pages>({ query: pagesQuery });

    const paths = data.pages.edges.map(({ node }) => ({
        params: { id: node.id, slug: node.slug },
    }));

    return { paths, fallback: staticPathsFallback };
};

export const getStaticProps: GetStaticProps<ArticleViewProps, ArticleViewProps["params"]> = async ({
    params: { id, slug },
}) => {
    const { apolloClient } = await getSaleorApi();

    const [featuredProducts, article] = await Promise.all([
        getFeaturedProducts(),
        apolloClient
            .query<Article, ArticleVariables>({
                query: articleQuery,
                variables: { slug },
            })
            .then(({ data }) => data.page),
    ]);

    return {
        revalidate: incrementalStaticRegenerationRevalidate,
        props: {
            data: { article, featuredProducts },
            params: { id, slug },
        },
    };
};
