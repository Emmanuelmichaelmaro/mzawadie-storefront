import { ProductDetails_product_variants } from "@mzawadie/sdk/lib/src/queries/gqlTypes/ProductDetails";
import { useProductVariantsAttributes, useProductVariantsAttributesValuesSelection } from "@mzawadie/ui-kit/hooks";
import { IProductVariantsAttributesSelectedValues } from "@next/types";
import React, { useEffect } from "react";

import { ProductVariantAttributeSelect } from "./ProductVariantAttributeSelect";
import * as S from "./styles";

export interface IProductVariantPickerProps {
    productVariants?: ProductDetails_product_variants[];
    onChange?: (
        selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
        selectedVariant?: ProductDetails_product_variants | undefined
    ) => void;
    selectSidebar?: boolean;
    selectSidebarTarget?: HTMLElement | null;
    queryAttributes: Record<string, string>;
    onAttributeChangeHandler: (slug: string | null, value: string) => void;
}

const ProductVariantPicker: React.FC<IProductVariantPickerProps> = ({
    productVariants = [],
    queryAttributes = {},
    onAttributeChangeHandler,
    onChange,
    selectSidebar = false,
    selectSidebarTarget,
}) => {
    const productVariantsAttributes = useProductVariantsAttributes(productVariants);
    const [productVariantsAttributesSelectedValues, selectProductVariantsAttributesValue] =
        useProductVariantsAttributesValuesSelection(productVariantsAttributes);

    useEffect(() => {
        const selectedVariant = productVariants.find((productVariant) => {
            return productVariant.attributes.every((productVariantAttribute) => {
                const productVariantAttributeId = productVariantAttribute.attribute.id;
                return !!(
                    productVariantAttribute.values[0] &&
                    productVariantsAttributesSelectedValues[productVariantAttributeId] &&
                    productVariantAttribute.values[0]!.id ===
                        productVariantsAttributesSelectedValues[productVariantAttributeId]!.id
                );
            });
        });
        if (onChange) {
            onChange(productVariantsAttributesSelectedValues, selectedVariant);
        }
    }, [productVariantsAttributesSelectedValues]);

    const onAttributeChange = (id: string, value: any, slug: string | null) => {
        selectProductVariantsAttributesValue(id, value);
        onAttributeChangeHandler(slug, value);
    };

    return (
        <S.Wrapper>
            {Object.keys(productVariantsAttributes).map((productVariantsAttributeId) => {
                const productVariantsAttribute = productVariantsAttributes[productVariantsAttributeId];
                const { slug } = productVariantsAttribute.attribute;

                return (
                    <ProductVariantAttributeSelect
                        key={productVariantsAttributeId}
                        selectSidebar={selectSidebar}
                        selectSidebarTarget={selectSidebarTarget}
                        productVariants={productVariants}
                        productVariantsAttributeId={productVariantsAttributeId}
                        productVariantsAttribute={productVariantsAttribute}
                        defaultValue={queryAttributes[productVariantsAttributeId]}
                        productVariantsAttributesSelectedValues={productVariantsAttributesSelectedValues}
                        onChangeSelection={(optionValue) =>
                            onAttributeChange(productVariantsAttributeId, optionValue, slug)
                        }
                        onClearSelection={() => onAttributeChange(productVariantsAttributeId, null, slug)}
                    />
                );
            })}
        </S.Wrapper>
    );
};

ProductVariantPicker.displayName = "ProductVariantPicker";

export default ProductVariantPicker;
