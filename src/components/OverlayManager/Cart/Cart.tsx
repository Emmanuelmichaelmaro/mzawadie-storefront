// @ts-nocheck
import { paths } from "@mzawadie/core";
import { TaxedMoney } from "@mzawadie/prototype/containers";
import { useAuth, useCart } from "@mzawadie/sdk";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { ReactSVG } from "react-svg";

import { Button, Offline, OfflinePlaceholder, Online, Overlay, OverlayContextInterface } from "../..";
import cartImg from "../../../images/cart.svg";
import closeImg from "../../../images/x.svg";
import Empty from "./Empty";
import ProductList from "./ProductList";
import "./scss/index.module.scss";

const Cart: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {
    const { user } = useAuth();
    const { items, removeItem, subtotalPrice } = useCart();

    return (
        <Overlay testingContext="cartOverlay" context={overlay}>
            <Online>
                <div className="cart">
                    <div className="overlay__header">
                        <ReactSVG path={cartImg} className="overlay__header__cart-icon" />

                        <div className="overlay__header-text">
                            My bag,{" "}
                            <span className="overlay__header-text-items">
                                {items?.reduce((prevVal, currVal) => prevVal + currVal.quantity, 0) ||
                                    0}{" "}
                                items
                            </span>
                        </div>

                        <ReactSVG
                            path={closeImg}
                            onClick={overlay.hide}
                            className="overlay__header__close-icon"
                        />
                    </div>

                    {items?.length ? (
                        <>
                            <ProductList lines={items} remove={removeItem} />

                            <div className="cart__footer">
                                <div className="cart__footer__subtotoal">
                                    <span>Subtotal</span>

                                    <span>
                                        <TaxedMoney
                                            data-cy="cartPageSubtotalPrice"
                                            taxedMoney={subtotalPrice}
                                        />
                                    </span>
                                </div>

                                <div className="cart__footer__button">
                                    <Link href={paths.cart}>
                                        <a>
                                            <Button testingContext="gotoCartViewButton" secondary>
                                                <FormattedMessage
                                                    defaultMessage="Go to my bag"
                                                    description="button"
                                                />
                                            </Button>
                                        </a>
                                    </Link>
                                </div>

                                <div className="cart__footer__button">
                                    <Link href={user ? paths.checkout : paths.login}>
                                        <a>
                                            <Button testingContext="gotoCheckoutButton">
                                                <FormattedMessage
                                                    defaultMessage="Checkout"
                                                    description="button"
                                                />
                                            </Button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        <Empty overlayHide={overlay.hide} />
                    )}
                </div>
            </Online>

            <Offline>
                <div className="cart">
                    <OfflinePlaceholder />
                </div>
            </Offline>
        </Overlay>
    );
};

export default Cart;
