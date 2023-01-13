import { OrderStatus } from "@mzawadie/sdk/lib/src";
import { UrlObject } from "url";

export interface IThankYouProps {
    orderStatus: OrderStatus;
    orderNumber: string;
    continueShoppingUrl: string | UrlObject;
    orderDetailsUrl: string | UrlObject;
}
