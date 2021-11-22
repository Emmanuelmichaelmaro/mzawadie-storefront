import { ProductList } from "@mzawadie/prototype/organisms";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ProductDetails_product_category_products_edges } from "./gqlTypes/ProductDetails";
import styles from "./scss/index.module.scss";

const OtherProducts: React.FC<{
    products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => (
    <div className={styles.product__page__other__products}>
        <div className={styles.container}>
            <h4 className={styles.product__page__other__products__title}>
                <FormattedMessage defaultMessage="Other products in this category" />
            </h4>

            <ProductList products={products.map(({ node }) => node)} />
        </div>
    </div>
);

export default OtherProducts;
