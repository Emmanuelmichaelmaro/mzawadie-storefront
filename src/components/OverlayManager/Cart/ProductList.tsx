// @ts-nocheck
import { generateProductUrl } from "@mzawadie/core/utils";
import { TaxedMoney } from "@mzawadie/prototype/containers";
import { Thumbnail } from "@mzawadie/prototype/molecules";
import { ICheckoutModelLine } from "@mzawadie/sdk/repository";
import Link from "next/link";
import * as React from "react";
import { ReactSVG } from "react-svg";

import removeImg from "../../../images/garbage.svg";

const ProductList: React.FC<{
    lines: ICheckoutModelLine[];
    remove(variantId: string): void;
}> = ({ lines, remove }) => (
    <ul className="cart__list">
        {lines.map((line, index) => {
            const productUrl = generateProductUrl(line.variant.product.id, line.variant.product.name);
            const key = line.id ? `id-${line.id}` : `idx-${index}`;

            return (
                <li key={key} className="cart__list__item">
                    <Link href={productUrl}>
                        <a>
                            <Thumbnail source={line.variant.product} />
                        </a>
                    </Link>

                    <div className="cart__list__item__details">
                        <p>
                            <TaxedMoney taxedMoney={line.variant.pricing.price} />
                        </p>

                        <Link href={productUrl}>
                            <a>
                                <p>{line.variant.product.name}</p>
                            </a>
                        </Link>

                        <span className="cart__list__item__details__variant">
                            <span>{line.variant.name}</span>
                            <span>{`Qty: ${line.quantity}`}</span>
                        </span>

                        <ReactSVG
                            path={removeImg}
                            className="cart__list__item__details__delete-icon"
                            onClick={() => remove(line.variant.id)}
                        />
                    </div>
                </li>
            );
        })}
    </ul>
);

export default ProductList;
