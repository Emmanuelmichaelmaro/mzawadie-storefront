import { generateProductUrl } from "@mzawadie/core";
import { FeaturedProduct } from "@next/graphql/gqlTypes/FeaturedProduct";
import Link from "next/link";
import React from "react";

import { Carousel, ProductListItem } from "..";
import styles from "./scss/index.module.scss";

interface ProductsFeaturedProps {
    title?: string;
    products: FeaturedProduct[] | undefined;
}

export const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ title, products }) =>
    products?.length ? (
        <div className={styles.products__featured}>
            <div className="container">
                <h3>{title}</h3>

                <Carousel>
                    {products.map((product) => (
                        <Link href={generateProductUrl(product.id, product.slug)} key={product.id}>
                            <a>
                                <ProductListItem product={product} />
                            </a>
                        </Link>
                    ))}
                </Carousel>
            </div>
        </div>
    ) : null;
