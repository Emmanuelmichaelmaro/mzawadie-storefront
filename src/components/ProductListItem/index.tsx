import { TaxedMoney } from "@mzawadie/ui-kit/containers";
import { Thumbnail } from "@mzawadie/ui-kit/molecules";
import { FeaturedProduct } from "@next/graphql/gqlTypes/FeaturedProduct";
import isEqual from "lodash/isEqual";
import * as React from "react";

import styles from "./scss/index.module.scss";

interface ProductListItemProps {
    product: FeaturedProduct;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
    const { category } = product;

    const price = product.pricing?.priceRange?.start;
    const priceUndiscounted = product.pricing?.priceRangeUndiscounted?.start;

    const getProductPrice = () => {
        if (isEqual(price, priceUndiscounted)) {
            return <TaxedMoney taxedMoney={price} />;
        } else {
            return (
                <>
                    <span className={styles.product__list__item__undiscounted__price}>
                        <TaxedMoney taxedMoney={priceUndiscounted} />
                    </span>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <TaxedMoney taxedMoney={price} />
                </>
            );
        }
    };

    return (
        <div className={styles.product__list__item}>
            <div className={styles.product__list__item__image}>
                <Thumbnail source={product} />
            </div>

            <h4 className={styles.product__list__item__title}>{product.name}</h4>

            <p className={styles.product__list__item__category}>{category?.name}</p>
            <p className={styles.product__list__item__price}>{getProductPrice()}</p>
        </div>
    );
};

export default ProductListItem;
