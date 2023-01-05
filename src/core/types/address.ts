import { CreateCheckout_checkoutCreate_checkout_shippingAddress } from "@mzawadie/sdk/lib/src/mutations/gqlTypes/CreateCheckout";

export type AddressInterface = Omit<CreateCheckout_checkoutCreate_checkout_shippingAddress, "__typename">;
