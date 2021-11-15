import { ProductDetails } from "@mzawadie/sdk/lib/fragments/gqlTypes/ProductDetails";
import { ICheckoutModelLine } from "@mzawadie/sdk/lib/helpers";

export interface IProps {
    product: ProductDetails;
    add: (variantId: string, quantity: number) => any;
    items: ICheckoutModelLine[];
}
