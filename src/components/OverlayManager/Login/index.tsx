// @ts-nocheck
import closeImg from "@images/x.svg";
import { OfflinePlaceholder } from "@mzawadie/ui-kit/atoms";
import * as React from "react";
import { FormattedMessage } from "react-intl";
import { ReactSVG } from "react-svg";

import { LoginForm, Offline, Online, Overlay, OverlayContextInterface, OverlayTheme, OverlayType } from "../..";
import overlayStyles from "../../Overlay/scss/index.module.scss";
import ForgottenPassword from "./ForgottenPassword";
import RegisterForm from "./RegisterForm";
import styles from "./scss/index.module.scss";

class Login extends React.Component<
    { overlay: OverlayContextInterface; active?: "login" | "register" },
    { active: "login" | "register" }
> {
    static defaultProps = {
        active: "login",
    };

    constructor(props: any) {
        super(props);
        this.state = {
            active: props.active,
        };
    }

    changeActiveTab = (active: "login" | "register") => {
        this.setState({ active });
    };

    render() {
        const { overlay } = this.props;
        const { show, hide } = overlay;

        return (
            <Overlay testingContext="loginOverlay" context={overlay}>
                <div className={styles.login}>
                    <Online>
                        <div className={overlayStyles.overlay__header}>
                            <p className={overlayStyles.overlay__header__text}>
                                <FormattedMessage defaultMessage="Mzawadie account" />
                            </p>

                            <ReactSVG
                                src={closeImg}
                                onClick={hide}
                                className={overlayStyles.overlay__header__close__icon}
                            />
                        </div>

                        <div className={styles.login__tabs}>
                            <span
                                data-test="loginTab"
                                onClick={() => this.changeActiveTab("login")}
                                className={this.state.active === "login" ? "active-tab" : ""}
                            >
                                <FormattedMessage defaultMessage="Sign in to account" />
                            </span>

                            <span
                                data-test="registerTab"
                                onClick={() => this.changeActiveTab("register")}
                                className={this.state.active === "register" ? "active-tab" : ""}
                            >
                                <FormattedMessage defaultMessage="Register new account" />
                            </span>
                        </div>

                        <div className={styles.login__content}>
                            {this.state.active === "login" ? (
                                <>
                                    <LoginForm hide={hide} />
                                    <ForgottenPassword
                                        onClick={() => {
                                            show(OverlayType.password, OverlayTheme.right);
                                        }}
                                    />
                                </>
                            ) : (
                                <RegisterForm hide={hide} />
                            )}
                        </div>
                    </Online>

                    <Offline>
                        <OfflinePlaceholder />
                    </Offline>
                </div>
            </Overlay>
        );
    }
}

export default Login;
