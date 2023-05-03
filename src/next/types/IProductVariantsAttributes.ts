import { ISelectOptions } from "@next/types";
import {
    ProductDetails_product_variants_attributes_attribute,
    ProductDetails_product_variants_attributes_values,
} from "@saleor/sdk/lib/queries/gqlTypes/ProductDetails";

export interface IProductVariantsAttribute {
    attribute: ProductDetails_product_variants_attributes_attribute;
    values: ProductDetails_product_variants_attributes_values[];
}

export interface IProductVariantsAttributes {
    [key: string]: IProductVariantsAttribute;
}

export interface IProductVariantsAttributesSelectedValues {
    [key: string]: ProductDetails_product_variants_attributes_values | null;
}

export interface IProductVariantsAttributesOptionValue extends ISelectOptions {
    disabled: boolean;
    id: any;
    label: string;
    value: string;
}
