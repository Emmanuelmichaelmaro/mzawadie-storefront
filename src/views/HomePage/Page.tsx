// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Query } from "@apollo/client/react/components";
import Link from "next/link";
import React from "react";

import { Button, Carousel, ProductListItem } from "../../components";
import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { GET_PRODUCTS_AND_CATEGORIES } from "./queries";
import "./scss/index.scss";

const Page: React.SFC = () => (
    <div className="home-page">
        <div className="home-page__hero">
            <span className="home-page__hero__title">
                <h1>Final reduction</h1>
            </span>
            <br />
            <span className="home-page__hero__title">
                <h1>Up to 70% off sale</h1>
            </span>
            <br />
            <Button>Shop sale</Button>
        </div>

        <Query query={GET_PRODUCTS_AND_CATEGORIES}>
            {({ loading, error, data }) => {
                if (loading) {
                    return "Loading";
                }
                if (error) {
                    return `Error!: ${error}`;
                }
                return (
                    <>
                        <div className="home-page__featured">
                            <div className="container">
                                <h3>Featured</h3>

                                <Carousel>
                                    {data.shop.homepageCollection.products.edges.map(
                                        ({ node: product }) => (
                                            <Link
                                                to={`/product/${slugify(
                                                    product.name
                                                )}/${getDBIdFromGraphqlId(product.id, "Product")}/`}
                                                key={product.id}
                                            >
                                                <ProductListItem product={product} />
                                            </Link>
                                        )
                                    )}
                                </Carousel>
                            </div>
                        </div>

                        <div className="home-page__categories">
                            <div className="container">
                                <h3>Shop by category</h3>

                                <div className="home-page__categories__list">
                                    {data.categories.edges.map(({ node: category }) => (
                                        <div key={category.id}>
                                            <Link
                                                to={`/category/${slugify(
                                                    category.name
                                                )}/${getDBIdFromGraphqlId(category.id, "Category")}/`}
                                                key={category.id}
                                            >
                                                <div
                                                    className="home-page__categories__list__image"
                                                    style={{
                                                        backgroundImage: `url(http://localhost:8000${category.backgroundImage})`,
                                                    }}
                                                />
                                                <h3>{category.name}</h3>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </>
                );
            }}
        </Query>
    </div>
);

export default Page;