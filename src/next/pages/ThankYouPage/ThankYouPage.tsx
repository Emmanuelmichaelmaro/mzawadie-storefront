import NotFound from "@mzawadie/components/NotFound";
import { paths } from "@mzawadie/core";
import { useAuth } from "@mzawadie/sdk/lib/src";
import { ThankYou } from "@mzawadie/ui-kit/organisms";
import { generateGuestOrderDetailsUrl, generateUserOrderDetailsUrl } from "@mzawadie/ui-kit/utils/core";
import { NextPage } from "next";
import React from "react";

import { IProps } from "./types";

export const ThankYouPage: NextPage<IProps> = ({ query: { orderNumber, token, orderStatus } }) => {
    const { user } = useAuth();

    return token && orderNumber && orderStatus ? (
        <ThankYou
            continueShoppingUrl={paths.home}
            orderNumber={orderNumber}
            orderDetailsUrl={user ? generateUserOrderDetailsUrl(token) : generateGuestOrderDetailsUrl(token)}
            orderStatus={orderStatus}
        />
    ) : (
        <NotFound />
    );
};
