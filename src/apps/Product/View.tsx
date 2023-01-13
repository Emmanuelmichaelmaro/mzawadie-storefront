// @ts-nocheck
import { channelSlug, getGraphqlIdFromDBId, maybe } from "@mzawadie/core";
import { useCart } from "@mzawadie/sdk/lib/src";
import { Loader, OfflinePlaceholder } from "@mzawadie/ui-kit/atoms";
import { isEmpty } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import queryString from "query-string";
import React, { useEffect, useState } from "react";

import { MetaWrapper, NetworkStatus, NotFound } from "../../components";
import Page from "./Page";
import { ProductDetails_product } from "./gqlTypes/ProductDetails";
import { TypedProductDetailsQuery } from "./queries";
import "./scss/index.module.scss";
import { IProps } from "./types";

const canDisplay = (product: ProductDetails_product) =>
    maybe(() => !!product.description && !!product.name && !!product.pricing && !!product.variants);

const extractMeta = (product: ProductDetails_product, url: string) => ({
    custom: [
        {
            content: product.pricing?.priceRange?.start?.gross.amount.toString(),
            property: "product:price:amount",
        },
        {
            content: product.pricing?.priceRange?.start?.gross.currency,
            property: "product:price:currency",
        },
        {
            content: product.isAvailable ? "in stock" : "out off stock",
            property: "product:isAvailable",
        },
        {
            content: product.category?.name,
            property: "product:category",
        },
    ],
    description: product.seoDescription || product.description,
    image: product?.thumbnail?.url || null,
    title: product.seoTitle || product.name,
    type: "product.item",
    url: window.location.href,
});

const PageWithQueryAttributes: React.FC<IProps> = (props) => {
    const { product } = props;

    const { pathname, push, query, replace, asPath } = useRouter();

    const onAttributeChangeHandler = (slug: string | null, value: string) => {
        const newAsPath = queryString.stringifyUrl({ query: { [slug]: value }, url: asPath }, { skipNull: true });
        push({ pathname, query }, newAsPath, { shallow: true });
    };

    const [queryAttributes, setQueryAttributes] = useState({});

    useEffect(() => {
        if (!isEmpty(query)) {
            const queryAttributes: Record<string, string> = {};

            product.variants?.forEach(({ attributes }) => {
                attributes.forEach(({ attribute, values }) => {
                    const selectedAttributeValue = query[attribute.slug];

                    if (selectedAttributeValue && values[0].value === selectedAttributeValue) {
                        if (
                            isEmpty(queryAttributes) ||
                            !attributes.filter(
                                ({ attribute: { id }, values }) =>
                                    queryAttributes[id] && queryAttributes[id] !== values[0].value
                            ).length
                        ) {
                            queryAttributes[attribute.id] = selectedAttributeValue;
                        }
                    }
                });
            });

            setQueryAttributes(queryAttributes);
        }
    }, [product.variants?.length]);

    useEffect(() => {
        const { url } = queryString.parseUrl(asPath);
        replace({ pathname, query }, url);
    }, [queryAttributes]);

    return <Page {...props} queryAttributes={queryAttributes} onAttributeChangeHandler={onAttributeChangeHandler} />;
};

export type ViewProps = {
    query: { slug: string; id: string };
};

const View: NextPage<ViewProps> = ({ query: { id } }) => {
    const { addItem, items } = useCart();

    const { asPath } = useRouter();

    return (
        <TypedProductDetailsQuery
            loaderFull
            variables={{
                channel: channelSlug,
                id: getGraphqlIdFromDBId(id, "Product"),
            }}
            errorPolicy="all"
            key={id}
        >
            {({ data, loading }) => (
                <NetworkStatus>
                    {(isOnline) => {
                        const { product } = data;

                        if (canDisplay(product)) {
                            return (
                                <MetaWrapper meta={extractMeta(product, queryString.parseUrl(asPath).url)}>
                                    <PageWithQueryAttributes product={product} add={addItem} items={items} />
                                </MetaWrapper>
                            );
                        }

                        if (loading) {
                            return <Loader />;
                        }

                        if (product === null) {
                            return <NotFound />;
                        }

                        if (!isOnline) {
                            return <OfflinePlaceholder />;
                        }
                    }}
                </NetworkStatus>
            )}
        </TypedProductDetailsQuery>
    );
};

export default View;