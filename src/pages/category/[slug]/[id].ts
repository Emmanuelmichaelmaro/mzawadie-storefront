// @ts-nocheck
import { CategoryView, CategoryViewProps } from "@mzawadie/apps";
import { staticPathsFetchBatch, staticPathsFallback, incrementalStaticRegenerationRevalidate } from "@mzawadie/core";
import { getSaleorApi, exhaustList, getShopAttributes, getFeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { GetStaticPaths, GetStaticProps } from "next";

export default CategoryView;

export const getStaticPaths: GetStaticPaths<CategoryViewProps["params"]> = async () => {
    const { api } = await getSaleorApi();
    const { data } = await exhaustList(
        api.categories.getList({
            first: staticPathsFetchBatch,
        })
    );

    const paths = data?.map(({ id, slug }) => ({
        params: { id, slug },
    }));

    return { paths, fallback: staticPathsFallback };
};

export const getStaticProps: GetStaticProps<CategoryViewProps, CategoryViewProps["params"]> = async ({
    params: { id, slug },
}) => {
    let data = null;
    const { api } = await getSaleorApi();
    const { data: details } = await api.categories.getDetails({ slug });

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
            params: { id, slug },
        },
    };
};
