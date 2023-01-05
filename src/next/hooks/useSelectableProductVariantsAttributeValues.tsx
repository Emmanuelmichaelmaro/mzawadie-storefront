import { ProductDetails_product_variants } from "@mzawadie/sdk/lib/src/queries/gqlTypes/ProductDetails";
import { IProductVariantsAttributes, IProductVariantsAttributesSelectedValues } from "@next/types";
import { useEffect, useState } from "react";

import { useProductVariantsAttributes } from "./useProductVariantsAttributes";

export const useSelectableProductVariantsAttributeValues = (
    consideredProductVariantsAttributeId: string,
    productVariants: ProductDetails_product_variants[],
    productVariantsAttributesSelectedValues: IProductVariantsAttributesSelectedValues
): IProductVariantsAttributes => {
    const [productPossibleVariants, setProductPossibleVariants] = useState<ProductDetails_product_variants[]>([]);
    const productPossibleVariantsAttributes = useProductVariantsAttributes(productPossibleVariants);

    useEffect(() => {
        const possibleVariants = productVariants.filter((productVariant) => {
            return Object.keys(productVariantsAttributesSelectedValues).every((selectedValueAttributeId) => {
                if (selectedValueAttributeId === consideredProductVariantsAttributeId) {
                    return true;
                }
                if (!productVariantsAttributesSelectedValues[selectedValueAttributeId]) {
                    return true;
                }
                return productVariant.attributes.some((productVariantAttribute) => {
                    return (
                        productVariantAttribute.attribute.id === selectedValueAttributeId &&
                        productVariantAttribute.values[0] ===
                            productVariantsAttributesSelectedValues[selectedValueAttributeId]
                    );
                });
            });
        });

        setProductPossibleVariants(possibleVariants);
    }, [consideredProductVariantsAttributeId, productVariants, productVariantsAttributesSelectedValues]);

    return productPossibleVariantsAttributes;
};
