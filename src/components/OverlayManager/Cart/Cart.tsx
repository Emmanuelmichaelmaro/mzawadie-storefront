import { paths } from "@mzawadie/core";
import { CartSidebar } from "@mzawadie/prototype/organisms";
import { useAuth, useCart, useCheckout } from "@mzawadie/sdk/lib/src";
import { useRouter } from "next/router";
import React from "react";

import { OverlayContextInterface } from "../..";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
    const { push } = useRouter();
    const { user } = useAuth();
    const { checkout } = useCheckout();
    const { items, updateItem, removeItem, subtotalPrice, shippingPrice, discount, totalPrice } =
        useCart();

    const shippingTaxedPrice =
        checkout?.shippingMethod?.id && shippingPrice
            ? {
                  gross: shippingPrice,
                  net: shippingPrice,
              }
            : null;

    const promoTaxedPrice = discount && {
        gross: discount,
        net: discount,
    };

    return (
        <CartSidebar
            show
            updateItem={updateItem}
            removeItem={removeItem}
            hide={overlay.hide}
            items={items}
            subtotalPrice={subtotalPrice}
            shippingTaxedPrice={shippingTaxedPrice}
            promoTaxedPrice={promoTaxedPrice}
            totalPrice={totalPrice}
            continueShopping={() => {
                push(paths.home);
                overlay.hide();
            }}
            goToCart={() => {
                push(paths.cart);
                overlay.hide();
            }}
            proceedToCheckout={() => {
                push(user ? paths.checkout : paths.accountLogin);
                overlay.hide();
            }}
        />
    );
};

export default Cart;
