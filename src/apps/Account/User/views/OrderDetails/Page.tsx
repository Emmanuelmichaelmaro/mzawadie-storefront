// @ts-nocheck
import AddressSummary from "@mzawadie/components/AddressSummary";
import { CartTable } from "@mzawadie/components/CartTable";
import { LineI } from "@mzawadie/components/CartTable/ProductRow";
import NotFound from "@mzawadie/components/NotFound";
import { paths, checkoutMessages, translateOrderStatus, translatePaymentStatus } from "@mzawadie/core";
import { OrderDetail_lines } from "@mzawadie/sdk/lib/src/fragments/gqlTypes/OrderDetail";
import { OrderByToken_orderByToken } from "@mzawadie/sdk/lib/src/queries/gqlTypes/OrderByToken";
import { UserOrderByToken_orderByToken } from "@mzawadie/sdk/lib/src/queries/gqlTypes/UserOrderByToken";
import { DropdownMenu, IconButton } from "@mzawadie/ui-kit/atoms";
import { TaxedMoney } from "@mzawadie/ui-kit/containers";
import Link from "next/link";
import * as React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const extractOrderLines = (lines: OrderDetail_lines[]): LineI[] => {
    return lines
        .map((line) => ({
            quantity: line.quantity,
            totalPrice: line.totalPrice,
            ...line.variant,
            name: line.productName,
        }))
        .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
};

const Page: React.FC<{
    guest: boolean;
    order: OrderByToken_orderByToken | UserOrderByToken_orderByToken;
    downloadInvoice: () => void;
}> = ({ guest, order, downloadInvoice }) => {
    const intl = useIntl();

    return order ? (
        <>
            {!guest && (
                <Link href={paths.accountOrderHistory}>
                    <a className="order-details__link">
                        <FormattedMessage defaultMessage="Go back to Order History" />
                    </a>
                </Link>
            )}

            <div className="order-details__header">
                <div>
                    <h3>
                        <FormattedMessage
                            defaultMessage="Your order number: {orderNum}"
                            values={{ orderNum: order.number }}
                        />
                    </h3>

                    <p className="order-details__status">
                        {translatePaymentStatus(order.paymentStatusDisplay, intl)} /{" "}
                        {translateOrderStatus(order?.statusDisplay, intl)}
                    </p>
                </div>

                {"invoices" in order && order?.invoices?.length > 0 && (
                    <div className="order-details__header-menu">
                        <DropdownMenu
                            type="clickable"
                            header={<IconButton testingContext="expandButton" name="expand" size={28} />}
                            items={[
                                {
                                    onClick: downloadInvoice,
                                    content: (
                                        <span>
                                            <FormattedMessage
                                                defaultMessage="Download invoice"
                                                description="action in popup menu in order view"
                                            />
                                        </span>
                                    ),
                                },
                            ]}
                        />
                    </div>
                )}
            </div>

            <CartTable
                lines={extractOrderLines(order.lines)}
                totalCost={<TaxedMoney taxedMoney={order.total} />}
                deliveryCost={<TaxedMoney taxedMoney={order.shippingPrice} />}
                subtotal={<TaxedMoney taxedMoney={order.subtotal} />}
            />

            <div className="order-details__summary">
                <div>
                    <h4>
                        <FormattedMessage {...checkoutMessages.shippingAddress} />
                    </h4>
                    <AddressSummary address={order.shippingAddress} email={order.userEmail} />
                </div>
            </div>
        </>
    ) : (
        <NotFound />
    );
};
export default Page;
