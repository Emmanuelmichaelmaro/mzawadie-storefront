/* eslint-disable react/no-unused-state */
// @ts-nocheck
import * as React from "react";

import {
    InnerOverlayContextInterface,
    OverlayContext,
    OverlayContextInterface,
    OverlayTheme,
    OverlayType,
} from "./context";
import { ssrMode } from "@mzawadie/core";

class Provider extends React.Component<{ pathname: string }, OverlayContextInterface> {
    notificationCloseDelay = 2500;

    constructor(props: any) {
        super(props);
        this.state = {
            context: null,
            hide: this.hide,
            show: this.show,
            theme: null,
            type: null,
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.pathname !== prevProps.pathname && this.state.type !== OverlayType.message) {
            this.hide();
        }
    }

    show = (type: OverlayType, theme?: OverlayTheme, context?: InnerOverlayContextInterface) => {
        this.setState({ type, theme, context });
        !ssrMode ? document.body.style.overflow = type !== OverlayType.message ? "hidden" : "" : undefined;
        if (type === OverlayType.message) {
            setTimeout(this.hide, this.notificationCloseDelay);
        }
    };

    hide = () => {
        this.setState({ type: null });
        !ssrMode ? document.body.style.overflow = "" : undefined;
    };

    render() {
        return (
            <OverlayContext.Provider value={this.state}>{this.props.children}</OverlayContext.Provider>
        );
    }
}

export default Provider;
