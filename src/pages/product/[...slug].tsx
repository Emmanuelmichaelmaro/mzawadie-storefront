// @ts-nocheck
import {
    channelSlug,
    getDBIdFromGraphqlId,
    incrementalStaticRegenerationRevalidate,
    staticPathsFallback,
    staticPathsFetchBatch,
} from "@mzawadie/core";
import { VariantAttributeScope } from "@mzawadie/sdk/lib/src";
import { exhaustList, getMzawadieApi } from "@mzawadie/ui-kit/utils/ssr";
import { GetStaticPaths, GetStaticProps } from "next";

import { ProductPage, ProductPageProps } from "../../apps/Product";

export type OptionalQuery = {
    variant?: string;
};

export default ProductPage;

export const getStaticPaths: GetStaticPaths<ProductPageProps["params"]> = async () => {
    const { api } = await getMzawadieApi();
    const { data } = await exhaustList(
        api.products.getList({
            first: staticPathsFetchBatch,
            channel: channelSlug,
        })
    );

    const paths = data.map(({ id, slug }) => ({
        params: { slug: [slug, `${getDBIdFromGraphqlId(id, "Product")}`] },
    }));

    return { paths, fallback: staticPathsFallback };
};

export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageProps["params"]> = async ({ params }) => {
    const { api } = await getMzawadieApi();
    const { data } = await api.products.getDetails({
        slug: params?.slug[0],
        channel: channelSlug,
        variantSelection: VariantAttributeScope.VARIANT_SELECTION,
    });

    return {
        revalidate: incrementalStaticRegenerationRevalidate,
        props: { data: data || null, params },
    };
};
