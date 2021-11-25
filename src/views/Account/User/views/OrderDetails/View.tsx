// @ts-nocheck
import { Loader } from "@mzawadie/prototype/atoms";
import { useAuth, useOrderDetails } from "@mzawadie/sdk";
import { NextPage } from "next";
import * as React from "react";

import Page from "./Page";
import "./scss/index.module.scss";
import { IProps } from "./types";

const View: NextPage<IProps> = ({ query: { token } }) => {
    const { data: order, loading } = useOrderDetails({ token }, { fetchPolicy: "cache-first" });
    const { user } = useAuth();
    const guest = !user;

    const handleDownloadInvoice = () => {
        if (order && "invoices" in order && order.invoices?.length > 0) {
            // Always download latest invoice
            const invoice = order.invoices.reduce((a, b) => {
                return new Date(a.createdAt) > new Date(b.createdAt) ? a : b;
            });

            if (invoice) {
                window.open(invoice.url, "_blank");
            }
        }
    };

    return loading ? (
        <Loader />
    ) : (
        <div className="order-details container">
            <Page guest={guest} order={order} downloadInvoice={handleDownloadInvoice} />
        </div>
    );
};

export default View;
