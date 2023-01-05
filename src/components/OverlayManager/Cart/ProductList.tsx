// @ts-nocheck
import { generateProductUrl } from "@mzawadie/core/utils";
import { ICheckoutModelLine } from "@mzawadie/sdk/repository";
import { TaxedMoney } from "@mzawadie/ui-kit/containers";
import { Thumbnail } from "@mzawadie/ui-kit/molecules";
import Link from "next/link";
import * as React from "react";
import { ReactSVG } from "react-svg";

import removeImg from "../../../images/garbage.svg";
import styles from "./scss/index.module.scss";

const ProductList: React.FC<{
    lines: ICheckoutModelLine[];
    remove(variantId: string): void;
}> = ({ lines, remove }) => (
    <ul className={styles.cart__list}>
        {lines.map((line, index) => {
            const productUrl = generateProductUrl(line.variant.product.id, line.variant.product.name);
            const key = line.id ? `id-${line.id}` : `idx-${index}`;

            return (
                <li key={key} className={styles.cart__list__item}>
                    <Link href={productUrl}>
                        <a>
                            <Thumbnail source={line.variant.product} />
                        </a>
                    </Link>

                    <div className={styles.cart__list__item__details}>
                        <p>
                            <TaxedMoney taxedMoney={line.variant.pricing.price} />
                        </p>

                        <Link href={productUrl}>
                            <a>
                                <p>{line.variant.product.name}</p>
                            </a>
                        </Link>

                        <span className={styles.cart__list__item__details__variant}>
                            <span>{line.variant.name}</span>
                            <span>{`Qty: ${line.quantity}`}</span>
                        </span>

                        <ReactSVG
                            src={removeImg}
                            className={styles.cart__list__item__details__delete__icon}
                            onClick={() => remove(line.variant.id)}
                        />
                    </div>
                </li>
            );
        })}
    </ul>
);

export default ProductList;
