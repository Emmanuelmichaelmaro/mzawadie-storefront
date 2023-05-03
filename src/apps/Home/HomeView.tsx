import { FeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import { NextPage } from "next";
import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import { HomePageProducts } from "./gqlTypes/HomePageProducts";
import styles from "./scss/index.module.scss";

export interface HomeViewProps {
    data: HomePageProducts & { featuredProducts: FeaturedProducts };
}

export const HomeView: NextPage<HomeViewProps> = ({ data: { shop, featuredProducts, categories } }) => (
    <div className={styles.home__page}>
        <MetaWrapper
            meta={{
                description: shop?.description || "",
                title: shop.name || "",
            }}
        >
            <Page featuredProducts={featuredProducts} categories={categories} shop={shop} />
        </MetaWrapper>
    </div>
);
