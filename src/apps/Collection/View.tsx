// @ts-nocheck
import { maybe } from "@apollo/client/utilities";
import Loader from "@mzawadie/components/Loader";
import { MetaWrapper } from "@mzawadie/components/Meta";
import NetworkStatus from "@mzawadie/components/NetworkStatus";
import NotFound from "@mzawadie/components/NotFound";
import {
    PRODUCTS_PER_PAGE,
    convertToAttributeScalar,
    getGraphqlIdFromDBId,
    convertSortByFromString,
    channelSlug,
    prodListHeaderCommonMsg,
} from "@mzawadie/core";
import { OfflinePlaceholder } from "@mzawadie/ui-kit/atoms";
import { FilterQuerySet } from "@mzawadie/ui-kit/utils/collections";
import { IFilters } from "@next/types";
import { NextPage } from "next";
import { useIntl } from "react-intl";
import { useQueryParam, StringParam } from "use-query-params";

import { Page } from "./Page";
import { TypedCollectionProductsDataQuery, TypedCollectionProductsQuery } from "./queries";

export type ViewProps = {
    query: { slug: string; id: string };
};

export const View: NextPage<ViewProps> = ({ query: { id } }) => {
    const [sort, setSort] = useQueryParam("sortBy", StringParam);

    const [attributeFilters, setAttributeFilters] = useQueryParam("filters", FilterQuerySet);

    const intl = useIntl();

    const handleClearFilters = () => setAttributeFilters({});

    const handleOrderChange = (value: { value?: string; label: string }) => setSort(value.value);

    const onFiltersChange = (name, value) => {
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
        id: getGraphqlIdFromDBId(id, "Collection"),
        sortBy: convertSortByFromString(filters.sortBy),
        channel: channelSlug,
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

    return (
        <NetworkStatus>
            {(isOnline) => (
                <TypedCollectionProductsDataQuery variables={variables} errorPolicy="all" loaderFull>
                    {(collectionData: any) => {
                        if (collectionData.loading) {
                            return <Loader />;
                        }

                        if (collectionData.data && collectionData.data.collection === null) {
                            return <NotFound />;
                        }

                        if (!isOnline) {
                            return <OfflinePlaceholder />;
                        }

                        const canDisplayFilters =
                            !!collectionData.data?.attributes?.edges && !!collectionData.data?.collection?.name;

                        return (
                            <TypedCollectionProductsQuery variables={variables}>
                                {(collectionProductsData: any) => {
                                    if (!canDisplayFilters && collectionProductsData.loading) {
                                        return <Loader />;
                                    }

                                    if (canDisplayFilters) {
                                        const handleLoadMore = () =>
                                            collectionProductsData.loadMore(
                                                (prev, next) => ({
                                                    collection: {
                                                        ...prev.collection,
                                                        products: {
                                                            ...prev.collection.products,
                                                            edges: [
                                                                ...prev.collection.products.edges,
                                                                ...next.collection.products.edges,
                                                            ],
                                                            pageInfo: next.collection.products.pageInfo,
                                                        },
                                                    },
                                                }),
                                                {
                                                    after: collectionProductsData.data.collection.products.pageInfo
                                                        .endCursor,
                                                }
                                            );

                                        return (
                                            <MetaWrapper
                                                meta={{
                                                    description: collectionData.data.collection.seoDescription,
                                                    title: collectionData.data.collection.seoTitle,
                                                    type: "product.collection",
                                                }}
                                            >
                                                <Page
                                                    clearFilters={handleClearFilters}
                                                    attributes={collectionData.data.attributes.edges.map(
                                                        (edge) => edge.node
                                                    )}
                                                    collection={collectionData.data.collection}
                                                    displayLoader={collectionData.loading}
                                                    hasNextPage={maybe(
                                                        () =>
                                                            collectionProductsData.data.collection.products.pageInfo
                                                                .hasNextPage,
                                                        false
                                                    )}
                                                    sortOptions={sortOptions}
                                                    activeSortOption={filters.sortBy}
                                                    filters={filters}
                                                    products={collectionProductsData.data.collection.products}
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
                            </TypedCollectionProductsQuery>
                        );
                    }}
                </TypedCollectionProductsDataQuery>
            )}
        </NetworkStatus>
    );
};

export default View;
