// @ts-nocheck
import { ErrorMessage, StripeInputElement } from "@mzawadie/ui-kit/atoms";
import { IFormError } from "@next/types";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { Formik } from "formik";
import React, { useState } from "react";

import * as S from "./styles";
import { IStripeCreditCardFormProps } from "./types";

/**
 * Stripe credit card form.
 */
const StripeCreditCardForm: React.FC<IStripeCreditCardFormProps> = ({
    formRef,
    formId,
    errors = [],
    onSubmit,
}: IStripeCreditCardFormProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const [stripeErrors, setStripeErrors] = useState<IFormError[]>([]);

    const allErrors = [...errors, ...stripeErrors];

    return (
        <Formik
            initialValues={null}
            onSubmit={async (values, { setSubmitting }) => {
                await onSubmit(stripe, elements);
                setSubmitting(false);
            }}
        >
            {({ handleChange, handleSubmit, handleBlur, values, isSubmitting, isValid }) => (
                <S.Form id={formId} ref={formRef} onSubmit={handleSubmit}>
                    <S.Card data-test="stripeForm">
                        <S.CardNumberField>
                            <StripeInputElement
                                type="CardNumber"
                                label="Card number"
                                onChange={(event: any) => {
                                    handleChange(event);
                                    setStripeErrors([]);
                                }}
                            />
                        </S.CardNumberField>

                        <S.CardExpiryField>
                            <StripeInputElement
                                type="CardExpiry"
                                label="Expiration date"
                                onChange={(event: any) => {
                                    handleChange(event);
                                    setStripeErrors([]);
                                }}
                            />
                        </S.CardExpiryField>

                        <S.CardCvcField>
                            <StripeInputElement
                                type="CardCvc"
                                label="CVC"
                                onChange={(event: any) => {
                                    handleChange(event);
                                    setStripeErrors([]);
                                }}
                            />
                        </S.CardCvcField>
                    </S.Card>

                    <ErrorMessage errors={allErrors} />
                </S.Form>
            )}
        </Formik>
    );
};

export { StripeCreditCardForm };
