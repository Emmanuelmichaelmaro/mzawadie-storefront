// @ts-nocheck
import { CollectionView, CollectionViewProps } from "@mzawadie/apps";
import { staticPathsFetchBatch, staticPathsFallback, incrementalStaticRegenerationRevalidate } from "@mzawadie/core";
import { getSaleorApi, exhaustList, getShopAttributes, getFeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { GetStaticPaths, GetStaticProps } from "next";

export default CollectionView;

export const getStaticPaths: GetStaticPaths<CollectionViewProps["params"]> = async () => {
    const { api } = await getSaleorApi();
    const { data } = await exhaustList(
        api.collections.getList({
            first: staticPathsFetchBatch,
        })
    );

    const paths = data?.map(({ id, slug }) => ({
        params: { id, slug },
    }));

    return { paths, fallback: staticPathsFallback };
};

export const getStaticProps: GetStaticProps<CollectionViewProps, CollectionViewProps["params"]> = async ({
    params: { id, slug },
}) => {
    let data = null;
    const { api } = await getSaleorApi();
    const { data: details } = await api.collections.getDetails({ slug });

    if (details) {
        const { id } = details;

        const [attributes, featuredProducts] = await Promise.all([
            getShopAttributes({ collectionId: id }),
            getFeaturedProducts(),
        ]);

        data = {
            details,
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
