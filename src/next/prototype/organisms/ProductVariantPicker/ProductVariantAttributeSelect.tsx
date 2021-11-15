import { Icon, Input } from "@mzawadie/prototype/atoms";
import { InputSelect } from "@mzawadie/prototype/molecules";
import { ProductDetails_product_variants } from "@mzawadie/sdk/lib/queries/gqlTypes/ProductDetails";
import { useSelectableProductVariantsAttributeValues } from "@next/hooks";
import { IProductVariantsAttribute, IProductVariantsAttributesSelectedValues } from "@next/types";
import React, { useEffect } from "react";
import { useIntl } from "react-intl";

import { SelectSidebar } from "../SelectSidebar";
import * as S from "./styles";

export const ProductVariantAttributeSelect: React.FC<{
    selectSidebar: boolean;
    selectSidebarTarget?: HTMLElement | null;
    productVariantsAttributeId: string;
    productVariants: ProductDetails_product_variants[];
    productVariantsAttribute: IProductVariantsAttribute;
    productVariantsAttributesSelectedValues: IProductVariantsAttributesSelectedValues;
    onChangeSelection: (value: any, name?: any) => void;
    onClearSelection: () => void;
    defaultValue?: string;
}> = ({
    selectSidebar = false,
    selectSidebarTarget,
    productVariantsAttributeId,
    productVariants,
    productVariantsAttribute,
    productVariantsAttributesSelectedValues,
    onChangeSelection,
    onClearSelection,
    defaultValue,
}) => {
    const [showSelectSidebar, setShowSelectSidebar] = React.useState(false);
    const selectableProductVariantsAttributeValues = useSelectableProductVariantsAttributeValues(
        productVariantsAttributeId,
        productVariants,
        productVariantsAttributesSelectedValues
    );
    const intl = useIntl();

    const selectedAttribute =
        productVariantsAttributesSelectedValues &&
        productVariantsAttributesSelectedValues[productVariantsAttributeId];

    const selectedValue = selectedAttribute && {
        disabled: false,
        id: selectedAttribute.id,
        label: selectedAttribute.name!,
        value: selectedAttribute.value!,
    };

    const attributeOptions = productVariantsAttribute.values
        .filter((value) => value)
        .map((value) => {
            const selectableAttribute =
                selectableProductVariantsAttributeValues[productVariantsAttributeId];
            const isOptionDisabled = selectableAttribute && !selectableAttribute.values.includes(value);

            return {
                disabled: isOptionDisabled,
                id: value.id,
                label: value.name!,
                value: value.value!,
            };
        });

    const selectLabel = productVariantsAttribute.attribute.name || "";

    const selectedValuesList = selectedValue ? [selectedValue.value] : [];

    const disabledValuesList = attributeOptions
        .filter((optionValue) => optionValue.disabled)
        .map((optionValue) => optionValue.value);

    const onSelectValueHandler = (optionValue: string, callback?: () => void) => {
        if (disabledValuesList.every((disabledValue) => disabledValue !== optionValue)) {
            onChangeSelection(optionValue);
            if (callback) {
                callback();
            }
        }
    };

    const handleSelectValueInSidebar = (optionValue: string) =>
        onSelectValueHandler(optionValue, () => setShowSelectSidebar(false));

    const getRightInputContent = (isInputFilled: boolean) => {
        if (isInputFilled) {
            return (
                <S.SelectIndicator onClick={onClearSelection}>
                    <Icon name="select_x" size={10} />
                </S.SelectIndicator>
            );
        }
        return (
            <S.SelectIndicator onClick={() => setShowSelectSidebar(true)}>
                <Icon name="subcategories" size={10} />
            </S.SelectIndicator>
        );
    };

    useEffect(() => {
        if (defaultValue) {
            onSelectValueHandler(defaultValue);
        }
    }, [defaultValue]);

    if (selectSidebar) {
        return (
            <>
                <Input
                    onFocus={() => setShowSelectSidebar(true)}
                    label={selectLabel}
                    value={selectedValue ? selectedValue.value : ""}
                    onChange={() => null}
                    contentRight={getRightInputContent(!!selectedValue)}
                    readOnly
                    name={
                        productVariantsAttribute.attribute.slug
                            ? productVariantsAttribute.attribute.slug
                            : ""
                    }
                    data-test="variantPicker"
                />
                <SelectSidebar
                    options={attributeOptions}
                    selectedOptions={selectedValuesList}
                    disabledOptions={disabledValuesList}
                    title={intl.formatMessage(
                        {
                            defaultMessage: "Please select {selectLabel}",
                        },
                        { selectLabel }
                    )}
                    show={showSelectSidebar}
                    hide={() => setShowSelectSidebar(false)}
                    onSelect={handleSelectValueInSidebar}
                    target={selectSidebarTarget}
                    testingContextId={
                        productVariantsAttribute.attribute.slug
                            ? productVariantsAttribute.attribute.slug
                            : ""
                    }
                />
            </>
        );
    }
    return (
        <InputSelect
            name={productVariantsAttribute.attribute.id}
            label={selectLabel}
            value={selectedValue}
            options={attributeOptions}
            isOptionDisabled={(optionValue) => optionValue.disabled}
            onChange={(optionValue) => onChangeSelection(optionValue?.value)}
            clearable
            clearValue={onClearSelection}
        />
    );
};
