import { FeaturedProducts } from "@utils/ssr";
import { NextPage } from "next";
import * as React from "react";

import { MetaWrapper } from "../../components";
import Page from "./Page";
import { HomePageProducts } from "./gqlTypes/HomePageProducts";
import "./scss/index.scss";

export interface HomeViewProps {
    data: HomePageProducts & { featuredProducts: FeaturedProducts };
}

const HomePage: NextPage<HomeViewProps> = ({ data: { shop, featuredProducts, categories } }) => (
    <div className="home-page">
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

export default HomePage;
