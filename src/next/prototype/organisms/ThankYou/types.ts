import { OrderStatus } from "@mzawadie/sdk";
import { UrlObject } from "url";

export interface IThankYouProps {
    orderStatus: OrderStatus;
    orderNumber: string;
    continueShoppingUrl: string | UrlObject;
    orderDetailsUrl: string | UrlObject;
}
