// @ts-nocheck
import {
    incrementalStaticRegenerationRevalidate,
    staticPathsFallback,
    staticPathsFetchBatch,
} from "@mzawadie/core";
import { exhaustList, getFeaturedProducts, getMzawadieApi, getShopAttributes } from "@next/utils/ssr";
import { GetStaticPaths, GetStaticProps } from "next";

import { CollectionView, CollectionViewProps } from "../../views/Collection";

export default CollectionView;

export const getStaticPaths: GetStaticPaths<CollectionViewProps["params"]> = async () => {
    const { api } = await getMzawadieApi();
    const { data } = await exhaustList(
        api.collections.getList({
            first: staticPathsFetchBatch,
        })
    );

    const paths = data.map(({ slug }) => ({
        params: { slug },
    }));

    return { paths, fallback: staticPathsFallback };
};

export const getStaticProps: GetStaticProps<CollectionViewProps, CollectionViewProps["params"]> =
    async ({ params: { slug } }) => {
        let data = null;
        const { api } = await getMzawadieApi();
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
                params: { slug },
            },
        };
    };
