import { generateProductUrl } from "@mzawadie/core";
import { Thumbnail } from "@mzawadie/ui-kit/molecules";
import Link from "next/link";
import React from "react";

import { SearchResults_products_edges } from "./gqlTypes/SearchResults";
import styles from "./scss/index.module.scss";

const ProductItem: React.FC<SearchResults_products_edges> = ({ node: product }) => (
    <li className={styles.search__products__item}>
        <Link href={generateProductUrl(product.id, product.name)}>
            <a>
                <Thumbnail source={product} />

                <span>
                    <h4>{product.name}</h4>
                    <p>{product.category?.name || "-"}</p>
                </span>
            </a>
        </Link>
    </li>
);

export default ProductItem;
