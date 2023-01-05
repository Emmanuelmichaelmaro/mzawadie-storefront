import { ProductDetails } from "@mzawadie/sdk/lib/src/fragments/gqlTypes/ProductDetails";
import { ICheckoutModelLine } from "@mzawadie/sdk/lib/src/helpers";

export interface IProps {
    product: ProductDetails;
    add: (variantId: string, quantity: number) => any;
    items: ICheckoutModelLine[];
}
