// @ts-nocheck
import { commonMessages, generateCollectionUrl } from "@mzawadie/core";
import { ProductListHeader } from "@mzawadie/ui-kit/molecules";
import { FilterSidebar, ProductList } from "@mzawadie/ui-kit/organisms";
import { SortOptions } from "@mzawadie/ui-kit/utils/collections";
import { FeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { IFilters } from "@next/types";
import { CollectionDetails } from "@saleor/sdk/lib/fragments/gqlTypes/CollectionDetails";
import { ProductList_products_edges_node } from "@saleor/sdk/lib/queries/gqlTypes/ProductList";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Attribute } from "src/next/gqlTypes/Attribute";

import { Breadcrumbs, ProductsFeatured, extractBreadcrumbs } from "../../components";
import { getActiveFilterAttributes } from "../Category/utils";

export interface CollectionData {
    details: CollectionDetails;
    attributes: Attribute[];
    featuredProducts: FeaturedProducts;
}

interface PageProps {
    activeFilters: number;
    activeSortOption: string;
    collection: CollectionData;
    displayLoader: boolean;
    filters: IFilters;
    hasNextPage: boolean;
    numberOfProducts: number;
    products: ProductList_products_edges_node[];
    sortOptions: SortOptions;
    clearFilters: () => void;
    onLoadMore: () => void;
    onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
    onOrder: (order: { value?: string; label: string }) => void;
}

export const Page: React.FC<PageProps> = ({
    activeFilters,
    activeSortOption,
    collection: { details, attributes, featuredProducts },
    displayLoader,
    hasNextPage,
    clearFilters,
    onLoadMore,
    products,
    filters,
    onOrder,
    numberOfProducts,
    sortOptions,
    onAttributeFiltersChange,
}) => {
    const hasProducts = products.length > 0;

    const [showFilters, setShowFilters] = React.useState(false);

    const intl = useIntl();

    const populateBreadcrumbs = (collection: CollectionDetails) => [
        {
            link: generateCollectionUrl(collection?.id, collection?.name),
            value: collection.name,
        },
    ];

    return (
        <div className="collection">
            <div className="container">
                <Breadcrumbs breadcrumbs={populateBreadcrumbs(details)} />

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
                    numberOfProducts={numberOfProducts}
                    activeFilters={activeFilters}
                    activeFiltersAttributes={getActiveFilterAttributes(filters?.attributes, attributes)}
                    clearFilters={clearFilters}
                    sortOptions={sortOptions}
                    onChange={onOrder}
                    onCloseFilterAttribute={onAttributeFiltersChange}
                />

                <ProductList
                    products={products}
                    canLoadMore={hasNextPage}
                    loading={displayLoader}
                    onLoadMore={onLoadMore}
                />
            </div>

            {!displayLoader && !hasProducts && (
                <ProductsFeatured
                    products={featuredProducts.products}
                    title={intl.formatMessage(commonMessages.youMightLike)}
                />
            )}
        </div>
    );
};

export default Page;
