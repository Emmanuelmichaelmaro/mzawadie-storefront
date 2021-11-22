import React from "react";

import { Button } from "../..";
import styles from "./scss/index.module.scss";

const Empty: React.FC<{ overlayHide(): void }> = ({ overlayHide }) => (
    <div className={styles.cart__empty}>
        <h4>Your bag is empty</h4>

        <p>You haven’t added anything to your bag. We’re sure you’ll find something in our store</p>

        <div className={styles.cart__empty__action}>
            <Button testingContext="EmptyPageContinueShopping" secondary onClick={overlayHide}>
                Continue Shopping
            </Button>
        </div>
    </div>
);

export default Empty;
