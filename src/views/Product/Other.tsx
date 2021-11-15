import { ProductList } from "@mzawadie/prototype/organisms";
import React from "react";
import { FormattedMessage } from "react-intl";

import { ProductDetails_product_category_products_edges } from "./gqlTypes/ProductDetails";

const OtherProducts: React.FC<{
    products: ProductDetails_product_category_products_edges[];
}> = ({ products }) => (
    <div className="product-page__other-products">
        <div className="container">
            <h4 className="product-page__other-products__title">
                <FormattedMessage defaultMessage="Other products in this category" />
            </h4>

            <ProductList products={products.map(({ node }) => node)} />
        </div>
    </div>
);

export default OtherProducts;
