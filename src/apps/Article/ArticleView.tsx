// @ts-nocheck
import { generatePageUrl } from "@mzawadie/ui-kit/utils/core";
import { FeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";
import { useMemo } from "react";

import { MetaWrapper, NotFound } from "../../components";
import { STATIC_PAGES } from "../../core/config";
import Page from "./Page";
import { Article_page } from "./gqlTypes/Article";

export interface ArticleViewProps {
    params: { slug: string };
    data: {
        article: Article_page | null;
        featuredProducts: FeaturedProducts;
    };
}

export const ArticleView: NextPage<ArticleViewProps> = ({ data }) => {
    const { pathname } = useRouter();

    const [canDisplay, headerImage] = useMemo(() => [data?.article, data?.featuredProducts?.backgroundImage.url], [data]);

    const navigation = STATIC_PAGES.map((page) => ({
        ...page,
        active: page.url === pathname,
    }));

    const getBreadcrumbs = (article: Article_page) => [
        {
            link: generatePageUrl(article.slug),
            value: article.title,
        },
    ];

    return canDisplay ? (
        <MetaWrapper
            meta={{
                description: data.article?.seoDescription,
                title: data.article?.seoTitle,
            }}
        >
            <Page
                breadcrumbs={getBreadcrumbs(data.article)}
                headerImage={headerImage}
                navigation={navigation}
                page={data.article}
            />
        </MetaWrapper>
    ) : (
        <NotFound />
    );
};
