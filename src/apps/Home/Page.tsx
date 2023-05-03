// @ts-nocheck
import { structuredData } from "@mzawadie/core/SEO/Homepage/structuredData";
import { generateCategoryUrl } from "@mzawadie/core/utils";
import { FeaturedProducts } from "@mzawadie/ui-kit/utils/ssr";
import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import noPhotoImg from "../../../public/images/no-photo.svg";
import { Button, ProductsFeatured } from "../../components";
import { HomePageProducts_categories, HomePageProducts_shop } from "./gqlTypes/HomePageProducts";
import styles from "./scss/index.module.scss";

const Page: React.FC<{
    categories: HomePageProducts_categories | null;
    featuredProducts: FeaturedProducts;
    shop: HomePageProducts_shop;
}> = ({ categories, featuredProducts, shop }) => {
    const categoriesExist = () => {
        return categories && categories.edges && categories.edges.length > 0;
    };

    const intl = useIntl();

    return (
        <>
            <script className="structured-data-list" type="application/ld+json">
                {structuredData(shop)}
            </script>

            <div
                className={styles.home__page__hero}
                style={
                    featuredProducts.collection?.backgroundImage
                        ? {
                              backgroundImage: `url(${featuredProducts.collection.backgroundImage.url})`,
                          }
                        : null
                }
            >
                <div className={styles.home__page__hero__text}>
                    <div>
                        <span className={styles.home__page__hero__title}>
                            <h1>
                                <FormattedMessage defaultMessage="Final reduction" />
                            </h1>
                        </span>
                    </div>

                    <div>
                        <span className={styles.home__page__hero__title}>
                            <h1>
                                <FormattedMessage defaultMessage="Up to 70% off sale" />
                            </h1>
                        </span>
                    </div>
                </div>

                <div className={styles.home__page__hero__action}>
                    {categoriesExist() && (
                        <Link href={generateCategoryUrl(categories?.edges[0]?.node?.id, categories?.edges[0].node.slug)}>
                            <a>
                                <Button testingContext="homepageHeroActionButton">
                                    <FormattedMessage defaultMessage="Shop sale" />
                                </Button>
                            </a>
                        </Link>
                    )}
                </div>
            </div>

            <ProductsFeatured
                products={featuredProducts.collection?.products}
                title={intl.formatMessage({ defaultMessage: "Featured" })}
            />

            {categoriesExist() && (
                <div className={styles.home__page__categories}>
                    <div className="container">
                        <h3>
                            <FormattedMessage defaultMessage="Shop by category" />
                        </h3>

                        <div className={styles.home__page__categories__list}>
                            {categories?.edges.map(({ node: category }) => (
                                <div key={category.id}>
                                    <Link href={generateCategoryUrl(category.id, category.name)} key={category.id}>
                                        <a>
                                            <div
                                                className={classNames([styles.home__page__categories__list__image], {
                                                    [styles.home__page__categories__list__image__nophoto]:
                                                        !category.backgroundImage,
                                                })}
                                                style={{
                                                    backgroundImage: `url(${
                                                        category.backgroundImage ? category.backgroundImage.url : noPhotoImg
                                                    })`,
                                                }}
                                            />
                                            <h3>{category.name}</h3>
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Page;
