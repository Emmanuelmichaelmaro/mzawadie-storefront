// @ts-nocheck
import { commonMessages, getDBIdFromGraphqlId, maybe } from "@mzawadie/core";
import { ProductListHeader } from "@mzawadie/ui-kit/molecules";
import { FilterSidebar, ProductList } from "@mzawadie/ui-kit/organisms";
import { IFilterAttributes, IFilters } from "@next/types";
import React from "react";
import { useIntl } from "react-intl";

import { Breadcrumbs, ProductsFeatured } from "../../components";
import { Collection_collection } from "./gqlTypes/Collection";
import { CollectionProducts_collection_products } from "./gqlTypes/CollectionProducts";

interface SortItem {
    label: string;
    value?: string;
}

interface SortOptions extends Array<SortItem> {}

export interface CollectionData {
    details: CollectionDetails;
    attributes: Attribute[];
    featuredProducts: FeaturedProducts;
}

interface PageProps {
    activeFilters: number;
    attributes: IFilterAttributes[];
    activeSortOption: string;
    collection: Collection_collection;
    displayLoader: boolean;
    filters: IFilters;
    hasNextPage: boolean;
    numberOfProducts: number;
    products: CollectionProducts_collection_products;
    sortOptions: SortOptions;
    clearFilters: () => void;
    onLoadMore: () => void;
    onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
    onOrder: (order: { value?: string; label: string }) => void;
}

export const Page: React.FC<PageProps> = ({
    activeFilters,
    activeSortOption,
    attributes,
    collection,
    displayLoader,
    hasNextPage,
    clearFilters,
    onLoadMore,
    products,
    numberOfProducts,
    filters,
    onOrder,
    sortOptions,
    onAttributeFiltersChange,
}) => {
    const canDisplayProducts = maybe(() => !!products.edges && products.totalCount !== undefined);

    const hasProducts = canDisplayProducts && !!products.totalCount;

    const [showFilters, setShowFilters] = React.useState(false);

    const intl = useIntl();

    const breadcrumbs = [
        {
            link: [`/collection`, `/${collection.slug}`, `/${getDBIdFromGraphqlId(collection.id, "Collection")}/`].join(""),
            value: collection.name,
        },
    ];

    const getAttribute = (attributeSlug: string, valueSlug: string) => {
        return {
            attributeSlug,
            valueName: attributes.find(({ slug }) => attributeSlug === slug).values.find(({ slug }) => valueSlug === slug)
                .name,
            valueSlug,
        };
    };

    const activeFiltersAttributes =
        filters &&
        filters.attributes &&
        Object.keys(filters.attributes).reduce(
            (acc, key) => acc.concat(filters.attributes[key].map((valueSlug) => getAttribute(key, valueSlug))),
            []
        );

    return (
        <div className="collection">
            <div className="container">
                <Breadcrumbs breadcrumbs={breadcrumbs} />

                <FilterSidebar
                    show={showFilters}
                    hide={() => setShowFilters(false)}
                    onAttributeFiltersChange={onAttributeFiltersChange}
                    attributes={attributes}
                    filters={filters}
                />

                <ProductListHeader
                    activeSortOption={activeSortOption}
                    openFiltersMenu={() => setShowFilters(true)}
                    numberOfProducts={products ? products.totalCount : 0}
                    activeFilters={activeFilters}
                    activeFiltersAttributes={activeFiltersAttributes}
                    clearFilters={clearFilters}
                    sortOptions={sortOptions}
                    onChange={onOrder}
                    onCloseFilterAttribute={onAttributeFiltersChange}
                />

                {canDisplayProducts && (
                    <ProductList
                        products={products.edges.map((edge) => edge.node)}
                        canLoadMore={hasNextPage}
                        loading={displayLoader}
                        onLoadMore={onLoadMore}
                    />
                )}
            </div>

            {!hasProducts && <ProductsFeatured title={intl.formatMessage(commonMessages.youMightLike)} />}
        </div>
    );
};

export default Page;
