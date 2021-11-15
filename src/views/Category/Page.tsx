// @ts-nocheck
import { commonMessages } from "@mzawadie/core";
import { ProductListHeader } from "@mzawadie/prototype/molecules";
import { FilterSidebar, ProductList } from "@mzawadie/prototype/organisms";
import { BaseCategory } from "@mzawadie/sdk/lib/fragments/gqlTypes/BaseCategory";
import { CategoryDetails } from "@mzawadie/sdk/lib/fragments/gqlTypes/CategoryDetails";
import { ProductList_products_edges_node } from "@mzawadie/sdk/lib/queries/gqlTypes/ProductList";
import { Attribute } from "@next/graphql/gqlTypes/Attribute";
import { SORT_OPTIONS } from "@next/utils/collections";
import { FeaturedProducts } from "@next/utils/ssr";
import React from "react";
import { useIntl } from "react-intl";

import { Breadcrumbs, extractBreadcrumbs, ProductsFeatured } from "../../components";
import "./scss/index.module.scss";
import { Filters, getActiveFilterAttributes } from "./utils";

export interface CategoryData {
    details: CategoryDetails;
    ancestors: BaseCategory[];
    attributes: Attribute[];
    featuredProducts: FeaturedProducts;
}

interface PageProps {
    category: CategoryData;
    activeFilters: number;
    activeSortOption: string;
    displayLoader: boolean;
    filters: Filters;
    hasNextPage: boolean;
    products: ProductList_products_edges_node[];
    numberOfProducts: number;
    clearFilters: () => void;
    onLoadMore: () => void;
    onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
    onOrder: (order: { value?: string; label: string }) => void;
}

export const Page: React.FC<PageProps> = ({
    activeFilters,
    activeSortOption,
    category: { attributes, details, ancestors, featuredProducts },
    numberOfProducts,
    products,
    displayLoader,
    hasNextPage,
    clearFilters,
    onLoadMore,
    filters,
    onOrder,
    onAttributeFiltersChange,
}) => {
    const hasProducts = products.length > 0;
    const [showFilters, setShowFilters] = React.useState(false);
    const intl = useIntl();

    return (
        <div className="category">
            <div className="container">
                <Breadcrumbs breadcrumbs={extractBreadcrumbs(details, ancestors)} />
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
                    sortOptions={SORT_OPTIONS}
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
