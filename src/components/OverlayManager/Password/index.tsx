// @ts-nocheck
import closeImg from "@images/x.svg";
import { OfflinePlaceholder } from "@mzawadie/ui-kit/atoms";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { ReactSVG } from "react-svg";

import { Offline, Online, Overlay, OverlayContextInterface, PasswordResetForm } from "../..";
import overlayStyles from "../../Overlay/scss/index.module.scss";
import styles from "./scss/index.module.scss";

const Password: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => (
    <Overlay testingContext="passwordOverlay" context={overlay}>
        <div className={overlayStyles.password__reset}>
            <Online>
                <div className={overlayStyles.overlay__header}>
                    <p className={overlayStyles.overlay__header__text}>
                        <FormattedMessage defaultMessage="Reset your password" />
                    </p>

                    <ReactSVG
                        src={closeImg}
                        onClick={overlay.hide}
                        className={overlayStyles.overlay__header__close__icon}
                    />
                </div>

                <div className={styles.password__reset__content}>
                    <PasswordResetForm />
                </div>
            </Online>

            <Offline>
                <OfflinePlaceholder />
            </Offline>
        </div>
    </Overlay>
);

export default Password;
