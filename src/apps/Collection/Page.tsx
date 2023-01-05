// @ts-nocheck
import { commonMessages } from "@mzawadie/core";
import { CollectionDetails } from "@mzawadie/sdk/lib/src/fragments/gqlTypes/CollectionDetails";
import { ProductList_products_edges_node } from "@mzawadie/sdk/lib/src/queries/gqlTypes/ProductList";
import { ProductListHeader } from "@mzawadie/ui-kit/molecules";
import { FilterSidebar, ProductList } from "@mzawadie/ui-kit/organisms";
import { SortOptions } from "@mzawadie/ui-kit/utils/collections";
import { FeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { Attribute } from "@next/graphql/gqlTypes/Attribute";
import { IFilters } from "@next/types";
import React, { useState } from "react";
import { useIntl } from "react-intl";

import { Breadcrumbs, extractBreadcrumbs, ProductsFeatured } from "../../components";
import styles from "../Category/scss/index.module.scss";
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
    const [showFilters, setShowFilters] = useState(false);
    const intl = useIntl();

    return (
        <div className={styles.collection}>
            <div className={styles.container}>
                <Breadcrumbs breadcrumbs={extractBreadcrumbs(details)} />
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
