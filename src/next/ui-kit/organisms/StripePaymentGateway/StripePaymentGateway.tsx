import { paymentErrorMessages } from "@mzawadie/core";
import { stripeErrorMessages } from "@mzawadie/ui-kit/organisms/StripePaymentGateway/intl";
import { IFormError } from "@next/types";
import { CardNumberElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe, PaymentMethod, Stripe, StripeElements } from "@stripe/stripe-js";
import React, { useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";

import { StripeCreditCardForm } from "../StripeCreditCardForm";
import { IStripePaymentGatewayProps } from "./types";
import { handleConfirmCardPayment, parsePaymentConfirmationData } from "./utils";

/**
 * Stripe payment gateway.
 */
const StripePaymentGateway: React.FC<IStripePaymentGatewayProps> = ({
    config,
    processPayment,
    submitPayment,
    submitPaymentSuccess,
    formRef,
    formId,
    errors = [],
    onError,
}: IStripePaymentGatewayProps) => {
    const intl = useIntl();

    const [submitErrors, setSubmitErrors] = useState<IFormError[]>([]);
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>();

    const apiKey = config.find(({ field }) => field === "api_key")?.value;

    const stripePromise = useMemo(() => {
        if (apiKey) {
            return loadStripe(apiKey);
            // loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
        }

        const stripeApiKeyErrors = [new Error(intl.formatMessage(stripeErrorMessages.gatewayMisconfiguration))];

        setSubmitErrors(stripeApiKeyErrors);

        onError(stripeApiKeyErrors);

        return null;
    }, [apiKey]);

    const handleFormSubmit = async (stripe: Stripe | null, elements: StripeElements | null) => {
        const cartNumberElement = elements?.getElement(CardNumberElement);

        if (!cartNumberElement) {
            const stripeElementsErrors = [new Error(intl.formatMessage(stripeErrorMessages.gatewayDisplayError))];

            setSubmitErrors(stripeElementsErrors);

            onError(stripeElementsErrors);

            return;
        }

        const payload = await stripe?.createPaymentMethod({
            card: cartNumberElement,
            type: "card",
        });

        if (payload?.error) {
            const errors = [
                {
                    ...payload.error,
                    message: payload.error.message || "",
                },
            ];

            setSubmitErrors(errors);

            onError(errors);

            return;
        }

        if (!payload?.paymentMethod) {
            const stripePayloadErrors = [new Error(intl.formatMessage(stripeErrorMessages.paymentSubmissionError))];

            setSubmitErrors(stripePayloadErrors);

            onError(stripePayloadErrors);

            return;
        }

        const { card, id } = payload.paymentMethod;

        if (card?.brand && card?.last4) {
            processPayment(id, {
                brand: card?.brand,
                expMonth: card?.exp_month || null,
                expYear: card?.exp_year || null,
                firstDigits: null,
                lastDigits: card?.last4,
            });

            setPaymentMethod(payload.paymentMethod);
        }
    };

    const handleFormCompleteSubmit = async () => {
        const stripe = await stripePromise;

        const payment = await submitPayment();

        if (payment.errors?.length) {
            onError(payment.errors);
            return;
        }

        if (!payment?.confirmationNeeded) {
            submitPaymentSuccess(payment?.order);
            return;
        }

        if (!stripe?.confirmCardPayment) {
            onError([new Error(intl.formatMessage(paymentErrorMessages.cannotHandlePaymentConfirmation))]);
            return;
        }

        if (!payment?.confirmationData) {
            onError([new Error(intl.formatMessage(paymentErrorMessages.paymentNoConfirmationData))]);
            return;
        }

        const { parseError, paymentAction } = parsePaymentConfirmationData(payment.confirmationData);

        if (parseError || !paymentAction) {
            onError([new Error(intl.formatMessage(paymentErrorMessages.paymentMalformedConfirmationData))]);
            return;
        }

        if (!paymentMethod?.id) {
            onError([new Error(intl.formatMessage(stripeErrorMessages.paymentMethodNotCreated))]);
            return;
        }

        const { confirmation, confirmationError } = await handleConfirmCardPayment(stripe, paymentAction, paymentMethod);

        if (confirmationError) {
            // @ts-ignore
            onError([new Error(confirmationError)]);
            return;
        }

        if (confirmation?.error) {
            onError([new Error(confirmation.error.message)]);
            return;
        }

        await handleFormCompleteSubmit();
    };

    useEffect(() => {
        if (stripePromise) {
            (formRef?.current as any)?.addEventListener("submitComplete", handleFormCompleteSubmit);
        }

        return () => {
            (formRef?.current as any)?.removeEventListener("submitComplete", handleFormCompleteSubmit);
        };
    }, [formRef, stripePromise, paymentMethod]);

    const allErrors = [...errors, ...submitErrors];

    return (
        <div data-test="stripeGateway">
            <Elements stripe={stripePromise}>
                <StripeCreditCardForm formId={formId} formRef={formRef} errors={allErrors} onSubmit={handleFormSubmit} />
            </Elements>
        </div>
    );
};

export { StripePaymentGateway };
