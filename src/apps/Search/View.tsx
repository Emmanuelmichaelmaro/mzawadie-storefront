// @ts-nocheck
import { channelSlug, prodListHeaderCommonMsg } from "@mzawadie/core";
import { FilterQuerySet } from "@mzawadie/ui-kit/utils/collections";
import { IFilters } from "@next/types";
import { NextPage } from "next";
import * as React from "react";
import { useIntl } from "react-intl";
import { StringParam, useQueryParam } from "use-query-params";

import { NotFound, OfflinePlaceholder } from "../../components";
import NetworkStatus from "../../components/NetworkStatus";
import { PRODUCTS_PER_PAGE } from "../../core/config";
import { convertSortByFromString, convertToAttributeScalar, maybe } from "../../core/utils";
import Page from "./Page";
import { TypedSearchProductsQuery } from "./queries";

export const View: NextPage = () => {
    const [sort, setSort] = useQueryParam("sortBy", StringParam);

    const [search, setSearch] = useQueryParam("q", StringParam);

    const [attributeFilters, setAttributeFilters] = useQueryParam("filters", FilterQuerySet);

    const intl = useIntl();

    const filters: IFilters = {
        attributes: attributeFilters,
        pageSize: PRODUCTS_PER_PAGE,
        priceGte: null,
        priceLte: null,
        sortBy: sort || null,
    };

    const variables = {
        ...filters,
        attributes: filters.attributes ? convertToAttributeScalar(filters.attributes) : {},
        channel: channelSlug,
        query: search || null,
        sortBy: convertSortByFromString(filters.sortBy),
    };

    const sortOptions = [
        {
            label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsClear),
            value: null,
        },
        {
            label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPrice),
            value: "price",
        },
        {
            label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsPriceDsc),
            value: "-price",
        },
        {
            label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsName),
            value: "name",
        },
        {
            label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsNameDsc),
            value: "-name",
        },
        {
            label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAt),
            value: "updated_at",
        },
        {
            label: intl.formatMessage(prodListHeaderCommonMsg.sortOptionsUpdatedAtDsc),
            value: "-updated_at",
        },
    ];

    const clearFilters = () => {
        setAttributeFilters({});
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

    return (
        <NetworkStatus>
            {(isOnline) => (
                <TypedSearchProductsQuery variables={variables} errorPolicy="all" loaderFull>
                    {({ loading, data, loadMore }) => {
                        const canDisplayFilters = !!data?.attributes?.edges && !!data?.products?.edges;

                        if (canDisplayFilters) {
                            const handleLoadMore = () =>
                                loadMore(
                                    (prev, next) => ({
                                        ...prev,
                                        products: {
                                            ...prev.products,
                                            edges: [...prev.products.edges, ...next.products.edges],
                                            pageInfo: next.products.pageInfo,
                                        },
                                    }),
                                    { after: data.products?.pageInfo.endCursor }
                                );

                            return (
                                <Page
                                    clearFilters={clearFilters}
                                    attributes={data.attributes?.edges.map((edge) => edge.node)}
                                    displayLoader={loading}
                                    hasNextPage={maybe(() => data.products?.pageInfo.hasNextPage, false)}
                                    sortOptions={sortOptions}
                                    setSearch={setSearch}
                                    search={search}
                                    activeSortOption={filters.sortBy}
                                    filters={filters}
                                    products={data.products}
                                    onAttributeFiltersChange={onFiltersChange}
                                    onLoadMore={handleLoadMore}
                                    activeFilters={filters!.attributes ? Object.keys(filters!.attributes).length : 0}
                                    onOrder={(value) => {
                                        setSort(value.value);
                                    }}
                                />
                            );
                        }

                        if (data && data.products === null) {
                            return <NotFound />;
                        }

                        if (!isOnline) {
                            return <OfflinePlaceholder />;
                        }
                    }}
                </TypedSearchProductsQuery>
            )}
        </NetworkStatus>
    );
};

export default View;
