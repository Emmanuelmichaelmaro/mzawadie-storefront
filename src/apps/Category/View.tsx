// @ts-nocheck
import { MetaWrapper } from "@mzawadie/components/Meta";
import NetworkStatus from "@mzawadie/components/NetworkStatus";
import NotFound from "@mzawadie/components/NotFound";
import {
    channelSlug,
    convertSortByFromString,
    convertToAttributeScalar,
    getGraphqlIdFromDBId,
    PRODUCTS_PER_PAGE,
} from "@mzawadie/core";
import { Loader, OfflinePlaceholder } from "@mzawadie/ui-kit/atoms";
import { FilterQuerySet, SORT_OPTIONS } from "@mzawadie/ui-kit/utils/collections";
import { IFilters } from "@next/types";
import { NextPage } from "next";
import React from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { Page } from "./Page";
import { TypedCategoryProductsDataQuery, TypedCategoryProductsQuery } from "./queries";

export type ViewProps = {
    query: { slug: string; id: string };
};

export const View: NextPage<ViewProps> = ({ query: { id } }) => {
    const [sort, setSort] = useQueryParam("sortBy", StringParam);

    const [attributeFilters, setAttributeFilters] = useQueryParam("filters", FilterQuerySet);

    const handleClearFilters = () => setAttributeFilters({});

    const filters: IFilters = {
        attributes: attributeFilters,
        pageSize: PRODUCTS_PER_PAGE,
        priceGte: null,
        priceLte: null,
        sortBy: sort || null,
    };

    const onFiltersChange = (name: any, value: any) => {
        if (attributeFilters && attributeFilters.hasOwnProperty(name)) {
            if (attributeFilters[name].includes(value)) {
                if (filters.attributes[`${name}`].length === 1) {
                    const att = { ...attributeFilters };
                    delete att[`${name}`];
                    setAttributeFilters({
                        ...att,
                    });
                } else {
                    setAttributeFilters({
                        ...attributeFilters,
                        [`${name}`]: attributeFilters[`${name}`].filter((item) => item !== value),
                    });
                }
            } else {
                setAttributeFilters({
                    ...attributeFilters,
                    [`${name}`]: [...attributeFilters[`${name}`], value],
                });
            }
        } else {
            setAttributeFilters({ ...attributeFilters, [`${name}`]: [value] });
        }
    };

    const handleOrderChange = (value: { value?: string; label: string }) => setSort(value.value);

    const variables = {
        ...filters,
        attributes: filters.attributes ? convertToAttributeScalar(filters.attributes) : {},
        channel: channelSlug,
        id: getGraphqlIdFromDBId(id, "Category"),
        sortBy: convertSortByFromString(filters.sortBy),
    };

    return (
        <NetworkStatus>
            {(isOnline) => (
                <TypedCategoryProductsDataQuery variables={variables} errorPolicy="all" loaderFull>
                    {(categoryData) => {
                        if (categoryData.loading) {
                            return <Loader />;
                        }

                        if (categoryData.data && categoryData.data.category === null) {
                            return <NotFound />;
                        }

                        if (!isOnline) {
                            return <OfflinePlaceholder />;
                        }

                        const canDisplayFilters =
                            !!categoryData.data?.attributes?.edges && !!categoryData.data?.category?.name;

                        return (
                            <TypedCategoryProductsQuery variables={variables}>
                                {(categoryProducts) => {
                                    if (!canDisplayFilters && categoryProducts.loading) {
                                        return <Loader />;
                                    }

                                    if (canDisplayFilters) {
                                        const handleLoadMore = () =>
                                            categoryProducts.loadMore(
                                                (prev, next) => ({
                                                    ...prev,
                                                    products: {
                                                        ...prev.products,
                                                        edges: [...prev.products.edges, ...next.products.edges],
                                                        pageInfo: next.products?.pageInfo,
                                                    },
                                                }),
                                                {
                                                    after: categoryProducts.data?.products?.pageInfo.endCursor,
                                                }
                                            );

                                        return (
                                            <MetaWrapper
                                                meta={{
                                                    description: categoryData.data?.category?.seoDescription,
                                                    title: categoryData.data?.category?.seoTitle,
                                                    type: "product.category",
                                                }}
                                            >
                                                <Page
                                                    clearFilters={handleClearFilters}
                                                    attributes={categoryData.data?.attributes?.edges.map(
                                                        (edge) => edge.node
                                                    )}
                                                    category={categoryData.data?.category}
                                                    displayLoader={categoryData.loading}
                                                    hasNextPage={categoryProducts.data?.products?.pageInfo.hasNextPage}
                                                    sortOptions={SORT_OPTIONS}
                                                    activeSortOption={filters.sortBy}
                                                    filters={filters}
                                                    products={categoryProducts.data?.products}
                                                    onAttributeFiltersChange={onFiltersChange}
                                                    onLoadMore={handleLoadMore}
                                                    activeFilters={
                                                        filters!.attributes ? Object.keys(filters!.attributes).length : 0
                                                    }
                                                    onOrder={handleOrderChange}
                                                />
                                            </MetaWrapper>
                                        );
                                    }

                                    return null;
                                }}
                            </TypedCategoryProductsQuery>
                        );
                    }}
                </TypedCategoryProductsDataQuery>
            )}
        </NetworkStatus>
    );
};

export default View;
