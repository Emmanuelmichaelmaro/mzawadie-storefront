// @ts-nocheck
import {
    getDBIdFromGraphqlId,
    incrementalStaticRegenerationRevalidate,
    staticPathsFallback,
    staticPathsFetchBatch,
} from "@mzawadie/core";
import { exhaustList, getFeaturedProducts, getMzawadieApi, getShopAttributes } from "@mzawadie/ui-kit/utils/ssr";
import { GetStaticPaths, GetStaticProps } from "next";

import { CollectionView, CollectionViewProps } from "../../apps/Collection";

export default CollectionView;

export const getStaticPaths: GetStaticPaths<CollectionViewProps["params"]> = async () => {
    const { api } = await getMzawadieApi();
    const { data } = await exhaustList(
        api.collections.getList({
            first: staticPathsFetchBatch,
        })
    );

    const paths = data.map(({ id, slug }) => ({
        params: { slug: [slug, `${getDBIdFromGraphqlId(id, "Collection")}`] },
    }));

    return { paths, fallback: staticPathsFallback };
};

export const getStaticProps: GetStaticProps<CollectionViewProps, CollectionViewProps["params"]> = async ({ params }) => {
    let data = null;
    const { api } = await getMzawadieApi();
    const { data: details } = await api.collections.getDetails({ slug: params?.slug[0] });

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
            params,
        },
    };
};
