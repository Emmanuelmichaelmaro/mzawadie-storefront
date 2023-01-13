// @ts-nocheck
import { commonMessages, maybe } from "@mzawadie/core";
import { BaseCategory } from "@mzawadie/sdk/lib/src/fragments/gqlTypes/BaseCategory";
import { CategoryDetails } from "@mzawadie/sdk/lib/src/fragments/gqlTypes/CategoryDetails";
import { ProductList_products_edges_node } from "@mzawadie/sdk/lib/src/queries/gqlTypes/ProductList";
import { ProductListHeader } from "@mzawadie/ui-kit/molecules";
import { FilterSidebar, ProductList } from "@mzawadie/ui-kit/organisms";
import { FeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { IFilterAttributes } from "@next/types";
import React from "react";
import { useIntl } from "react-intl";
import { Attribute } from "src/next/gqlTypes/Attribute";

import { Breadcrumbs, extractBreadcrumbs, ProductsFeatured } from "../../components";
import styles from "./scss/index.module.scss";
import { Filters, getActiveFilterAttributes } from "./utils";

interface SortItem {
    label: string;
    value?: string;
}

interface SortOptions extends Array<SortItem> {}

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
    attributes: IFilterAttributes[];
    filters: Filters;
    hasNextPage: boolean;
    products: ProductList_products_edges_node[];
    sortOptions: SortOptions;
    numberOfProducts: number;
    clearFilters: () => void;
    onLoadMore: () => void;
    onAttributeFiltersChange: (attributeSlug: string, value: string) => void;
    onOrder: (order: { value?: string; label: string }) => void;
}

export const Page: React.FC<PageProps> = ({
    activeFilters,
    activeSortOption,
    attributes,
    category,
    numberOfProducts,
    products,
    displayLoader,
    hasNextPage,
    sortOptions,
    clearFilters,
    onLoadMore,
    filters,
    onOrder,
    onAttributeFiltersChange,
}) => {
    const canDisplayProducts = maybe(() => !!products.edges && products.totalCount !== undefined);

    const hasProducts = canDisplayProducts && !!products.totalCount;

    const [showFilters, setShowFilters] = React.useState(false);

    const intl = useIntl();

    return (
        <div className={styles.category}>
            <div className={styles.categry__container}>
                <Breadcrumbs breadcrumbs={extractBreadcrumbs(category)} />

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

                {canDisplayProducts && (
                    <ProductList
                        products={products.edges.map((edge) => edge.node)}
                        canLoadMore={hasNextPage}
                        loading={displayLoader}
                        onLoadMore={onLoadMore}
                    />
                )}
            </div>

            {!displayLoader && !hasProducts && (
                <ProductsFeatured
                    products={category.featuredProducts.products}
                    title={intl.formatMessage(commonMessages.youMightLike)}
                />
            )}
        </div>
    );
};
