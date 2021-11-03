import "./scss/index.scss";

import {
    OverlayContext,
    OverlayContextInterface,
    OverlayTheme,
    OverlayType
} from "./context";
import React from "react";

export class OverlayProvider extends React.Component<
    { children: React.ReactNode },
    OverlayContextInterface
    > {
    constructor(props: { children: React.ReactNode; } | Readonly<{ children: React.ReactNode; }>) {
        super(props);
        this.state = {
            hide: this.hide,
            show: this.show,
            theme: null,
            type: null
        };
    }

    show = (type: OverlayType, theme?: OverlayTheme) => {
        // @ts-ignore
        this.setState({ type, theme });
        document.body.style.overflow = "hidden";
    };

    hide = () => {
        this.setState({ type: null });
        document.body.style.overflow = "";
    };

    render() {
        return (
            <OverlayContext.Provider value={this.state}>
                {this.props.children}
            </OverlayContext.Provider>
        );
    }
}

export const Overlay: React.SFC<{ context: OverlayContextInterface }> = ({
                                                                             children,
                                                                             context: { type, theme, hide }
                                                                         }) => (
    <div
        className={`overlay${type ? ` overlay--${type}` : ""}`}
        onClick={() => hide()}
    >
        <div className={`overlay__${theme}`} onClick={e => e.stopPropagation()}>
            {children}
        </div>
    </div>
);
