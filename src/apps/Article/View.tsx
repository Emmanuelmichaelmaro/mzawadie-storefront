// @ts-nocheck
import { channelSlug, STATIC_PAGES } from "@mzawadie/core";
import { FeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { NextPage } from "next";
import { useRouter } from "next/router";
import * as React from "react";

import { MetaWrapper, NotFound } from "../../components";
import { generatePageUrl, maybe } from "../../core/utils";
import Page from "./Page";
import { Article_collection, Article_page } from "./gqlTypes/Article";
import { TypedArticleQuery } from "./queries";

const canDisplay = (page: any) => maybe(() => !!page && !!page.title && !!page.contentJson);

const getHeaderImage = (collection: Article_collection) => maybe(() => collection?.backgroundImage?.url);

export type ViewProps = { query: { slug: string } };

export const View: NextPage<ViewProps> = ({ query: { slug } }) => {
    const { pathname } = useRouter();

    const getBreadcrumbs = (page: Article_page) => [
        {
            link: generatePageUrl(page.slug),
            value: page.title,
        },
    ];

    return (
        <TypedArticleQuery loaderFull variables={{ slug, channel: channelSlug }} errorPolicy="all">
            {({ data }) => {
                const navigation = STATIC_PAGES.map((page) => ({
                    ...page,
                    active: page.url === pathname,
                }));

                const { page, collection } = data;

                if (canDisplay(page)) {
                    return (
                        <MetaWrapper
                            meta={{
                                description: page.seoDescription,
                                title: page.seoTitle,
                            }}
                        >
                            <Page
                                breadcrumbs={getBreadcrumbs(page)}
                                headerImage={getHeaderImage(collection)}
                                navigation={navigation}
                                page={data?.page}
                            />
                        </MetaWrapper>
                    );
                }

                if (page === null) {
                    return <NotFound />;
                }
            }}
        </TypedArticleQuery>
    );
};

export default View;
