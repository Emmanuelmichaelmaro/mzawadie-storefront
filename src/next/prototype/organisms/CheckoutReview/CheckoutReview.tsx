import { checkoutMessages } from "@mzawadie/core";
import { ErrorMessage } from "@mzawadie/ui-kit/atoms";
import { AddressSummary } from "@mzawadie/ui-kit/molecules";
import React from "react";
import { FormattedMessage } from "react-intl";

import * as S from "./styles";
import { ICheckoutReviewProps } from "./types";

/**
 * Review order view showed in checkout.
 */
const CheckoutReview: React.FC<ICheckoutReviewProps> = ({
    shippingAddress,
    billingAddress,
    shippingMethodName,
    paymentMethodName,
    email,
    errors,
}) => {
    return (
        <S.Wrapper data-test="sectionTitle">
            <S.Title data-test="checkoutPageSubtitle">
                <FormattedMessage {...checkoutMessages.reviewOrder} />
            </S.Title>

            <S.Grid>
                <section data-test="shippingAddressSection">
                    <S.SubTitle>
                        <FormattedMessage {...checkoutMessages.shippingAddress} />
                    </S.SubTitle>

                    <S.Divider />

                    <AddressSummary address={shippingAddress} email={email} />
                </section>

                <section data-test="billingAddressSection">
                    <S.SubTitle>
                        <FormattedMessage defaultMessage="Billing Address" />
                    </S.SubTitle>

                    <S.Divider />

                    <AddressSummary address={billingAddress} email={email} />
                </section>

                <section>
                    <S.SubTitle>
                        <FormattedMessage defaultMessage="Shipping Method" />
                    </S.SubTitle>

                    <S.Divider />

                    <S.TextSummary data-test="shippingMethodName">{shippingMethodName}</S.TextSummary>
                </section>

                <section>
                    <S.SubTitle>
                        <FormattedMessage defaultMessage="Payment Method" />
                    </S.SubTitle>

                    <S.Divider />

                    <S.TextSummary data-test="paymentMethodName">{paymentMethodName}</S.TextSummary>
                </section>
            </S.Grid>

            <S.ErrorMessages>
                <ErrorMessage errors={errors} />
            </S.ErrorMessages>
        </S.Wrapper>
    );
};

export { CheckoutReview };
