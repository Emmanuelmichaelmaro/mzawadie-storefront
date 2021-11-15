import { generateProductUrl } from "@mzawadie/core";
import { TaxedMoney } from "@mzawadie/prototype/containers";
import { Thumbnail } from "@mzawadie/prototype/molecules";
import { ProductVariant } from "@mzawadie/sdk/lib/fragments/gqlTypes/ProductVariant";
import { OrderByToken_orderByToken_lines_unitPrice } from "@mzawadie/sdk/lib/queries/gqlTypes/OrderByToken";
import classNames from "classnames";
import Link from "next/link";
import * as React from "react";

// import { ProductVariant } from "../../checkout/types/ProductVariant";

export type LineI = Omit<
    ProductVariant,
    "__typename" | "sku" | "stockQuantity" | "isAvailable" | "attributes"
> & {
    quantity: number;
    totalPrice: OrderByToken_orderByToken_lines_unitPrice;
    stockQuantity?: number;
};

interface ReadProductRowProps {
    mediumScreen: boolean;
    line: LineI;
}

export interface EditableProductRowProps {
    processing?: boolean;
}

const ProductRow: React.FC<ReadProductRowProps & EditableProductRowProps> = ({
    mediumScreen,
    processing,
    line,
}) => {
    const productUrl = generateProductUrl(line.product.id, line.product.name);

    return (
        <tr
            className={classNames({
                "cart-table-row--processing": processing,
            })}
        >
            <td className="cart-table__thumbnail">
                <div>
                    {mediumScreen && (
                        <Link href={productUrl}>
                            <a>
                                <Thumbnail source={line.product} />
                            </a>
                        </Link>
                    )}
                    <Link href={productUrl}>
                        <a>{line.product.name}</a>
                    </Link>
                </div>
            </td>

            {mediumScreen && (
                <td>
                    <TaxedMoney taxedMoney={line.pricing?.price} />
                </td>
            )}

            <td>{line.name}</td>

            <td className="cart-table__quantity-cell">
                <p>{line.quantity}</p>
            </td>

            <td colSpan={2}>
                <TaxedMoney taxedMoney={line.totalPrice} />
            </td>
        </tr>
    );
};

export default ProductRow;
