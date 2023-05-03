// @ts-nocheck
import { ProductPage, ProductPageProps } from "@mzawadie/apps";
import {
    staticPathsFetchBatch,
    channelSlug,
    staticPathsFallback,
    incrementalStaticRegenerationRevalidate,
} from "@mzawadie/core";
import { getSaleorApi, exhaustList } from "@mzawadie/ui-kit/utils/ssr";
import { VariantAttributeScope } from "@saleor/sdk";
import { GetStaticPaths, GetStaticProps } from "next";

export default ProductPage;

export const getStaticPaths: GetStaticPaths<ProductPageProps["params"]> = async () => {
    const { api } = await getSaleorApi();
    const { data } = await exhaustList(
        api.products.getList({
            first: staticPathsFetchBatch,
            channel: channelSlug,
        })
    );

    const paths = data?.map(({ id, slug }) => ({
        params: { id, slug },
    }));

    return { paths, fallback: staticPathsFallback };
};

export const getStaticProps: GetStaticProps<ProductPageProps, ProductPageProps["params"]> = async ({ params }) => {
    const { api } = await getSaleorApi();
    const { data } = await api.products.getDetails({
        slug: params?.slug,
        channel: channelSlug,
        variantSelection: VariantAttributeScope.VARIANT_SELECTION,
    });

    console.log(data);

    return {
        revalidate: incrementalStaticRegenerationRevalidate,
        props: { data: data || null, params },
    };
};
