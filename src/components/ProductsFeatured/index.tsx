import { generateProductUrl } from "@mzawadie/core";
import Link from "next/link";
import React from "react";

import { Carousel, ProductListItem } from "..";
import { FeaturedProductsQuery_collection_products } from "../../next/gqlTypes/FeaturedProductsQuery";
import styles from "./scss/index.module.scss";

interface ProductsFeaturedProps {
    title?: string;
    products?: FeaturedProductsQuery_collection_products | undefined | null;
}

export const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ title, products }) =>
    products?.edges.length ? (
        <div className={styles.products__featured}>
            <div className="container">
                <h3>{title}</h3>

                <Carousel>
                    {products?.edges.map(({ node: product }) => (
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
