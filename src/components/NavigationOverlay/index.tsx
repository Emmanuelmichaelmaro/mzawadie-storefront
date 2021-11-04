// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Query } from "@apollo/client/react/components";
import Link from "next/link";
import React from "react";
import ReactSVG from "react-svg";

import { getDBIdFromGraphqlId, slugify } from "../../core/utils";
import { Overlay } from "../Overlay";
import { OverlayContext, OverlayType } from "../Overlay/context";
import { GET_CATEGORIES } from "./queries";
import "./scss/index.scss";

const NavigationOverlay: React.SFC = () => (
    <OverlayContext.Consumer>
        {(overlayContext) => {
            if (overlayContext.type === OverlayType.navigation) {
                return (
                    <Overlay context={overlayContext}>
                        <div className="side-nav" onClick={(e) => e.stopPropagation()}>
                            <ul>
                                <li>
                                    <Link href="/">Home</Link>
                                </li>

                                <Query query={GET_CATEGORIES}>
                                    {({ loading, error, data }) => {
                                        if (loading) {
                                            return "Loading";
                                        }
                                        if (error) {
                                            return `Error!: ${error}`;
                                        }
                                        return data.categories.edges.map(({ node: category }) => (
                                            <li key={category.id}>
                                                <Link
                                                    to={`/category/${slugify(
                                                        category.name
                                                    )}/${getDBIdFromGraphqlId(
                                                        category.id,
                                                        "Category"
                                                    )}/`}
                                                >
                                                    {category.name}
                                                </Link>
                                            </li>
                                        ));
                                    }}
                                </Query>

                                <UserContext.Consumer>
                                    {({ user }) =>
                                        user ? (
                                            <li className="side-nav__icon-item">
                                                <a href="/">
                                                    <ReactSVG path="../../images/login-icon.svg" />
                                                    My account
                                                </a>
                                            </li>
                                        ) : null
                                    }
                                </UserContext.Consumer>
                            </ul>
                        </div>
                    </Overlay>
                );
            }
        }}
    </OverlayContext.Consumer>
);

export default NavigationOverlay;
