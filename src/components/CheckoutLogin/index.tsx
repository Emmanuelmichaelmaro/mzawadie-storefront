import { paths } from "@mzawadie/core";
import { Redirect } from "@mzawadie/prototype/atoms";
import { useAuth } from "@mzawadie/sdk/lib/src";
import React, { useContext, useState } from "react";

import { Offline, OfflinePlaceholder, Online, OverlayContext } from "..";
import CheckoutAsGuest from "./CheckoutAsGuest";
import ResetPasswordForm from "./ResetPasswordForm";
import SignInForm from "./SignInForm";
import styles from "./scss/index.module.scss";

const CheckoutLogin: React.FC<{}> = () => {
    const [resetPassword, setResetPassword] = useState(false);
    const overlay = useContext(OverlayContext);
    const { user } = useAuth();

    if (user) {
        return <Redirect url={paths.checkout} />;
    }

    return (
        <div className="container">
            <Online>
                <div className={styles.checkout__login}>
                    <CheckoutAsGuest overlay={overlay} checkoutUrl="/checkout/" />

                    <div className={styles.checkout__login__user}>
                        {resetPassword ? (
                            <ResetPasswordForm
                                onClick={() => {
                                    setResetPassword(false);
                                }}
                            />
                        ) : (
                            <SignInForm
                                onClick={() => {
                                    setResetPassword(true);
                                }}
                            />
                        )}
                    </div>
                </div>
            </Online>

            <Offline>
                <OfflinePlaceholder />
            </Offline>
        </div>
    );
};

export default CheckoutLogin;
