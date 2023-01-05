// @ts-nocheck
import { OfflinePlaceholder } from "@mzawadie/ui-kit/atoms";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { ReactSVG } from "react-svg";

import { Offline, Online, Overlay, OverlayContextInterface, PasswordResetForm } from "../..";
import closeImg from "../../../images/x.svg";
import "./scss/index.module.scss";

const Password: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => (
    <Overlay testingContext="passwordOverlay" context={overlay}>
        <div className="password-reset">
            <Online>
                <div className="overlay__header">
                    <p className="overlay__header-text">
                        <FormattedMessage defaultMessage="Reset your password" />
                    </p>

                    <ReactSVG src={closeImg} onClick={overlay.hide} className="overlay__header__close-icon" />
                </div>

                <div className="password-reset__content">
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
