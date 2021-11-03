// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Query } from "@apollo/client/react/components";
import Link from "next/link";
import React from "react";
import ReactSVG from "react-svg";

import { Button } from "..";
import { GET_COLLECTIONS } from "./queries";

import "./scss/index.scss";

const Footer: React.SFC = () => (
    <div className="footer">
        <div className="footer__newsletter">
            <div className="container">
                <h4>Subscribe to our newsletter to recieve new information</h4>
                <Button secondary>Sign up</Button>
            </div>
        </div>
        <div className="footer__favicons container">
            <ReactSVG
                path="../../images/facebook-icon.svg"
                className="footer__favicons__icon"
            />
            <ReactSVG
                path="../../images/twitter-icon.svg"
                className="footer__favicons__icon"
            />
            <ReactSVG
                path="../../images/instagram-icon.svg"
                className="footer__favicons__icon"
            />
            <ReactSVG
                path="../../images/youtube-icon.svg"
                className="footer__favicons__icon"
            />
        </div>
        <footer className="footer__menu">
            <div className="container">
                <div>
                    <h4>Collections</h4>
                    <Query query={GET_COLLECTIONS}>
                        {({ loading, error, data }) => {
                            if (loading) {
                                return "Loading";
                            }
                            if (error) {
                                return `Error!: ${error}`;
                            }
                            return data.collections.edges.map(collection => (
                                <p key={collection.node.id}>{collection.node.name}</p>
                            ));
                        }}
                    </Query>
                </div>
                <div>
                    <h4>Orders</h4>
                    <p>
                        <Link href="/account">My account</Link>
                    </p>
                    <p>Track my orders</p>
                    <p>Delivery</p>
                    <p>Return policy</p>
                </div>
                <div>
                    <h4>Help</h4>
                    <p>Customer service</p>
                    <p>Size guide</p>
                    <p>Contact us</p>
                </div>
                <div>
                    <h4>Saleor</h4>
                    <p>About us</p>
                    <p>Dashboard</p>
                    <p>Style guide</p>
                </div>
            </div>
        </footer>
    </div>
);

export default Footer;