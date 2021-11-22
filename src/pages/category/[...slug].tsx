// @ts-nocheck
import {
    getDBIdFromGraphqlId,
    incrementalStaticRegenerationRevalidate,
    staticPathsFallback,
    staticPathsFetchBatch,
} from "@mzawadie/core";
import { exhaustList, getFeaturedProducts, getMzawadieApi, getShopAttributes } from "@next/utils/ssr";
import { GetStaticPaths, GetStaticProps } from "next";

import { CategoryView, CategoryViewProps } from "../../views/Category";

export default CategoryView;

export const getStaticPaths: GetStaticPaths<CategoryViewProps["params"]> = async () => {
    const { api } = await getMzawadieApi();
    const { data } = await exhaustList(
        api.categories.getList({
            first: staticPathsFetchBatch,
        })
    );

    const paths = data.map(({ id, slug }) => ({
        params: { slug: [slug, `${getDBIdFromGraphqlId(id, "Category")}`] },
    }));

    return { paths, fallback: staticPathsFallback };
};

export const getStaticProps: GetStaticProps<CategoryViewProps, CategoryViewProps["params"]> = async ({
    params,
}) => {
    let data = null;
    const { api } = await getMzawadieApi();
    const { data: details } = await api.categories.getDetails({ slug: params?.slug[0] });

    if (details) {
        const { id } = details;

        const [attributes, featuredProducts, ancestors] = await Promise.all([
            getShopAttributes({ categoryId: id }),
            getFeaturedProducts(),
            api.categories.getAncestors({ first: 5, id }).then(({ data }) => data),
        ]);

        data = {
            details,
            ancestors,
            featuredProducts,
            attributes,
            id,
        };
    }

    return {
        revalidate: incrementalStaticRegenerationRevalidate,
        props: {
            data,
            params,
        },
    };
};
