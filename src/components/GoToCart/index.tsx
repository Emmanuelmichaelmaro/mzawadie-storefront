import * as React from "react";
import { GoToCheckout } from "../../views/CheckoutPage";

export default class GoToCart extends GoToCheckout {
    getRedirection() {
        return <Redirect to={`/cart/${this.state.checkoutToken}/`} />;
    }
}
