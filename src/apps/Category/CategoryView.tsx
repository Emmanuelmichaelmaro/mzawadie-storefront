// @ts-nocheck
import { FilterQuerySet, SORT_OPTIONS } from "@mzawadie/ui-kit/utils/collections";
import { IFilters } from "@next/types";
import { NextPage } from "next";
import React, { useMemo } from "react";
import { StringParam, useQueryParam } from "use-query-params";

import { MetaWrapper, NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { useProductsQuery } from "../Product/queries";
import { CategoryData, Page } from "./Page";
import { filtersChangeHandler } from "./utils";

export type CategoryViewProps = {
    params: { id: string; slug: string } | undefined | null;
    data: ({ id: string } & CategoryData) | undefined | null;
};

export const CategoryView: NextPage<CategoryViewProps> = ({ data: category }) => {
    const [sort, setSort] = useQueryParam("sortBy", StringParam);

    const [attributeFilters, setAttributeFilters] = useQueryParam("filters", FilterQuerySet);

    const filters: IFilters = {
        attributes: attributeFilters,
        pageSize: PRODUCTS_PER_PAGE,
        priceGte: null,
        priceLte: null,
        sortBy: sort || null,
    };

    const { data, loadMore, loading } = useProductsQuery(filters, {
        categoryId: category?.id,
    });

    const [products, pageInfo, numberOfProducts] = useMemo(
        () => [data?.products?.edges.map((e) => e.node) || [], data?.products?.pageInfo, data?.products?.totalCount || 0],
        [data]
    );

    const handleClearFilters = () => setAttributeFilters({});

    const handleFiltersChange = filtersChangeHandler(filters, attributeFilters, setAttributeFilters);

    const handleOrderChange = (value: { value?: string; label: string }) => setSort(value.value);

    const handleLoadMore = () =>
        loadMore(
            (prev: any, next: any) => ({
                products: {
                    ...prev.products,
                    edges: [...prev.products.edges, ...next.products.edges],
                    pageInfo: next.products.pageInfo,
                },
            }),
            pageInfo.endCursor
        );

    return (
        <NetworkStatus>
            {(isOnline) =>
                isOnline ? (
                    category ? (
                        <MetaWrapper
                            meta={{
                                description: category.details.seoDescription,
                                title: category.details.seoTitle,
                                type: "product.category",
                            }}
                        >
                            <Page
                                category={category}
                                products={products}
                                displayLoader={loading}
                                hasNextPage={!!pageInfo?.hasNextPage}
                                numberOfProducts={numberOfProducts}
                                activeSortOption={filters.sortBy}
                                filters={filters}
                                activeFilters={Object.keys(filters?.attributes || {}).length}
                                clearFilters={handleClearFilters}
                                onAttributeFiltersChange={handleFiltersChange}
                                onLoadMore={handleLoadMore}
                                onOrder={handleOrderChange}
                                attributes={category.attributes}
                                sortOptions={SORT_OPTIONS}
                            />
                        </MetaWrapper>
                    ) : (
                        <NotFound />
                    )
                ) : (
                    <OfflinePlaceholder />
                )
            }
        </NetworkStatus>
    );
};
